<?php

namespace Tests\Feature;

use PHPUnit\Framework\TestCase;

class EnterpriseEnhancementContractTest extends TestCase
{
    public function test_vector_db_and_campaign_routes_are_registered(): void
    {
        $apiRoutes = file_get_contents(__DIR__.'/../../routes/api.php');
        $webRoutes = file_get_contents(__DIR__.'/../../routes/web.php');

        $this->assertNotFalse($apiRoutes);
        $this->assertNotFalse($webRoutes);

        $this->assertStringContainsString("Route::get('/vector-databases'", $apiRoutes);
        $this->assertStringContainsString("Route::get('/campaigns'", $apiRoutes);
        $this->assertStringContainsString("Route::post('/campaigns'", $apiRoutes);
        $this->assertStringContainsString("Route::get('/vector-dbs'", $webRoutes);
        $this->assertStringContainsString("Route::get('/campaigns'", $webRoutes);
    }

    public function test_queue_jobs_and_config_exist(): void
    {
        $this->assertFileExists(__DIR__.'/../../config/queue.php');
        $this->assertFileExists(__DIR__.'/../../app/Jobs/ProcessAIQueryJob.php');
        $this->assertFileExists(__DIR__.'/../../app/Jobs/IngestVectorDocumentsJob.php');
        $this->assertFileExists(__DIR__.'/../../app/Jobs/DispatchCampaignJob.php');
    }
}
