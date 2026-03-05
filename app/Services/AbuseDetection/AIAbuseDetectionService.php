<?php

namespace App\Services\AbuseDetection;

use App\DTO\AIIntentDTO;
use Illuminate\Validation\ValidationException;

class AIAbuseDetectionService
{
    public function assertSafe(AIIntentDTO $intent): void
    {
        $query = strtolower($intent->query);
        $signatures = ['drop table', '--', ';--', '/*', '*/', 'xp_'];

        foreach ($signatures as $signature) {
            if (str_contains($query, $signature)) {
                throw ValidationException::withMessages([
                    'query' => 'Potential abuse or injection signature detected.',
                ]);
            }
        }
    }
}
