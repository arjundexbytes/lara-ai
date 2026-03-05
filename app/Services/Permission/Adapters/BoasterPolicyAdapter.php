<?php

namespace App\Services\Permission\Adapters;

use App\Models\User;

class BoasterPolicyAdapter
{
    public function grants(User $user, string $ability): bool
    {
        if ($user->hasRole('admin')) {
            return true;
        }

        return $user->can($ability);
    }
}
