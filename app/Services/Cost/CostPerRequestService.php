<?php

namespace App\Services\Cost;

use App\DTO\AIIntentDTO;

class CostPerRequestService
{
    public function estimate(AIIntentDTO $intent, array $result): array
    {
        $inputTokens = max(1, (int) ceil(strlen($intent->query) / 4));
        $outputTokens = max(1, (int) ceil(strlen((string) ($result['completion'] ?? '')) / 4));
        $embeddingCost = 0.00002 * $inputTokens;
        $completionCost = 0.00006 * ($inputTokens + $outputTokens);

        return [
            'input_tokens' => $inputTokens,
            'output_tokens' => $outputTokens,
            'embedding_usd' => round($embeddingCost, 6),
            'completion_usd' => round($completionCost, 6),
            'total_usd' => round($embeddingCost + $completionCost, 6),
        ];
    }
}
