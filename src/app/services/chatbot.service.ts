import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, Observable, Subject, from } from 'rxjs';
import {
  extractPortfolioFacts,
  findAdditionalPortfolioFacts,
  findRelevantPortfolioFacts,
  isAdditionalInformationQuestion,
  isPortfolioQuestion,
  PortfolioFact
} from './portfolio-site-knowledge';
import { isAnswerSupported } from './portfolio-answer-validation';

interface ChatStreamEvent {
  type: 'token' | 'sources' | 'refusal' | 'error' | 'done';
  text?: string;
  sources?: string[];
  evidence?: PortfolioFact[];
}

export interface ChatMessage {
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}
@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private requestId = 0;
  readonly modelStatus$ = new BehaviorSubject<string>('');
  readonly generatedText$ = new Subject<{ requestId: string; text: string }>();

  constructor(@Inject(DOCUMENT) private document: Document) { }

  processMessage(message: string, conversation: ChatMessage[] = [], requestId = String(++this.requestId)): Observable<ChatMessage> {
    return from(this.createResponse(message, conversation, requestId));
  }

  private async createResponse(message: string, conversation: ChatMessage[], requestId: string): Promise<ChatMessage> {
    const websiteFacts = extractPortfolioFacts(this.document);
    const previousAnswers = conversation.filter(item => item.sender === 'bot').map(item => item.content);
    const relevantFacts = isAdditionalInformationQuestion(message)
      ? findAdditionalPortfolioFacts(previousAnswers, websiteFacts)
      : findRelevantPortfolioFacts(message, websiteFacts);
    const inScope = isPortfolioQuestion(message, websiteFacts, previousAnswers);

    if (!inScope) {
      return {
        content: 'I can answer questions about information on this portfolio, such as Patrick\'s experience, skills, projects, education, or contact details.',
        sender: 'bot',
        timestamp: new Date()
      };
    }

    if (websiteFacts.length === 0) {
      return {
        content: 'I could not read the portfolio content needed to answer that.',
        sender: 'bot',
        timestamp: new Date()
      };
    }

    const fallbackFacts = relevantFacts.length > 0 ? relevantFacts : websiteFacts.slice(0, 4);
    const groundedFallback = this.formatGroundedFacts(fallbackFacts);
    this.modelStatus$.next('Sending the website context to OpenAI...');
    try {
      const result = await this.requestRemoteAnswer(message, websiteFacts, conversation.slice(-8), requestId);
      if (result.refusal) {
        return { content: result.answer, sender: 'bot', timestamp: new Date() };
      }
      const answer = result.answer.trim();
      const evidence = result.evidence.length > 0 ? result.evidence : fallbackFacts;
      const supportedAnswer = isAnswerSupported(answer, evidence, message);
      const sources = result.sources.length > 0 ? result.sources.join(', ') : [...new Set(evidence.map(fact => fact.source))].join(', ');
      const content = supportedAnswer
        ? `${answer}\n\nSources: ${sources}`
        : `Here is what the website directly supports.\n\n${this.formatGroundedFacts(evidence)}`;
      return { content, sender: 'bot', timestamp: new Date() };
    } finally {
      this.modelStatus$.next('');
    }
  }

  private formatGroundedFacts(facts: PortfolioFact[]): string {
    return facts.map(fact => `${fact.title}: ${fact.content} (Source: ${fact.source})`).join('\n\n');
  }

  private async requestRemoteAnswer(
    message: string,
    facts: PortfolioFact[],
    conversation: ChatMessage[],
    requestId: string
  ): Promise<{ answer: string; sources: string[]; evidence: PortfolioFact[]; refusal: boolean }> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120_000);
    let answer = '';
    let sources: string[] = [];
    let evidence: PortfolioFact[] = [];
    let refusal = false;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'text/event-stream' },
        body: JSON.stringify({
          question: message.slice(0, 500),
          facts,
          conversation: conversation.slice(-6).map(({ sender, content }) => ({
            sender,
            content: content.slice(0, 500)
          }))
        }),
        signal: controller.signal
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || `AI endpoint returned ${response.status}`);
      }
      if (!response.body) {
        throw new Error('AI endpoint did not return a response stream');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { value, done } = await reader.read();
        buffer += decoder.decode(value, { stream: !done });
        let boundary: number;
        while ((boundary = buffer.indexOf('\n\n')) >= 0) {
          const frame = buffer.slice(0, boundary);
          buffer = buffer.slice(boundary + 2);
          const data = frame.split('\n').find(line => line.startsWith('data:'))?.slice(5).trim();
          if (!data || data === '[DONE]') continue;

          const event = JSON.parse(data) as ChatStreamEvent;
          if (event.type === 'token' && event.text) {
            answer += event.text;
            this.generatedText$.next({ requestId, text: event.text });
          } else if (event.type === 'sources') {
            sources = event.sources || [];
            evidence = event.evidence || [];
          } else if (event.type === 'refusal') {
            answer = event.text || '';
            refusal = true;
          } else if (event.type === 'error') {
            throw new Error(event.text || 'AI endpoint failed');
          }
        }
        if (done) break;
      }

      return { answer, sources, evidence, refusal };
    } finally {
      clearTimeout(timeoutId);
      this.modelStatus$.next('');
    }
  }
}

