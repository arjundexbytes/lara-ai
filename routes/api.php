<?php

use App\Http\Controllers\Api\ConsolidatedAIController;
use App\Http\Controllers\Api\DashboardMetricsController;
use App\Http\Controllers\Api\DataBrowserController;
use App\Http\Controllers\Api\SettingsController;
use App\Http\Controllers\Api\SystemStatusController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'role.permission'])->group(function (): void {
    Route::post('/ai-v2/query', [ConsolidatedAIController::class, 'query'])->middleware('throttle:ai-query');
    Route::get('/system/status', SystemStatusController::class)->middleware('throttle:60,1');

    Route::get('/dashboard/metrics', DashboardMetricsController::class)->middleware('throttle:120,1');
    Route::get('/settings', SettingsController::class)->middleware('throttle:60,1');
    Route::get('/analytics', [DataBrowserController::class, 'analytics'])->middleware('throttle:120,1');

    Route::get('/users', [DataBrowserController::class, 'users'])->middleware('throttle:120,1');
    Route::get('/products', [DataBrowserController::class, 'products'])->middleware('throttle:120,1');
    Route::get('/orders', [DataBrowserController::class, 'orders'])->middleware('throttle:120,1');
    Route::get('/documents', [DataBrowserController::class, 'documents'])->middleware('throttle:120,1');
});
