<?php

return [
    'driver' => env('SCOUT_DRIVER', 'database'),
    'prefix' => env('SCOUT_PREFIX', 'lara_ai_'),
    'queue' => env('SCOUT_QUEUE', true),
    'after_commit' => true,
];
