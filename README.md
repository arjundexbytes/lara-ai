# Laravel 12 Enterprise AI Platform Skeleton

Enterprise-grade Laravel 12 skeleton for AI-assisted analytics, secure API delivery, and scalable RAG orchestration.

## Core stack
- Laravel 12 + Doctrine ORM/DBAL (MySQL/Postgres)
- Redis semantic cache + embedding memoization
- Laravel Scout vector indexing (`users`, `orders`, `products`, `documents`)
- AI SDK abstraction for embeddings and LLM completions
- MCP-style conversation context orchestration (`conversation_id`)
- Boaster + Sprite role/permission adapters
- JMS Serializer for structured API responses
- Inertia + React + Redux frontend
- Laravel Octane config for AI-heavy endpoint performance
- Optional Boost config for frontend bootstrap speed
- Larastan/PHPStan level 8 static analysis config

## Security and hardening
- Hardened CORS + security headers (CSP, XSS, frame/referrer protections)
- API throttling (`ai-query` limiter + status endpoint limits)
- Input sanitization (`strip_tags`, normalized conversation IDs)
- Injection pattern detection in abuse detection layer
- Doctrine parameterized analytics queries to mitigate SQL injection risk

## Features
- Multi-turn chat preserving `conversation_id`
- Vector + RAG retrieval before every completion
- Prebuilt sample RAG queries (orders, products, summaries)
- Aggregate queries, joins, date-range filtering
- Cost-per-request estimation
- Connection checks for DB, Redis, and AI endpoint
- Animated dashboard widgets, table row highlights, and notifications

## APIs
- `POST /api/ai-v2/query` (throttled, secure, JMS-formatted)
- `GET /api/system/status` (connectivity verification)

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
