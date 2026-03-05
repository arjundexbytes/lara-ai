<?php

namespace Tests\Feature;

use PHPUnit\Framework\TestCase;

class SubscriptionAndPaymentContractTest extends TestCase
{
    public function test_subscription_and_payment_routes_exist(): void
    {
        $api = file_get_contents(__DIR__.'/../../routes/api.php');
        $web = file_get_contents(__DIR__.'/../../routes/web.php');

        $this->assertNotFalse($api);
        $this->assertNotFalse($web);
        $this->assertStringContainsString("Route::get('/subscriptions'", $api);
        $this->assertStringContainsString("Route::post('/subscriptions/change'", $api);
        $this->assertStringContainsString("Route::post('/subscriptions/cancel'", $api);
        $this->assertStringContainsString("Route::post('/payments/checkout-session'", $api);
        $this->assertStringContainsString("Route::post('/payments/webhook'", $api);
        $this->assertStringContainsString("Route::get('/subscription'", $web);
    }

    public function test_subscription_artifacts_exist(): void
    {
        $this->assertFileExists(__DIR__.'/../../app/Models/Plan.php');
        $this->assertFileExists(__DIR__.'/../../app/Models/UserSubscription.php');
        $this->assertFileExists(__DIR__.'/../../app/Models/PaymentLog.php');
        $this->assertFileExists(__DIR__.'/../../app/Http/Controllers/Api/SubscriptionController.php');
        $this->assertFileExists(__DIR__.'/../../app/Http/Controllers/Api/PaymentController.php');
        $this->assertFileExists(__DIR__.'/../../resources/js/Pages/Subscription/Index.jsx');
        $this->assertFileExists(__DIR__.'/../../database/migrations/2026_01_03_000001_create_plans_table.php');
        $this->assertFileExists(__DIR__.'/../../database/migrations/2026_01_03_000002_create_user_subscriptions_table.php');
        $this->assertFileExists(__DIR__.'/../../database/migrations/2026_01_03_000003_create_payment_logs_table.php');
    }
}
