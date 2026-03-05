<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class VectorDatabaseController extends Controller
{
    public function index(): JsonResponse
    {
        $runtime = Cache::get('runtime:settings', []);
        $databases = [
            ['name' => 'meilisearch', 'driver' => 'meilisearch', 'status' => 'available'],
            ['name' => 'pgvector', 'driver' => 'database', 'status' => 'available'],
            ['name' => 'redis-vector', 'driver' => 'redis', 'status' => 'available'],
        ];

        return response()->json([
            'active' => $runtime['active_vector_db'] ?? 'meilisearch',
            'items' => $databases,
        ]);
    }
}
