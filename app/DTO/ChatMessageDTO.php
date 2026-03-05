<?php

namespace App\DTO;

final readonly class ChatMessageDTO
{
    public function __construct(
        public string $conversationId,
        public int $userId,
        public string $role,
        public string $message,
    ) {}
}
