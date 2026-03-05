<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Bind enterprise services/adapters here.
    }

    public function boot(): void
    {
        // Runtime bootstrap.
    }
}
