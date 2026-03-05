<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SettingsUpdateRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class SettingsController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $runtime = Cache::get('runtime:settings', []);

        return response()->json([
            'ai_provider' => $runtime['ai_provider'] ?? config('ai.provider'),
            'ollama_endpoint' => config('ai.providers.ollama.endpoint'),
            'vector_driver' => $runtime['vector_driver'] ?? config('ai.vector_store.driver'),
            'meilisearch_host' => config('ai.vector_store.host'),
            'redis_host' => $this->mask((string) config('database.redis.default.host')),
            'db_connection' => config('database.default'),
            'rag_top_k' => $runtime['rag_top_k'] ?? (int) config('ai.rag.top_k', 5),
        ]);
    }

    public function update(SettingsUpdateRequest $request): JsonResponse
    {
        $payload = $request->validated();
        Cache::put('runtime:settings', $payload, now()->addDay());

        return response()->json(['saved' => true, 'settings' => $payload]);
    }

    private function mask(string $value): string
    {
        if ($value === '') {
            return 'n/a';
        }

        return substr($value, 0, 2).'***';
    }
}
