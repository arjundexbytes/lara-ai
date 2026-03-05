# Enterprise 11-Layer Architecture Map

1. **HTTP/API Layer**: middleware, request validation/sanitization, rate limiting, HardenedCors.
2. **Controller Layer**: `ConsolidatedAIController` and supporting API controllers.
3. **Request/DTO Layer**: `AIIntentDTO`, `FilterDTO`, `SortDTO`, `ChatMessageDTO`.
4. **Abuse Detection Layer**: `AIAbuseDetectionService`.
5. **Cost Layer**: `CostPerRequestService`.
6. **Semantic Cache Layer**: `RedisSemanticCacheService`.
7. **Memory/Session Layer**: `MemoryService` + `SessionService` + MCP context updates.
8. **Query Parser Layer**: `AIQueryParser`.
9. **Query Executor Layer**: `AIQueryExecutor` (Scout + AI SDK + MCP + Doctrine analytics).
10. **Permission/Access Layer**: Spatie Permission + Boaster/Sprite adapters via `PermissionService`.
11. **Serialization/API Response Layer**: `ApiResponseFormatter` with JMS serializer.

## Frontend application
- Inertia + React + Redux pages include Landing, Dashboard, Chat, Users, User Profile, Products, Orders, Settings, Documents, Roles, Permissions.
- Animated charts, skeleton loaders, notifications, confirmation flows, and responsive transitions.
