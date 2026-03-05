<?php

namespace Tests\Unit;

use App\DTO\AIIntentDTO;
use App\Services\AbuseDetection\AIAbuseDetectionService;
use Illuminate\Validation\ValidationException;
use PHPUnit\Framework\TestCase;

class AIAbuseDetectionServiceTest extends TestCase
{
    public function test_it_blocks_sql_injection_signatures(): void
    {
        $service = new AIAbuseDetectionService();

        $this->expectException(ValidationException::class);
        $service->assertSafe(new AIIntentDTO('DROP TABLE users; --'));
    }
}
