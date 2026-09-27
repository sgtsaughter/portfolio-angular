# Chat API Setup

The Angular app calls `/api/chat`; this directory contains a hosting-neutral Fetch handler plus a small local Node adapter for development. Production hosting must provide an OpenAI API key and a rate limiter backed by a shared store.

## OpenAI Setup

1. Create an API project in the OpenAI platform and add prepaid credits. The current minimum purchase is $5; choose a one-time amount such as $10.
2. Disable automatic reload in the billing setup. Prepaid credits expire after one year; OpenAI will reject requests when exhausted, though its billing pipeline can have a short delay.
3. Create a project API key. Keep it private; never put it in Angular, source control, browser storage, or chat.
4. Copy `.env.example` to `.env` and enter the key locally as `OPENAI_API_KEY`. The `.env` file is git-ignored.
5. Run `npm run start:api:dev` and `npm start` in separate terminals. Angular proxies `/api` to the local API server.

The local adapter uses an in-memory rate limiter solely for development; its request history resets when it restarts. **Do not deploy `local-dev.mjs` as the production endpoint.** Before public deployment, choose a host and supply a shared rate-limit store plus a trusted client-IP resolver to `createChatHandler`. The application does not track API credit balances or impose its own dollar cap; OpenAI prepaid credits control when model calls stop. Hosting is intentionally undecided.

## Privacy and Limits

The endpoint sends only retrieved excerpts from visible website sections, bounded recent conversation, and the question to OpenAI. Requests set `store: false`. Application analytics retain aggregates only; server code must not log prompt text or model output. OpenAI's API abuse-monitoring retention may still apply according to account policy.

The server caps individual request size, retrieved context, and output tokens, and rate-limits clients to reduce spam. It does not calculate, reserve, or store dollar spend. If OpenAI runs out of prepaid credits, the provider error is returned to the chat; a brief billing-processing overrun may still be possible.