<?php

namespace App\Services\Permission\Adapters;

use App\Models\User;

class SpritePermissionAdapter
{
    public function grants(User $user, string $scope): bool
    {
        $matrix = [
            'admin' => ['*'],
            'manager' => ['ai.query', 'orders.view', 'products.view', 'users.view'],
            'analyst' => ['ai.query', 'orders.view', 'products.view'],
        ];

        $allowed = $matrix[$user->role] ?? [];

        return in_array('*', $allowed, true) || in_array($scope, $allowed, true);
    }
}
