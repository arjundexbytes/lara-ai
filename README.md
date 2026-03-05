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

## Security and hardening
- Hardened CORS + CSP + XSS + frame/referrer hardening.
- Request sanitization and strict validation (`FormRequest`) for AI, role, permission, and settings writes.
- Policy-based authorization (`UserPolicy`) plus Spatie permission middleware on all protected APIs.
- Dedicated rate limiters (`ai-query`, `admin-read`, `admin-write`).
- Runtime settings endpoint masks infra values and never returns credentials/tokens.
- Recommendation: run `composer analyse` and fail CI on newly introduced Larastan/PHPStan errors.

## Performance
- AI endpoints run behind Octane-friendly architecture.
- Dashboard and analytics responses use short TTL caching.
- AI pipeline tracks request count, latency, and error rate for operational metrics.
- Scout vector retrieval includes Eloquent fallback path for resilience.

## Frontend pages
- Sidebar: Dashboard, Chat, Users, Products, Orders, Documents, Settings, Roles, Permissions, Vector DB, Campaigns, Uploads, Horizon.
- Top bar: live connection check, notifications, profile shortcut.
- Chat: multi-turn view with latest-first cards, typing loader, sticky input, JSON/text adaptive rendering.
- Users/Roles/Permissions/Settings: loaders, modal workflows, and async action feedback.

## API endpoints
- `POST /api/ai-v2/query`
- `GET /api/system/status`
- `GET /api/horizon/metrics`
- `GET /api/dashboard/metrics`
- `GET /api/settings`
- `PUT /api/settings`
- `GET /api/vector-databases`
- `GET /api/analytics`
- `GET /api/users`, `GET /api/users/{user}/profile`, `POST /api/users/{user}/permissions`, `DELETE /api/users/{user}`
- `GET /api/roles`, `POST /api/roles`, `PUT /api/roles/{role}`, `DELETE /api/roles/{role}`, `POST /api/roles/{role}/permissions`
- `GET /api/permissions`, `POST /api/permissions`, `PUT /api/permissions/{permission}`, `DELETE /api/permissions/{permission}`
- `GET /api/products`, `GET /api/orders`, `GET /api/documents`, `GET /api/chats`
- `GET /api/campaigns`, `POST /api/campaigns`, `PUT /api/campaigns/{campaign}`, `DELETE /api/campaigns/{campaign}`
- `GET /api/uploads`, `POST /api/uploads`, `DELETE /api/uploads/{upload}`
- `GET /api/subscriptions`, `POST /api/subscriptions/change`, `POST /api/subscriptions/cancel`
- `POST /api/payments/checkout-session`, `POST /api/payments/webhook`

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

> Note: this repository snapshot may be distributed without the Laravel CLI bootstrap file (`artisan`).
> In that case, run PHPUnit/Larastan binaries from `vendor/bin` directly instead of `php artisan test`.

## Validation + reporting workflow
```bash
php -l routes/api.php
php -l app/Http/Controllers/Api/ConsolidatedAIController.php
php -l app/Http/Controllers/Api/DataBrowserController.php
php -l app/Http/Controllers/Api/UserManagementController.php
php -l app/Http/Controllers/Api/SettingsController.php
php -l app/Policies/UserPolicy.php
php -l app/Providers/AppServiceProvider.php
php -l tests/Feature/SpatiePermissionFlowTest.php
./vendor/bin/phpunit --filter SpatiePermissionFlowTest
```

Generate a JSON verification report from observability counters:
- `ai:request_count:today`
- `ai:error_count:today`
- `ai:latency_avg_ms`

These map to conversation reliability, error rates, and AI response performance shown in dashboard metrics.

## Automation test assets
- Playwright hybrid test: `tests/e2e/ai-engine.spec.ts`
- Postman collection/environment: `postman/`


## Queue recommendations
- Use `QUEUE_CONNECTION=redis` for background AI tasks, vector ingestion, and campaign dispatch jobs.
- Job scaffolds: `ProcessAIQueryJob`, `IngestVectorDocumentsJob`, `DispatchCampaignJob`.


## Horizon
- Install package: `composer require laravel/horizon`
- Publish assets: `php artisan horizon:install`
- Run horizon: `php artisan horizon`
