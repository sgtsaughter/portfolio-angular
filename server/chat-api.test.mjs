import assert from 'node:assert/strict';
import test from 'node:test';
import { createChatHandler, createOpenAIProvider } from './chat-api.mjs';

const attuneFact = {
  title: 'Attune Insurance Application',
  content: 'At DOOR3, Patrick maintained the Attune insurance application from January to August 2017.',
  source: 'Projects section'
};

function createHarness({ allowed = true, provider } = {}) {
  const calls = { provider: [], rateLimit: [] };
  const handler = createChatHandler({
    provider: async request => {
      calls.provider.push(request);
      if (provider) return provider(request);
      return (async function* () {
        yield { type: 'token', text: 'Yes, Patrick worked on it.' };
        yield { type: 'usage', inputTokens: 100, outputTokens: 20 };
      })();
    },
    rateLimiter: {
      allow: async clientKey => {
        calls.rateLimit.push(clientKey);
        return allowed;
      }
    },
    getClientKey: () => 'test-client'
  });
  return { handler, calls };
}

function makeRequest(question, overrides = {}) {
  return new Request('https://portfolio.test/api/chat', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: 'https://portfolio.test'
    },
    body: JSON.stringify({ question, facts: [attuneFact], conversation: [], ...overrides })
  });
}

test('selects website evidence and streams answer events without recording spend', async () => {
  const { handler, calls } = createHarness();
  const response = await handler(makeRequest('Was there an Attune insurance app?'));
  const text = await response.text();

  assert.equal(response.status, 200);
  assert.match(text, /Yes, Patrick worked on it/);
  assert.match(text, /"type":"done"/);
  assert.equal(calls.provider.length, 1);
  assert.equal(calls.provider[0].evidence[0].title, 'Attune Insurance Application');
  assert.equal(text.includes('Was there an Attune insurance app?'), false);
});

test('refuses unrelated questions without calling provider', async () => {
  const { handler, calls } = createHarness();
  const response = await handler(makeRequest('How do I bake sourdough?'));
  const text = await response.text();

  assert.equal(response.status, 200);
  assert.match(text, /refusal/);
  assert.equal(calls.provider.length, 0);
});

test('retrieves profile and work facts for a broad profile question', async () => {
  const { handler, calls } = createHarness();
  const facts = [
    { title: 'Profile', content: 'Patrick Baxter is a web developer.', source: 'About Me section' },
    { title: 'Angular skills', content: 'Angular and TypeScript.', source: 'My Skills section' },
    { title: 'Intellishift', content: 'Patrick works as a Software Developer.', source: 'Work Experience section' }
  ];
  await (await handler(makeRequest('What can you tell me about Patrick?', { facts }))).text();

  assert.deepEqual(calls.provider[0].evidence.map(fact => fact.title), ['Profile', 'Intellishift']);
});

test('retrieves the earliest work role from dates in current website excerpts', async () => {
  const { handler, calls } = createHarness();
  const facts = [
    { title: 'National Event Connection', content: 'Jr. Web Developer from March 2008 to April 2012.', source: 'Work Experience section' },
    { title: 'Intellishift', content: 'Software Developer from October 2019 to present.', source: 'Work Experience section' }
  ];
  await (await handler(makeRequest('What was Patrick\'s first job?', { facts }))).text();

  assert.deepEqual(calls.provider[0].evidence.map(fact => fact.title), ['National Event Connection']);
});

test('retrieves new website facts for an anything-else follow-up', async () => {
  const { handler, calls } = createHarness();
  const facts = [
    attuneFact,
    { title: 'Greenhill.com', content: 'Patrick maintained the Drupal website.', source: 'Projects section' }
  ];
  const conversation = [{ sender: 'bot', content: 'Attune Insurance Application: Patrick maintained it.' }];
  await (await handler(makeRequest('anything else?', { facts, conversation }))).text();

  assert.deepEqual(calls.provider[0].evidence.map(fact => fact.title), ['Greenhill.com']);
});

test('sends the calculated project technology count instead of all project records', async () => {
  const { handler, calls } = createHarness();
  const facts = Array.from({ length: 7 }, (_, index) => ({
    title: `Project ${index + 1}`,
    content: index < 4 ? 'This project uses Angular.' : 'This project uses Drupal.',
    source: 'Projects section',
    technologies: index < 4 ? ['Angular'] : ['Drupal 8']
  }));
  await (await handler(makeRequest('How many times is Angular mentioned across the projects?', { facts }))).text();

  assert.equal(calls.provider[0].evidence.length, 1);
  const calculation = calls.provider[0].evidence.find(fact => fact.title === 'Calculated project technology count');
  assert.match(calculation.content, /Angular is listed in 4 of 7 project technology lists/);
});

test('calculates the most frequently used framework from distinct project cards', async () => {
  const { handler, calls } = createHarness();
  const facts = [
    { title: 'Project A', content: 'Built with Drupal 7.', source: 'Projects section', technologies: ['Drupal 7'] },
    { title: 'Project B', content: 'Built with Drupal 8.', source: 'Projects section', technologies: ['Drupal 8'] },
    { title: 'Project C', content: 'Built with Angular.', source: 'Projects section', technologies: ['Angular'] }
  ];
  await (await handler(makeRequest('What framework has Patrick used most in his projects?', { facts }))).text();

  const calculation = calls.provider[0].evidence.find(fact => fact.title === 'Calculated project framework analysis');
  assert.match(calculation.content, /Drupal is the most frequently listed framework, appearing in 2 of 3 project cards/);
});

test('trims a long seven-turn conversation instead of rejecting the request', async () => {
  const { handler, calls } = createHarness();
  const conversation = Array.from({ length: 7 }, (_, index) => ({
    sender: index % 2 === 0 ? 'user' : 'bot',
    content: `Turn ${index} ${'portfolio detail '.repeat(100)}`
  }));
  const response = await handler(makeRequest('Tell me about the Attune application.', { conversation }));

  assert.equal(response.status, 200);
  assert.equal(calls.provider[0].conversation.length, 6);
  assert.ok(calls.provider[0].conversation.every(turn => turn.content.length <= 500));
  assert.ok(calls.provider[0].conversation.reduce((sum, turn) => sum + turn.content.length, 0) <= 3000);
});

test('rejects cross-origin requests before consuming the rate limit', async () => {
  const { handler, calls } = createHarness();
  const request = new Request('https://portfolio.test/api/chat', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://attacker.test' },
    body: JSON.stringify({ question: 'Was there an Attune app?', facts: [attuneFact] })
  });
  const response = await handler(request);

  assert.equal(response.status, 403);
  assert.equal(calls.rateLimit.length, 0);
});

test('rejects over-rate requests without calling provider', async () => {
  const { handler, calls } = createHarness({ allowed: false });
  const response = await handler(makeRequest('Was there an Attune insurance app?'));

  assert.equal(response.status, 429);
  assert.equal(calls.provider.length, 0);
});

test('shows provider credit exhaustion clearly without maintaining an app balance', async () => {
  const provider = async function* () {
    throw Object.assign(new Error('credits exhausted'), { status: 402 });
  };
  const { handler, calls } = createHarness({ provider });
  const response = await handler(makeRequest('Was there an Attune insurance app?'));
  const text = await response.text();

  assert.equal(response.status, 200);
  assert.match(text, /prepaid API credits are exhausted/);
  assert.equal(calls.provider.length, 1);
});

test('rejects client-supplied evidence with an unrecognized source', async () => {
  const { handler, calls } = createHarness();
  const response = await handler(makeRequest('Was there an Attune app?', {
    facts: [{ ...attuneFact, source: 'Untrusted section' }]
  }));

  assert.equal(response.status, 400);
  assert.equal(calls.provider.length, 0);
});

test('OpenAI adapter requests GPT-6 Luna with storage disabled and streams text/usage', async () => {
  let captured;
  const provider = createOpenAIProvider('test-key', async (url, options) => {
    captured = { url, options, body: JSON.parse(options.body) };
    return new Response([
      'data: {"type":"response.output_text.delta","delta":"Yes."}\n\n',
      'data: {"type":"response.completed","response":{"usage":{"input_tokens":100,"output_tokens":20}}}\n\n',
      'data: [DONE]\n\n'
    ].join(''), { status: 200 });
  });
  const events = [];
  for await (const event of provider({ question: 'Was there an Attune app?', evidence: [attuneFact], conversation: [] })) {
    events.push(event);
  }

  assert.equal(captured.url, 'https://api.openai.com/v1/responses');
  assert.equal(captured.options.headers.authorization, 'Bearer test-key');
  assert.equal(captured.body.model, 'gpt-6-luna');
  assert.equal(captured.body.store, false);
  assert.match(captured.body.instructions, /use any supplied calculated-analysis evidence as authoritative/i);
  assert.match(captured.body.instructions, /warm and conversational/i);
  assert.match(captured.body.instructions, /Never invent, assume, or infer/i);
  assert.deepEqual(events, [{ type: 'token', text: 'Yes.' }]);
});

test('requires an API key when constructing the server provider', () => {
  assert.throws(() => createOpenAIProvider(''), /OPENAI_API_KEY/);
});
