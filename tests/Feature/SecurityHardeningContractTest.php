<?php

namespace Tests\Feature;

use PHPUnit\Framework\TestCase;

class SecurityHardeningContractTest extends TestCase
{
    public function test_security_artifacts_exist(): void
    {
        $this->assertFileExists(__DIR__.'/../../app/Http/Middleware/AutoLogoutOnIdleMiddleware.php');
        $this->assertFileExists(__DIR__.'/../../config/payment.php');
        $this->assertFileExists(__DIR__.'/../../config/auth_security.php');
        $this->assertFileExists(__DIR__.'/../../app/Http/Requests/PaymentWebhookRequest.php');
    }

    public function test_bootstrap_registers_idle_middleware(): void
    {
        $bootstrap = file_get_contents(__DIR__.'/../../bootstrap/app.php');
        $this->assertNotFalse($bootstrap);
        $this->assertStringContainsString('AutoLogoutOnIdleMiddleware::class', $bootstrap);
    }
}
