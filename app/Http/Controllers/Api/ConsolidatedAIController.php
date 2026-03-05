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
        $intent = new AIIntentDTO(
            query: $request->string('query')->value(),
            format: $request->string('format', 'json')->value(),
            conversationId: $request->string('conversation_id')->value(),
            userId: (int) $request->user()->getAuthIdentifier(),
        );

        $this->abuseDetectionService->assertSafe($intent);
        $parsed = $this->queryParser->parse($intent, $request->validated());
        $result = $this->queryExecutor->execute($parsed, $request->user());
        $result['cost'] = $this->costService->estimate($intent, $result);

        return $this->responseFormatter->json($result, $intent->format);
    }
}
