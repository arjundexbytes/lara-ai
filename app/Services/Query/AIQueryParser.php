<?php

namespace App\Services\Query;

use App\DTO\AIIntentDTO;
use App\DTO\FilterDTO;
use App\DTO\SortDTO;

class AIQueryParser
{
    public function parse(AIIntentDTO $intent, array $payload = []): array
    {
        $normalized = strtolower($intent->query);
        $intentType = str_contains($normalized, 'total') || str_contains($normalized, 'sum') || str_contains($normalized, 'revenue')
            ? 'aggregate'
            : 'lookup';

        return [
            'conversation_id' => $intent->conversationId,
            'query' => $intent->query,
            'intent' => $intentType,
            'filter' => FilterDTO::fromArray($payload),
            'sort' => SortDTO::fromArray($payload),
            'examples' => $this->examples(),
        ];
    }

    private function examples(): array
    {
        return [
            'user_orders' => 'Show completed orders by user for last 30 days',
            'products_summary' => 'Summarize top products by revenue this quarter',
            'knowledge_lookup' => 'Find policy documents for refunds and summarize',
            'daily_sales' => 'Show daily sales totals between date ranges',
        ];
    }
}
