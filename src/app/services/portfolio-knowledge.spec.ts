import {
  answerUnlistedExperienceQuestion,
  findAdditionalPortfolioFacts,
  findRelevantPortfolioFacts,
  isAdditionalInformationQuestion
} from './portfolio-knowledge';
import { isAnswerSupported } from './portfolio-answer-validation';

describe('portfolio knowledge retrieval', () => {
  it('retrieves supported Angular skills', () => {
    const facts = findRelevantPortfolioFacts('What Angular skills are listed?');

    expect(facts.some(fact => fact.title === 'Frontend skills')).toBeTrue();
  });

  it('returns a broad profile and work-history overview for open-ended profile questions', () => {
    const facts = findRelevantPortfolioFacts('What can you tell me about Patrick?');

    expect(facts.some(fact => fact.title === 'Profile')).toBeTrue();
    expect(facts.some(fact => fact.title === 'Intellishift experience')).toBeTrue();
    expect(facts.some(fact => fact.title === 'Education')).toBeFalse();
  });

  it('returns the earliest role when asked about Patrick\'s first job', () => {
    const facts = findRelevantPortfolioFacts('What was Patrick\'s first job?');

    expect(facts.map(fact => fact.title)).toEqual(['National Event Connection experience']);
  });

  it('returns additional facts for a contextual follow-up without repeating answered facts', () => {
    expect(isAdditionalInformationQuestion('anything else?')).toBeTrue();

    const facts = findAdditionalPortfolioFacts(['Profile: Patrick Baxter is a developer.']);
    expect(facts.some(fact => fact.title === 'Profile')).toBeFalse();
    expect(facts.length).toBe(4);
  });

  it('retrieves a specific project when the question names it', () => {
    const facts = findRelevantPortfolioFacts('What did Patrick build for the NYC workflow application?');

    expect(facts.some(fact => fact.title === 'NYC workflow application')).toBeTrue();
  });

  it('retrieves public contact information', () => {
    const facts = findRelevantPortfolioFacts('How can I contact Patrick by email?');

    expect(facts.some(fact => fact.title === 'Contact information')).toBeTrue();
  });

  it('retrieves a single named older project instead of the whole project list', () => {
    const facts = findRelevantPortfolioFacts('Was there an Attune insurance app Patrick worked on?');

    expect(facts.map(fact => fact.title)).toEqual(['Attune Insurance Application']);
  });

  it('does not retrieve evidence for unsupported personal questions', () => {
    expect(findRelevantPortfolioFacts('What is Patrick\'s favorite food?')).toEqual([]);
  });

  it('does not retrieve evidence for unrelated topics', () => {
    expect(findRelevantPortfolioFacts('Explain how black holes evaporate')).toEqual([]);
  });

  it('does not match a missing skill to generic experience facts', () => {
    expect(findRelevantPortfolioFacts('Does Patrick have any Python experience?')).toEqual([]);
  });

  it('answers missing skill questions directly without claiming absence of experience', () => {
    expect(answerUnlistedExperienceQuestion('Does Patrick have any Python experience?'))
      .toBe('The portfolio does not list Python among Patrick\'s skills or experience, so I can\'t confirm experience with it.');
  });

  it('rejects generated claims not supported by retrieved facts', () => {
    const facts = findRelevantPortfolioFacts('What Angular skills are listed?');

    expect(isAnswerSupported('Angular, TypeScript, JavaScript, SCSS, and RxJS are listed.', facts)).toBeTrue();
    expect(isAnswerSupported('He built an AI e-commerce app in 2023.', facts)).toBeFalse();
  });
});
