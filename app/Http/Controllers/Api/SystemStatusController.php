<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\AI\AIClientService;
use Doctrine\DBAL\Connection;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class SystemStatusController extends Controller
{
    public function __construct(
        private readonly Connection $connection,
        private readonly AIClientService $aiClient,
    ) {}

    public function __invoke(): JsonResponse
    {
        $probe = $this->connection->executeQuery('SELECT 1')->fetchOne();
        $db = $probe === 1 || $probe === '1';

        Cache::store('redis')->put('status_ping', now()->toDateTimeString(), 30);
        $redis = Cache::store('redis')->get('status_ping') !== null;

        return response()->json([
            'db' => $db,
            'redis' => $redis,
            'ai' => $this->aiClient->health(),
            'timestamp' => now()->toIso8601String(),
        ]);
    }
}
