export interface PortfolioFact {
  title: string;
  content: string;
  source: string;
  keywords: string[];
  technologies?: string[];
}

const stopWords = new Set([
  'a', 'about', 'an', 'and', 'any', 'are', 'at', 'be', 'can', 'did', 'do', 'does', 'for', 'from',
  'he', 'her', 'his', 'how', 'i', 'in', 'is', 'it', 'me', 'of', 'on', 'or', 'patrick', 'please',
  'she', 'tell', 'that', 'the', 'their', 'there', 'this', 'to', 'was', 'what', 'when', 'where',
  'which', 'who', 'why', 'with', 'would', 'you', 'your'
]);

const retrievalIntentWords = new Set(['career', 'experience', 'job', 'skill', 'work', 'worked']);
function tokenize(text: string): string[] {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter(token => token.length > 1 && !stopWords.has(token))
    .map(token => token.endsWith('ies') ? `${token.slice(0, -3)}y` : token.endsWith('s') ? token.slice(0, -1) : token);
}

export function extractPortfolioFacts(root: ParentNode): PortfolioFact[] {
  const main = root.querySelector('main') ?? root;
  const sections = Array.from(main.querySelectorAll(':scope > section'));

  return sections.flatMap(section => {
    const source = section.querySelector('h1, h2')?.textContent?.trim() || section.id || 'Portfolio';

    return Array.from(section.querySelectorAll<HTMLElement>('[data-chat-content]'))
      .map(block => {
        const title = block.querySelector('h1, h2, h3, h4, mat-card-title, mat-card-subtitle')?.textContent?.trim() || source;
        const visibleText = block.innerText || block.textContent || '';
        const links = Array.from(block.querySelectorAll('a[href]'))
          .map(link => link.getAttribute('href'))
          .filter((href): href is string => Boolean(href));
        const content = `${visibleText} ${links.join(' ')}`.replace(/\s+/g, ' ').trim();
        const technologies = source === 'Projects'
          ? Array.from(block.querySelectorAll('.project-tech .tech-chip'))
            .map(element => element.textContent?.trim() || '')
            .filter(Boolean)
          : [];

        return {
          title,
          content,
          source: `${source} section`,
          keywords: [...new Set(tokenize(`${title} ${content}`))],
          technologies
        };
      })
      .filter(fact => fact.content.length > 0);
  });
}

export function isAdditionalInformationQuestion(question: string): boolean {
  return /\b(?:anything else|what else|what other|tell me more|more about (?:patrick|him|that))\b/i.test(question);
}

export function findAdditionalPortfolioFacts(previousBotMessages: string[], facts: PortfolioFact[], limit = 4): PortfolioFact[] {
  const answeredTitles = new Set(facts
    .filter(fact => previousBotMessages.some(message => message.includes(`${fact.title}:`)))
    .map(fact => fact.title));

  return facts.filter(fact => !answeredTitles.has(fact.title)).slice(0, limit);
}

export function findRelevantPortfolioFacts(question: string, facts: PortfolioFact[], limit = 4): PortfolioFact[] {
  if (isFirstJobQuestion(question)) {
    const earliestExperience = facts
      .filter(fact => /work experience/i.test(fact.source))
      .map(fact => ({ fact, year: getEarliestYear(fact.content) }))
      .filter((item): item is { fact: PortfolioFact; year: number } => item.year !== null)
      .sort((first, second) => first.year - second.year)[0]?.fact;
    return earliestExperience ? [earliestExperience] : [];
  }

  if (isBroadProfileQuestion(question)) {
    return facts.filter(fact => /^(?:About Me|Patrick Baxter|Work Experience)/i.test(fact.source)).slice(0, limit);
  }

  const questionTokens = [...new Set(tokenize(question.slice(0, 500)))];
  const matches = facts.map(fact => {
    const searchableTokens = new Set(tokenize(`${fact.title} ${fact.content} ${fact.keywords.join(' ')}`));
    const specificTokens = questionTokens.filter(token => !retrievalIntentWords.has(token));
    const searchTokens = specificTokens.length > 0 ? specificTokens : questionTokens;
    const matchingTokens = searchTokens.filter(token => searchableTokens.has(token));
    return { fact, score: matchingTokens.length };
  }).filter(match => match.score > 0)
    .sort((first, second) => second.score - first.score);

  if (matches.length > 0) {
    const topScore = matches[0].score;
    return matches.filter(match => match.score === topScore).slice(0, limit).map(match => match.fact);
  }

  return findTopicFallbackFacts(question, facts, limit);
}

export function isPortfolioQuestion(question: string, facts: PortfolioFact[], conversation: string[] = []): boolean {
  if (isAdditionalInformationQuestion(question) && conversation.length > 0) {
    return true;
  }
  if (findRelevantPortfolioFacts(question, facts).length > 0) {
    return true;
  }

  const refersToPatrick = /\b(?:patrick|he|his|him)\b/i.test(question);
  const namesPortfolioTopic = /\b(?:about|background|profile|experience|work|career|job|skills?|frameworks?|technology|technologies|projects?|education|certification|contact|resume|availability|interest|hobbies|do|does)\b/i.test(question);
  return refersToPatrick && namesPortfolioTopic;
}

function isBroadProfileQuestion(question: string): boolean {
  const refersToPatrick = /\b(?:patrick|he|his|him)\b/i.test(question);
  const asksForOverview = /\b(?:tell me about|who is|overview|background|profile)\b/i.test(question);
  const asksAboutSpecificTopic = /\b(?:skills?|experience|work history|projects?|education|contact|email|phone|career|companies)\b/i.test(question);
  return refersToPatrick && asksForOverview && !asksAboutSpecificTopic;
}

function isFirstJobQuestion(question: string): boolean {
  return /\b(?:first|earliest|started)\b.{0,30}\b(?:job|role|position|work)\b|\b(?:job|role|position)\b.{0,30}\b(?:first|earliest)\b/i.test(question);
}

function getEarliestYear(text: string): number | null {
  const years = text.match(/\b(?:19|20)\d{2}\b/g)?.map(Number) || [];
  return years.length > 0 ? Math.min(...years) : null;
}

function findTopicFallbackFacts(question: string, facts: PortfolioFact[], limit: number): PortfolioFact[] {
  if (/\b(?:skill|technology|proficient|expertise)\b/i.test(question)) {
    return facts.filter(fact => /skills|frameworks|tools|databases/i.test(fact.source)).slice(0, limit);
  }
  if (/\b(?:experience|career|work|job|role|position)\b/i.test(question)) {
    return facts.filter(fact => /work experience/i.test(fact.source)).slice(0, limit);
  }
  if (/\b(?:patrick|he|his|him)\b/i.test(question)) {
    return facts.filter(fact => /about me|patrick baxter/i.test(fact.source)).slice(0, limit);
  }
  return [];
}
