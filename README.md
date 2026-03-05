# Laravel 12 Enterprise AI Platform Skeleton

Production-ready Laravel 12 skeleton for AI-assisted analytics and operations with secure API patterns and scalable workers.

## Core stack
- Laravel 12 + Doctrine ORM/DBAL (MySQL/Postgres)
- Redis semantic caching + embedding memoization
- Laravel Scout vector indexing (`users`, `orders`, `products`, `documents`)
- AI SDK abstraction for embeddings + LLM completions
- MCP-style multi-context orchestration by `conversation_id`
- Boaster + Sprite permission adapters
- JMS Serializer response formatting
- Inertia + React + Redux frontend with Breeze React auth placeholders
- Laravel Octane configuration for high-performance AI endpoints
- Larastan (PHPStan level 8) static analysis config
- Optional Boost config toggles for frontend bootstrap acceleration

## 11-layer architecture
See `app/Support/ARCHITECTURE.md` for layer mapping.

## APIs
- `POST /api/ai-v2/query` (throttled with `throttle:ai-query`)
- `GET /api/system/status` (DB/Redis/AI checks)

## Security and reliability
- Hardened CORS middleware with secure defaults and OPTIONS handling
- Rate limiting for AI and system endpoints
- Injection signature detection via abuse detection service
- Doctrine parameterized SQL in analytics repository

## Static analysis
```bash
composer analyse
```

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
