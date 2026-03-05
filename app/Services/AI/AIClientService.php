<?php

namespace App\Services\AI;

class AIClientService
{
    public function embedding(string $input): array
    {
        return [
            'vector' => [0.11, 0.22, 0.33],
            'input' => $input,
            'provider' => config('ai.provider'),
            'embedding_model' => config('ai.embedding_model'),
        ];
    }

    public function complete(string $prompt): string
    {
        $provider = (string) config('ai.provider');

        return "[$provider] AI completion for: {$prompt}";
    }

    public function health(): bool
    {
        return true;
    }
}
