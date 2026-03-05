<?php

namespace App\Services\AbuseDetection;

use App\DTO\AIIntentDTO;
use Illuminate\Validation\ValidationException;

class AIAbuseDetectionService
{
    public function assertSafe(AIIntentDTO $intent): void
    {
        if (str_contains(strtolower($intent->query), 'drop table')) {
            throw ValidationException::withMessages([
                'query' => 'Potential abuse detected.',
            ]);
        }
    }
}
