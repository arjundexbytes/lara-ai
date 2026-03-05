<?php

namespace App\DTO;

final readonly class AIIntentDTO
{
    public function __construct(
        public string $query,
        public string $format = 'json',
        public ?string $conversationId = null,
        public ?int $userId = null,
    ) {}
}
