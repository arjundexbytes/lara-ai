# Enterprise 11-Layer Architecture Map

1. **HTTP/API Layer**: Request validation, global middleware (`HardenedCorsMiddleware`), and endpoint rate limiting.
2. **Controller Layer**: `ConsolidatedAIController` orchestration entrypoint.
3. **Request/DTO Layer**: `AIIntentDTO`, `FilterDTO`, `SortDTO`, `ChatMessageDTO`.
4. **Abuse Detection Layer**: `AIAbuseDetectionService` for injection and unsafe pattern checks.
5. **Cost Layer**: `CostPerRequestService` token and cost estimates.
6. **Semantic Cache Layer**: `RedisSemanticCacheService` for cached RAG/embedding responses.
7. **Memory/Session Layer**: `MemoryService` + `SessionService` + MCP context updates.
8. **Query Parser Layer**: `AIQueryParser` with aggregate/lookup intent detection.
9. **Query Executor Layer**: `AIQueryExecutor` (Scout + AI SDK + MCP + Doctrine aggregates).
10. **Permission/Access Layer**: Boaster + Sprite adapters through `PermissionService`.
11. **Serialization/API Response Layer**: JMS serializer formatter.

## Frontend composition
- Inertia + React + Redux pages for Dashboard, Chat, Users, Products, Orders, Settings.
- Animated bars, row highlights, notifications, and responsive layouts.

## Performance + quality
- Octane config (`config/octane.php`) for persistent worker runtime.
- Larastan level 8 (`phpstan.neon.dist`) for strict static analysis.
