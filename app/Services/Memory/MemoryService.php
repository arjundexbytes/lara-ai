<?php

namespace App\Services\Memory;

use App\DTO\ChatMessageDTO;
use App\Models\Chat;

class MemoryService
{
    public function append(ChatMessageDTO $message): void
    {
        Chat::query()->create([
            'conversation_id' => $message->conversationId,
            'user_id' => $message->userId,
            'role' => $message->role,
            'message' => $message->message,
        ]);
    }

    public function history(string $conversationId): array
    {
        return Chat::query()
            ->where('conversation_id', $conversationId)
            ->orderBy('created_at')
            ->limit(30)
            ->get(['role', 'message'])
            ->toArray();
    }
}
