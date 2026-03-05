# Laravel 12 Enterprise AI Platform Skeleton

Production-ready Laravel 12 architecture skeleton for AI-assisted analytics and operations.

## Core platform
- Laravel 12 + Inertia React + Redux + Breeze-compatible auth pages
- Doctrine ORM/DBAL for aggregate and join analytics
- Redis semantic cache for embeddings and RAG memoization
- Laravel Scout vector indexing for `Users`, `Orders`, `Products`, `Documents`
- AI SDK integration service for embeddings + completions
- MCP-style context orchestration (`conversation_id` memory + session state)
- Role access via Boaster/Sprite adapter services
- JMS Serializer-based API response formatting

## 11-layer architecture
See `app/Support/ARCHITECTURE.md`.

## Endpoints
- `POST /api/ai-v2/query`
- `GET /api/system/status`

### Example payload
```json
{
  "query": "total completed orders in the last month",
  "format": "json",
  "conversation_id": "conv_123",
  "date_from": "2026-01-01",
  "date_to": "2026-01-31"
}
```

## Features included
- Multi-turn chat preserving `conversation_id`
- Vector + RAG retrieval before every completion
- Prebuilt RAG examples (user orders, product summaries, policy lookup)
- Doctrine-backed joins and aggregate queries
- Cost estimation per AI request
- Frontend connection verification button for DB/Redis/AI

## Setup
```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan breeze:install react
npm install
npm run dev
```
