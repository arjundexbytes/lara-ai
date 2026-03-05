<?php

namespace Tests\Unit;

use App\DTO\AIIntentDTO;
use App\Services\Cost\CostPerRequestService;
use PHPUnit\Framework\TestCase;

class CostPerRequestServiceTest extends TestCase
{
    public function test_estimate_returns_total_cost(): void
    {
        $service = new CostPerRequestService();
        $result = $service->estimate(new AIIntentDTO('hello world'), ['completion' => 'response']);

        $this->assertArrayHasKey('total_usd', $result);
        $this->assertGreaterThan(0, $result['total_usd']);
    }
}
