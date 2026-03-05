<?php

namespace Tests\Feature;

use PHPUnit\Framework\TestCase;

class SpatiePermissionFlowTest extends TestCase
{
    public function test_users_table_no_longer_defines_role_column(): void
    {
        $migration = file_get_contents(__DIR__.'/../../database/migrations/2026_01_01_000001_create_users_table.php');

        $this->assertNotFalse($migration);
        $this->assertStringNotContainsString("->string('role'", $migration);
    }

    public function test_role_and_permission_api_routes_are_registered(): void
    {
        $routes = file_get_contents(__DIR__.'/../../routes/api.php');

        $this->assertNotFalse($routes);
        $this->assertStringContainsString("Route::get('/roles'", $routes);
        $this->assertStringContainsString("Route::post('/roles/{role}/permissions'", $routes);
        $this->assertStringContainsString("Route::get('/permissions'", $routes);
    }

    public function test_settings_update_and_rate_limits_exist(): void
    {
        $routes = file_get_contents(__DIR__.'/../../routes/api.php');
        $provider = file_get_contents(__DIR__.'/../../app/Providers/AppServiceProvider.php');

        $this->assertNotFalse($routes);
        $this->assertNotFalse($provider);
        $this->assertStringContainsString("Route::put('/settings'", $routes);
        $this->assertStringContainsString("RateLimiter::for('admin-read'", $provider);
        $this->assertStringContainsString("RateLimiter::for('admin-write'", $provider);
    }
}
