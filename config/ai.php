<?php

return [
    'provider' => env('AI_PROVIDER', 'ollama'),
    'providers' => [
        'ollama' => [
            'endpoint' => env('OLLAMA_ENDPOINT', 'http://localhost:11434'),
            'model' => env('OLLAMA_MODEL', 'llama3.1:8b'),
        ],
        'openai' => [
            'endpoint' => env('OPENAI_ENDPOINT', 'https://api.openai.com/v1'),
            'model' => env('OPENAI_MODEL', 'gpt-4.1'),
        ],
    ],
    'vector_store' => [
        'driver' => env('VECTOR_DRIVER', 'meilisearch'),
        'host' => env('MEILISEARCH_HOST', 'http://127.0.0.1:7700'),
        'key' => env('MEILISEARCH_KEY', 'masterKey'),
    ],
    'embedding_model' => env('AI_EMBEDDING_MODEL', 'nomic-embed-text'),
    'completion_model' => env('AI_COMPLETION_MODEL', 'llama3.1:8b'),
    'rag' => [
        'sources' => ['users', 'orders', 'products', 'documents'],
        'top_k' => 5,
    ],
];
