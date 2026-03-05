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
        $this->assertStringContainsString("Route::middleware(['auth:sanctum'])->group", $routes);
        $this->assertStringContainsString("Route::apiResource('roles'", $routes);
        $this->assertStringContainsString("Route::apiResource('permissions'", $routes);
        $this->assertStringContainsString("Route::post('users/{user}/permissions'", $routes);
    }
}
