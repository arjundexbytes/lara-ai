<?php

namespace App\Services\Permission\Adapters;

use App\Models\User;

class SpritePermissionAdapter
{
    public function grants(User $user, string $scope): bool
    {
        return $user->can($scope) || $user->hasRole('admin');
    }
}
