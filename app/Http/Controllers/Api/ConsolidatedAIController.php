<?php

namespace App\Http\Controllers\Api;

use App\DTO\AIIntentDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\AIQueryRequest;
use App\Services\AbuseDetection\AIAbuseDetectionService;
use App\Services\Cost\CostPerRequestService;
use App\Services\Query\AIQueryExecutor;
use App\Services\Query\AIQueryParser;
use App\Services\Serialization\ApiResponseFormatter;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Throwable;

class ConsolidatedAIController extends Controller
{
    public function __construct(
        private readonly AIAbuseDetectionService $abuseDetectionService,
        private readonly AIQueryParser $queryParser,
        private readonly AIQueryExecutor $queryExecutor,
        private readonly CostPerRequestService $costService,
        private readonly ApiResponseFormatter $responseFormatter,
    ) {}

    public function query(AIQueryRequest $request): JsonResponse
    {
        $startedAt = microtime(true);
        $intent = new AIIntentDTO(
            query: $request->string('query')->value(),
            format: $request->string('format', 'json')->value(),
            conversationId: $request->string('conversation_id')->value(),
            userId: (int) $request->user()->getAuthIdentifier(),
        );

        try {
            $this->abuseDetectionService->assertSafe($intent);
            $parsed = $this->queryParser->parse($intent, $request->validated());
            $result = $this->queryExecutor->execute($parsed, $request->user());
            $result['cost'] = $this->costService->estimate($intent, $result);

            $this->trackMetrics($startedAt, false);

            return $this->responseFormatter->json($result, $intent->format);
        } catch (Throwable $throwable) {
            $this->trackMetrics($startedAt, true);
            Log::error('AI query failed', [
                'conversation_id' => $intent->conversationId,
                'error' => $throwable->getMessage(),
            ]);

            return response()->json([
                'message' => 'Unable to process AI query at this time.',
                'conversation_id' => $intent->conversationId,
            ], 422);
        }
    }

    private function trackMetrics(float $startedAt, bool $isError): void
    {
        $latency = (microtime(true) - $startedAt) * 1000;
        $count = (int) Cache::increment('ai:request_count:today');

        if ($isError) {
            Cache::increment('ai:error_count:today');
        }

        $currentAvg = (float) Cache::get('ai:latency_avg_ms', 0);
        $nextAvg = $count <= 1 ? $latency : (($currentAvg * ($count - 1)) + $latency) / $count;
        Cache::put('ai:latency_avg_ms', round($nextAvg, 2), now()->endOfDay());
    }
}
