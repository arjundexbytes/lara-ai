<?php

return [
    'managers' => [
        'default' => [
            'dev' => env('APP_DEBUG', false),
            'metadata_paths' => [app_path('Doctrine/Entities')],
            'connection' => env('DB_CONNECTION', 'mysql'),
        ],
    ],
];
