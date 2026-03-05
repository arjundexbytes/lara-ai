<?php

namespace App\Services\Permission\Adapters;

use App\Models\User;

class BoasterPolicyAdapter
{
    public function grants(User $user, string $ability): bool
    {
        if ($user->role === 'admin') {
            return true;
        }

        return in_array($ability, ['ai.query', 'orders.view', 'products.view'], true)
            && in_array($user->role, ['manager', 'analyst'], true);
    }
}
