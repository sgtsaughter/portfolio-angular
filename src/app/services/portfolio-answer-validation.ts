import { PortfolioFact } from './portfolio-site-knowledge';

const ignoredAnswerTerms = new Set([
  'a', 'about', 'an', 'and', 'are', 'as', 'at', 'be', 'but', 'by', 'can', 'do', 'does',
  'for', 'from', 'he', 'his', 'how', 'i', 'in', 'information', 'is', 'it', 'me', 'of',
  'on', 'or', 'our', 'she', 'that', 'the', 'their', 'they', 'this', 'to', 'was', 'were',
  'what', 'which', 'who', 'with', 'you', 'your', 'about', 'answer', 'evidence', 'listed',
  'portfolio', 'source'
]);

function tokenize(text: string): string[] {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter(token => token.length > 1 && !ignoredAnswerTerms.has(token))
    .map(token => token.endsWith('ies') ? `${token.slice(0, -3)}y` : token.endsWith('s') ? token.slice(0, -1) : token);
}

export function isAnswerSupported(answer: string, facts: PortfolioFact[], question = ''): boolean {
  const answerTokens = [...new Set(tokenize(answer))];
  const evidenceTokens = new Set(facts.flatMap(fact => tokenize(`${fact.title} ${fact.content} ${(fact.keywords || []).join(' ')}`)));
  const questionTokens = new Set(tokenize(question));
  const unsupportedTokens = answerTokens.filter(token => token.length >= 4 && !evidenceTokens.has(token) && !questionTokens.has(token));
  const answerYears = answer.match(/\b(?:19|20)\d{2}\b/g) || [];
  const evidenceYears = facts.flatMap(fact => fact.content.match(/\b(?:19|20)\d{2}\b/g) || []);

  return answerTokens.length > 0 &&
    unsupportedTokens.length / answerTokens.length <= 0.2 &&
    answerYears.every(year => evidenceYears.includes(year));
}
