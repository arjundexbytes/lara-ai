<?php

namespace Tests\Feature;

use PHPUnit\Framework\TestCase;

class HorizonAndUploadsContractTest extends TestCase
{
    public function test_horizon_and_uploads_routes_exist(): void
    {
        $api = file_get_contents(__DIR__.'/../../routes/api.php');
        $web = file_get_contents(__DIR__.'/../../routes/web.php');

        $this->assertNotFalse($api);
        $this->assertNotFalse($web);
        $this->assertStringContainsString("Route::get('/horizon/metrics'", $api);
        $this->assertStringContainsString("Route::get('/uploads'", $api);
        $this->assertStringContainsString("Route::post('/uploads'", $api);
        $this->assertStringContainsString("Route::get('/horizon'", $web);
        $this->assertStringContainsString("Route::get('/uploads'", $web);
    }

    public function test_upload_artifacts_exist(): void
    {
        $this->assertFileExists(__DIR__.'/../../app/Models/Upload.php');
        $this->assertFileExists(__DIR__.'/../../app/Http/Controllers/Api/UploadController.php');
        $this->assertFileExists(__DIR__.'/../../database/migrations/2026_01_02_000004_create_uploads_table.php');
        $this->assertFileExists(__DIR__.'/../../config/horizon.php');
    }
}
