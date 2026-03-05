<?php

namespace App\Services\AI;

use App\Services\Memory\MemoryService;
use App\Services\Memory\SessionService;

class McpContextOrchestrator
{
    public function __construct(
        private readonly MemoryService $memoryService,
        private readonly SessionService $sessionService,
    ) {}

    public function context(string $conversationId): array
    {
        $context = [
            'session' => $this->sessionService->getContext($conversationId),
            'messages' => $this->memoryService->history($conversationId),
        ];

        $this->sessionService->putContext($conversationId, [
            'last_read_at' => now()->toIso8601String(),
            'messages_count' => count($context['messages']),
        ]);

        return $context;
    }
}
