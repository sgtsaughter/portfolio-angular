import { createServer } from 'node:http';
import { createChatHandler, createOpenAIProvider } from './chat-api.mjs';

const port = Number(process.env.PORT || 4310);
const allowedOrigins = (process.env.CHAT_ALLOWED_ORIGINS || 'http://127.0.0.1:4200,http://localhost:4200')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

const rateLimiter = createInMemoryRateLimiter(20, 60_000);
const handler = process.env.OPENAI_API_KEY
  ? createChatHandler({
    provider: createOpenAIProvider(process.env.OPENAI_API_KEY),
    rateLimiter,
    allowedOrigins,
    getClientKey: request => request.headers.get('x-local-client')
  })
  : async () => Response.json({ error: 'Set OPENAI_API_KEY in server/.env before using the chatbot.' }, { status: 503 });

const server = createServer(async (incoming, outgoing) => {
  const url = new URL(incoming.url || '/', `http://${incoming.headers.host || `127.0.0.1:${port}`}`);
  if (url.pathname !== '/api/chat' || incoming.method !== 'POST') {
    outgoing.writeHead(404).end('Not found');
    return;
  }

  try {
    const chunks = [];
    let size = 0;
    for await (const chunk of incoming) {
      size += chunk.length;
      if (size > 40_000) {
        outgoing.writeHead(413).end('Request is too large');
        return;
      }
      chunks.push(chunk);
    }

    const headers = new Headers({
      'content-type': incoming.headers['content-type'] || 'application/json',
      'x-local-client': incoming.socket.remoteAddress || 'local'
    });
    if (incoming.headers.origin) headers.set('origin', incoming.headers.origin);

    const abortController = new AbortController();
    outgoing.on('close', () => {
      if (!outgoing.writableEnded) abortController.abort();
    });
    const request = new Request(url, {
      method: 'POST',
      headers,
      body: Buffer.concat(chunks),
      signal: abortController.signal
    });
    const response = await handler(request);
    outgoing.writeHead(response.status, Object.fromEntries(response.headers));
    if (!response.body) {
      outgoing.end();
      return;
    }
    for await (const chunk of response.body) outgoing.write(Buffer.from(chunk));
    outgoing.end();
  } catch {
    if (!outgoing.headersSent) outgoing.writeHead(500);
    outgoing.end('Chat endpoint failed.');
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Local chat API listening at http://127.0.0.1:${port}/api/chat`);
  if (!process.env.OPENAI_API_KEY) console.log('OPENAI_API_KEY is missing; requests will return 503.');
});

function createInMemoryRateLimiter(maxRequests, windowMs) {
  const requestsByClient = new Map();

  return {
    async allow(clientKey, now) {
      const recent = (requestsByClient.get(clientKey) || []).filter(timestamp => now - timestamp < windowMs);
      if (recent.length >= maxRequests) return false;
      recent.push(now);
      requestsByClient.set(clientKey, recent);
      return true;
    }
  };
}