<?php

return [
    'provider' => env('AI_PROVIDER', 'openai'),
    'endpoint' => env('AI_ENDPOINT', 'https://api.openai.com/v1'),
    'embedding_model' => env('AI_EMBEDDING_MODEL', 'text-embedding-3-large'),
    'completion_model' => env('AI_COMPLETION_MODEL', 'gpt-4.1'),
    'rag' => [
        'sources' => ['users', 'orders', 'products', 'documents'],
        'top_k' => 5,
    ],
];
