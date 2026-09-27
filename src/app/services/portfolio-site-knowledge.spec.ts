import {
  extractPortfolioFacts,
  findAdditionalPortfolioFacts,
  findRelevantPortfolioFacts,
  isPortfolioQuestion
} from './portfolio-site-knowledge';
import { isAnswerSupported } from './portfolio-answer-validation';

describe('portfolio site knowledge', () => {
  let main: HTMLElement;
  let facts: ReturnType<typeof extractPortfolioFacts>;

  beforeEach(() => {
    main = document.createElement('main');
    main.innerHTML = `
      <section id="projects">
        <h2>Projects</h2>
        <article data-chat-content>
          <h3>Attune Insurance Application</h3>
          <p>Patrick maintained the small-business insurance application from January to August 2017.</p>
          <div class="project-tech"><span class="tech-chip">Angular</span><span class="tech-chip">Drupal 8</span></div>
        </article>
      </section>
      <section id="experience">
        <h2>Work Experience</h2>
        <article data-chat-content>
          <h3>National Event Connection</h3>
          <p>Jr. Web Developer and Content Manager. March 2008 to April 2012.</p>
        </article>
        <article data-chat-content>
          <h3>Intellishift</h3>
          <p>Software Developer. October 2019 to Present.</p>
        </article>
      </section>
      <section id="skills">
        <h2>My Skills</h2>
        <article data-chat-content><h3>Frontend Development</h3><p>Angular and TypeScript</p></article>
      </section>`;
    facts = extractPortfolioFacts(main);
  });

  it('extracts rendered content with section provenance', () => {
    expect(facts.length).toBe(4);
    const project = facts.find(fact => fact.title === 'Attune Insurance Application');
    expect(project?.source).toBe('Projects section');
    expect(project?.technologies).toEqual(['Angular', 'Drupal 8']);
  });

  it('retrieves a named project without neighboring project content', () => {
    expect(findRelevantPortfolioFacts('Was there an Attune insurance app?', facts).map(fact => fact.title))
      .toEqual(['Attune Insurance Application']);
  });

  it('finds the earliest job from dates in rendered experience content', () => {
    expect(findRelevantPortfolioFacts('What was Patrick\'s first job?', facts).map(fact => fact.title))
      .toEqual(['National Event Connection']);
  });

  it('allows an unlisted skill question about Patrick but rejects an unrelated question', () => {
    expect(isPortfolioQuestion('Does Patrick have Python experience?', facts)).toBeTrue();
    expect(isPortfolioQuestion('How do I bake sourdough?', facts)).toBeFalse();
  });

  it('selects website facts not already returned for an anything-else follow-up', () => {
    const results = findAdditionalPortfolioFacts(['Attune Insurance Application: Patrick maintained it.'], facts);

    expect(results.map(fact => fact.title)).not.toContain('Attune Insurance Application');
  });

  it('validates API-returned evidence without client-only keyword metadata', () => {
    const serverEvidence = [{
      title: 'Attune Insurance Application',
      content: 'Patrick maintained the insurance application in 2017.',
      source: 'Projects section'
    }];

    expect(isAnswerSupported('Patrick maintained the insurance application in 2017.', serverEvidence as any, 'What did Patrick do?')).toBeTrue();
  });
});
