# Enterprise 11-Layer Architecture Map

1. **HTTP/API Layer**: `app/Http/Requests`, route middleware aliases in `bootstrap/app.php`.
2. **Controller Layer**: `app/Http/Controllers/Api/ConsolidatedAIController.php`.
3. **Request/DTO Layer**: `app/DTO/*` (`AIIntentDTO`, `FilterDTO`, `SortDTO`, `ChatMessageDTO`).
4. **Abuse Detection Layer**: `app/Services/AbuseDetection/AIAbuseDetectionService.php`.
5. **Semantic Cache Layer**: `app/Services/Cache/RedisSemanticCacheService.php`.
6. **Memory/Session Layer**: `app/Services/Memory/*` plus MCP state.
7. **Query Parser Layer**: `app/Services/Query/AIQueryParser.php`.
8. **Query Executor Layer**: `app/Services/Query/AIQueryExecutor.php` (Scout + AI SDK + MCP).
9. **Permission/Access Layer**: `app/Services/Permission/*` (Boaster + Sprite adapters).
10. **Serialization/API Response Layer**: `app/Services/Serialization/ApiResponseFormatter.php`.
11. **Frontend Layer**: `resources/js/**` (Inertia + React + Redux).

## Stability services
- `CostPerRequestService` provides request-level AI cost estimates.
- `SystemStatusController` exposes DB/Redis/AI health for runtime dashboards.
