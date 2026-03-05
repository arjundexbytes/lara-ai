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
            'supported_conversations' => config('ai_threads.supported_conversations', []),
        ];
    }

    private function examples(): array
    {
        return [
            'conv_users_analysis' => 'Analyze user growth, engagement, and role distribution for current quarter.',
            'conv_products_analysis' => 'Summarize top products by revenue and category trends.',
            'conv_sales_analysis' => 'Show daily sales totals between date ranges with completion ratios.',
            'conv_user_orders' => 'Show completed orders by user for last 30 days.',
            'conv_business_queries' => 'Generate business KPIs from orders and inventory for executive summary.',
            'conv_ai_discussion' => 'Explain how RAG citations are injected into final answers.',
            'conv_dev_help' => 'Provide implementation guidance for vector fallback and caching.',
            'conv_general_chat' => 'Respond to a general assistant question with concise guidance.',
            'knowledge_lookup' => 'Find policy documents for refunds and summarize.',
        ];
    }
}
