<?php

namespace App\Providers;

use App\Models\User;
use App\Policies\UserPolicy;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Register enterprise bindings/adapters here.
    }

    public function boot(): void
    {
        Gate::policy(User::class, UserPolicy::class);

        RateLimiter::for('ai-query', function (Request $request): Limit {
            $key = $request->user()?->getAuthIdentifier() ?: $request->ip();

            return Limit::perMinute(30)->by((string) $key);
        });

        RateLimiter::for('admin-read', function (Request $request): Limit {
            $key = $request->user()?->getAuthIdentifier() ?: $request->ip();

            return Limit::perMinute(120)->by('admin-read:'.$key);
        });

        RateLimiter::for('admin-write', function (Request $request): Limit {
            $key = $request->user()?->getAuthIdentifier() ?: $request->ip();

            return Limit::perMinute(45)->by('admin-write:'.$key);
        });
    }
}
