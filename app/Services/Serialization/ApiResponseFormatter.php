<?php

namespace App\Services\Serialization;

use Illuminate\Http\JsonResponse;
use JMS\Serializer\SerializerBuilder;

class ApiResponseFormatter
{
    public function json(array $payload, string $format = 'json'): JsonResponse
    {
        $serializer = SerializerBuilder::create()->build();
        $serialized = $serializer->serialize($payload, 'json');

        return response()->json([
            'format' => $format,
            'data' => json_decode($serialized, true),
            'meta' => [
                'engine' => 'jms_serializer',
                'version' => 'v2',
            ],
        ]);
    }
}
