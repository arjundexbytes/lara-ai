<?php

return [
    'provider' => env('PAYMENT_PROVIDER', 'stripe'),
    'webhook_secret' => env('PAYMENT_WEBHOOK_SECRET', ''),
    'stripe' => [
        'key' => env('STRIPE_KEY', ''),
        'secret' => env('STRIPE_SECRET', ''),
    ],
    'mollie' => [
        'key' => env('MOLLIE_KEY', ''),
    ],
];
