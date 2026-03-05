# Laravel 12 Enterprise AI Platform

Enterprise-grade Laravel 12 AI system skeleton with secure backend orchestration, MCP memory context, RAG retrieval, and animated Inertia/React frontend.

## Core stack
- Laravel 12 + Doctrine ORM/DBAL (MySQL/Postgres)
- Redis semantic cache + embedding memoization
- Laravel Scout vector indexing (`users`, `orders`, `products`, `documents`)
- AI SDK abstraction (default **Ollama**) + vector backend (default **Meilisearch**)
- MCP-style multi-turn context via `conversation_id`
- Boaster + Sprite permission adapters
- JMS Serializer response formatting
- Laravel Octane configuration for AI-heavy endpoints
- Optional Boost configuration for frontend acceleration
- Larastan/PHPStan level 8 config

## Security
- Hardened CORS + CSP + XSS + frame/referrer hardening
- Request sanitization in AI query request layer
- API throttling for all AI/data endpoints
- Doctrine parameterized analytics queries for injection resistance

## Frontend pages
- Landing (animated hero/graphs + auth CTAs)
- Dashboard (live metrics API + latest orders/chat + loaders)
- Chat (multi-turn RAG with sample queries + notifications)
- Users/Products/Orders (pagination/filter/search/analytics scaffolds)
- Documents (audio/video/document filter + summarization action)
- Settings (provider/endpoint visibility and connectivity checks)

## API endpoints
- `POST /api/ai-v2/query`
- `GET /api/system/status`
- `GET /api/dashboard/metrics`
- `GET /api/settings`
- `GET /api/analytics`
- `GET /api/users`, `GET /api/products`, `GET /api/orders`, `GET /api/documents`

## Setup
```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan breeze:install react
php artisan octane:install
npm install
npm run dev
```

## Static analysis
```bash
composer analyse
```

## Automation test assets
- Playwright hybrid test: `tests/e2e/ai-engine.spec.ts`
- Postman collection/environment: `postman/`
