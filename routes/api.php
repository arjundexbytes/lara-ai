<?php

use App\Http\Controllers\Api\ConsolidatedAIController;
use App\Http\Controllers\Api\SystemStatusController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'role.permission'])->group(function (): void {
    Route::post('/ai-v2/query', [ConsolidatedAIController::class, 'query']);
    Route::get('/system/status', SystemStatusController::class);
});
