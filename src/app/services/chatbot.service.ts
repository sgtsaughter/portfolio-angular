import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import {
  answerUnlistedExperienceQuestion,
  findAdditionalPortfolioFacts,
  findRelevantPortfolioFacts,
  isAdditionalInformationQuestion,
  PortfolioFact
} from './portfolio-knowledge';
import { isAnswerSupported } from './portfolio-answer-validation';

const MODEL_ID = 'HuggingFaceTB/SmolLM2-135M-Instruct';

interface WorkerResponse {
  id: string;
  content?: string;
  error?: string;
  status?: string;
}

interface PendingRequest {
  resolve: (content: string) => void;
  reject: (error: Error) => void;
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
  private worker: Worker | null = null;
  private requestId = 0;
  private pendingRequests = new Map<string, PendingRequest>();
  readonly modelStatus$ = new BehaviorSubject<string>('');

  processMessage(message: string, conversation: ChatMessage[] = []): Observable<ChatMessage> {
    return from(this.createResponse(message, conversation));
  }

  private async createResponse(message: string, conversation: ChatMessage[]): Promise<ChatMessage> {
    if (isAdditionalInformationQuestion(message)) {
      const previousAnswers = conversation
        .filter(item => item.sender === 'bot')
        .map(item => item.content);
      const additionalFacts = findAdditionalPortfolioFacts(previousAnswers);
      const content = additionalFacts.length > 0
        ? this.formatGroundedFacts(additionalFacts)
        : 'I have shared the portfolio information available so far. Ask about a specific area such as experience, skills, projects, education, or contact details.';
      return { content, sender: 'bot', timestamp: new Date() };
    }

    const unlistedExperienceAnswer = answerUnlistedExperienceQuestion(message);
    const facts = findRelevantPortfolioFacts(message);
    let content: string;

    if (unlistedExperienceAnswer) {
      content = unlistedExperienceAnswer;
    } else if (facts.length === 0) {
      content = 'I can only answer questions supported by this portfolio. Ask about the profile, experience, skills, projects, education, contact information, or certifications.';
    } else if (!requiresSynthesis(message)) {
      content = this.formatDirectAnswer(message, facts);
    } else {
      const groundedFallback = this.formatGroundedFacts(facts);
      try {
        const answer = await this.requestLocalAnswer(message, facts);
        const supportedAnswer = isAnswerSupported(answer, facts);
        content = supportedAnswer
          ? `${answer}\n\nSources: ${facts.map(fact => fact.source).join(', ')}`
          : `Here is what the portfolio directly supports.\n\n${groundedFallback}`;
      } catch {
        content = `The local model is unavailable, so here is the relevant portfolio information instead.\n\n${groundedFallback}`;
      } finally {
        this.modelStatus$.next('');
      }
    }

    return { content, sender: 'bot', timestamp: new Date() };
  }

  private formatGroundedFacts(facts: PortfolioFact[]): string {
    return facts.map(fact => `${fact.title}: ${fact.content} (Source: ${fact.source})`).join('\n\n');
  }

  private formatDirectAnswer(message: string, facts: PortfolioFact[]): string {
    if (isExistenceQuestion(message)) {
      const sources = [...new Set(facts.map(fact => fact.source))].join(', ');
      return `Yes. ${facts.map(fact => fact.content).join(' ')} (Source: ${sources})`;
    }

    return this.formatGroundedFacts(facts);
  }

  private requestLocalAnswer(message: string, facts: PortfolioFact[]): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const worker = this.getWorker();
        const id = String(++this.requestId);
        this.pendingRequests.set(id, { resolve, reject });
        worker.postMessage({
          id,
          modelId: MODEL_ID,
          question: message.slice(0, 500),
          evidence: facts.map(({ title, content, source }) => ({ title, content, source }))
        });

        setTimeout(() => {
          const pending = this.pendingRequests.get(id);
          if (pending) {
            this.pendingRequests.delete(id);
            pending.reject(new Error('Local model request timed out'));
          }
        }, 120_000);
      } catch (error) {
        reject(error instanceof Error ? error : new Error('Local model could not be started'));
      }
    });
  }

  private getWorker(): Worker {
    if (this.worker) {
      return this.worker;
    }

    const worker = new Worker(new URL('./chatbot.worker', import.meta.url), { type: 'module' });
    worker.onmessage = ({ data }: MessageEvent<WorkerResponse>) => {
      if (data.status) {
        this.modelStatus$.next(data.status);
        return;
      }
      const pending = this.pendingRequests.get(data.id);
      if (!pending) {
        return;
      }
      this.pendingRequests.delete(data.id);
      this.modelStatus$.next('');
      if (data.error) {
        pending.reject(new Error(data.error));
      } else {
        pending.resolve(data.content || '');
      }
    };
    worker.onerror = () => {
      this.pendingRequests.forEach(pending => pending.reject(new Error('Local model worker failed')));
      this.pendingRequests.clear();
      worker.terminate();
      this.worker = null;
    };
    this.worker = worker;
    return worker;
  }
}

function requiresSynthesis(message: string): boolean {
  return /\b(?:analy[sz]e|compare|explain|recommend|summari[sz]e|why)\b/i.test(message);
}

function isExistenceQuestion(message: string): boolean {
  return /\b(?:was|were|is|are)\s+there\b|\b(?:did|has)\s+(?:patrick|he)\s+(?:ever\s+)?(?:work|worked|build|built|develop|developed)\b/i.test(message);
}
