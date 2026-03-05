# E2E + API Hybrid Validation (Playwright)

## Prerequisites
- Running Laravel app at `http://127.0.0.1:8000`
- Auth token (optional but recommended for protected API checks)

## Run
```bash
API_BASE_URL=http://127.0.0.1:8000/api \
WEB_BASE_URL=http://127.0.0.1:8000 \
AUTH_BEARER_TOKEN=<token> \
npx playwright test tests/e2e/ai-engine.spec.ts
```

This spec validates:
- multi-turn conversation threads
- conversation_id continuity
- baseline frontend landing/dashboard route behavior
- protected API status expectations
