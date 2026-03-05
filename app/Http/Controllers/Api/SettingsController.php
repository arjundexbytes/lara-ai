<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class SettingsController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'ai_provider' => config('ai.provider'),
            'ollama_endpoint' => config('ai.providers.ollama.endpoint'),
            'vector_driver' => config('ai.vector_store.driver'),
            'meilisearch_host' => config('ai.vector_store.host'),
            'redis_host' => env('REDIS_HOST'),
            'db_connection' => env('DB_CONNECTION'),
        ]);
    }
}
