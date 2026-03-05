<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->can('manage users') || $user->can('view analytics');
    }

    public function viewProfile(User $user, User $model): bool
    {
        return $user->id === $model->id || $user->can('manage users') || $user->can('view analytics');
    }

    public function assignPermissions(User $user, User $model): bool
    {
        return $user->can('manage users') && $user->id !== $model->id;
    }

    public function delete(User $user, User $model): bool
    {
        return $user->can('manage users') && $user->id !== $model->id;
    }
}
