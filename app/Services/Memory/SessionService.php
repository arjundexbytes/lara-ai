<?php

namespace App\Services\Memory;

use Illuminate\Contracts\Session\Session;

class SessionService
{
    public function __construct(private readonly Session $session) {}

    public function putContext(string $conversationId, array $context): void
    {
        $this->session->put("mcp_context.$conversationId", $context);
    }

    public function getContext(string $conversationId): array
    {
        return $this->session->get("mcp_context.$conversationId", []);
    }
}
