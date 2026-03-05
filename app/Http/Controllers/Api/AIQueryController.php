<?php

namespace App\Http\Controllers\Api;

use App\DTO\AIIntentDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\AIQueryRequest;
use App\Services\AbuseDetection\AIAbuseDetectionService;
use App\Services\Query\AIQueryExecutor;
use App\Services\Query\AIQueryParser;
use App\Services\Serialization\ApiResponseFormatter;
use Illuminate\Http\JsonResponse;

class AIQueryController extends Controller
{
    public function __construct(
        private readonly AIAbuseDetectionService $abuseDetectionService,
        private readonly AIQueryParser $queryParser,
        private readonly AIQueryExecutor $queryExecutor,
        private readonly ApiResponseFormatter $responseFormatter,
    ) {}

    public function query(AIQueryRequest $request): JsonResponse
    {
        $intent = new AIIntentDTO(
            query: $request->string('query')->value(),
            format: $request->string('format', 'json')->value(),
            conversationId: $request->string('conversation_id')->value(),
        );

        $this->abuseDetectionService->assertSafe($intent);
        $parsed = $this->queryParser->parse($intent);
        $result = $this->queryExecutor->execute($parsed, $request->user());

        return $this->responseFormatter->json($result, $intent->format);
    }
}
