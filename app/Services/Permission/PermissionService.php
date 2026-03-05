<?php

namespace App\Services\Permission;

use App\Models\User;
use App\Services\Permission\Adapters\BoasterPolicyAdapter;
use App\Services\Permission\Adapters\SpritePermissionAdapter;

class PermissionService
{
    public function __construct(
        private readonly BoasterPolicyAdapter $boaster,
        private readonly SpritePermissionAdapter $sprite,
    ) {}

    public function canAccessAiApi(User $user): bool
    {
        return $this->boaster->grants($user, 'ai.query')
            && $this->sprite->grants($user, 'ai.query');
    }
}
