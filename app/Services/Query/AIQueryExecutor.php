<?php

namespace App\Services\Query;

use App\DTO\ChatMessageDTO;
use App\DTO\FilterDTO;
use App\Models\Document;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Repositories\OrderAnalyticsRepository;
use App\Services\AI\AIClientService;
use App\Services\AI\McpContextOrchestrator;
use App\Services\Cache\RedisSemanticCacheService;
use App\Services\Memory\MemoryService;
use Illuminate\Contracts\Auth\Authenticatable;

class AIQueryExecutor
{
    public function __construct(
        private readonly RedisSemanticCacheService $cache,
        private readonly AIClientService $aiClient,
        private readonly McpContextOrchestrator $mcp,
        private readonly MemoryService $memory,
        private readonly OrderAnalyticsRepository $analytics,
    ) {}

    public function execute(array $parsedIntent, Authenticatable $user): array
    {
        $conversationId = $parsedIntent['conversation_id'];
        $query = $parsedIntent['query'];
        /** @var FilterDTO $filter */
        $filter = $parsedIntent['filter'];

        return $this->cache->remember(md5($conversationId.$query.json_encode($filter)), function () use ($conversationId, $query, $user, $filter, $parsedIntent): array {
            $embedding = $this->aiClient->embedding($query);
            $rag = $this->vectorRagLookup($query);
            $context = $this->mcp->context($conversationId);

            $prompt = json_encode([
                'query' => $query,
                'context' => $context,
                'examples' => $parsedIntent['examples'],
                'rag' => $rag,
                'instructions' => 'Always answer with RAG citations and secure aggregate insights.',
            ]);

            $completion = $this->aiClient->complete($prompt ?: $query);
            $this->memory->append(new ChatMessageDTO($conversationId, (int) $user->getAuthIdentifier(), 'user', $query));
            $this->memory->append(new ChatMessageDTO($conversationId, (int) $user->getAuthIdentifier(), 'assistant', $completion));

            return [
                'conversation_id' => $conversationId,
                'intent' => $parsedIntent['intent'],
                'embedding' => $embedding,
                'rag' => $rag,
                'completion' => $completion,
                'sample_queries' => $parsedIntent['examples'],
                'analytics' => [
                    'totals_by_status' => $this->analytics->totalsByStatus(),
                    'totals_by_date_range' => $this->analytics->totalsByDateRange($filter),
                    'top_users' => $this->analytics->userOrderTotals(),
                ],
            ];
        });
    }

    private function vectorRagLookup(string $query): array
    {
        $limit = (int) config('ai.rag.top_k', 5);

        return [
            'users' => User::search($query)->take($limit)->get()->toArray(),
            'orders' => Order::search($query)->take($limit)->get()->toArray(),
            'products' => Product::search($query)->take($limit)->get()->toArray(),
            'documents' => Document::search($query)->take($limit)->get()->toArray(),
        ];
    }
}
