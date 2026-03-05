<?php

return [
    'server' => env('OCTANE_SERVER', 'swoole'),
    'https' => env('OCTANE_HTTPS', false),
    'listeners' => [],
    'warm' => [
        App\Services\AI\AIClientService::class,
        App\Services\Query\AIQueryExecutor::class,
    ],
    'max_execution_time' => 30,
];
