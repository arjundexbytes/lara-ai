# Laravel 12 Enterprise AI Platform

Enterprise-grade Laravel 12 AI system with secure backend orchestration, MCP memory context, RAG retrieval, and animated Inertia/React frontend.

## Core stack
- Laravel 12 + Doctrine ORM/DBAL (MySQL/Postgres)
- Redis semantic cache + embedding memoization
- Laravel Scout vector indexing (`users`, `orders`, `products`, `documents`)
- AI SDK abstraction (default **Ollama**) + vector backend (default **Meilisearch**)
- MCP-style multi-turn context via `conversation_id`
- **Spatie Laravel Permission** for roles/permissions (no `users.role` column)
- JMS Serializer response formatting
- Laravel Octane configuration for AI-heavy endpoints
- Optional Boost configuration for frontend acceleration
- Larastan/PHPStan level 8 config

## Security
- Hardened CORS + CSP + XSS + frame/referrer hardening
- Request sanitization in AI query request layer
- API throttling for all AI/data endpoints
- Doctrine parameterized analytics queries for injection resistance
- Spatie permission middleware + backend checks on role/permission routes

## Frontend pages
- Landing (animated hero/graphs + auth CTAs)
- Dashboard (live metrics API + latest orders/chat + loaders)
- Chat (multi-turn RAG with sample queries + notifications)
- Users (profile navigation, delete, assign permissions popup, pagination/search)
- Products/Orders/Documents (pagination/filter/search/analytics scaffolds)
- Settings (provider/endpoint visibility and connectivity checks)
- Roles (CRUD + Manage Permissions modal)
- Permissions (CRUD)

## API endpoints
- `POST /api/ai-v2/query`
- `GET /api/system/status`
- `GET /api/dashboard/metrics`
- `GET /api/settings`
- `GET /api/analytics`
- `GET /api/users`, `GET /api/users/{user}/profile`, `POST /api/users/{user}/permissions`, `DELETE /api/users/{user}`
- `GET /api/roles`, `POST /api/roles`, `PUT /api/roles/{role}`, `DELETE /api/roles/{role}`, `POST /api/roles/{role}/permissions`
- `GET /api/permissions`, `POST /api/permissions`, `PUT /api/permissions/{permission}`, `DELETE /api/permissions/{permission}`
- `GET /api/products`, `GET /api/orders`, `GET /api/documents`, `GET /api/chats`

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
