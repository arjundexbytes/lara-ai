<?php

use App\Http\Controllers\Api\ConsolidatedAIController;
use App\Http\Controllers\Api\DashboardMetricsController;
use App\Http\Controllers\Api\DataBrowserController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\SettingsController;
use App\Http\Controllers\Api\SystemStatusController;
use App\Http\Controllers\Api\UserManagementController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'role.permission'])->group(function (): void {
    Route::post('/ai-v2/query', [ConsolidatedAIController::class, 'query'])->middleware('throttle:ai-query');
    Route::get('/system/status', SystemStatusController::class)->middleware('throttle:admin-read');

    Route::get('/dashboard/metrics', DashboardMetricsController::class)->middleware('throttle:admin-read');
    Route::get('/settings', SettingsController::class)->middleware('throttle:admin-read');
    Route::put('/settings', [SettingsController::class, 'update'])->middleware(['permission:manage settings', 'throttle:admin-write']);
    Route::get('/analytics', [DataBrowserController::class, 'analytics'])->middleware('throttle:admin-read');

    Route::get('/users', [DataBrowserController::class, 'users'])->middleware('throttle:admin-read');
    Route::delete('/users/{user}', [UserManagementController::class, 'destroy'])->middleware(['permission:manage users', 'throttle:admin-write']);
    Route::post('/users/{user}/permissions', [UserManagementController::class, 'assignPermissions'])->middleware(['permission:manage users', 'throttle:admin-write']);
    Route::get('/users/{user}/profile', [UserManagementController::class, 'profile'])->middleware('throttle:admin-read');

    Route::get('/products', [DataBrowserController::class, 'products'])->middleware('throttle:admin-read');
    Route::get('/orders', [DataBrowserController::class, 'orders'])->middleware('throttle:admin-read');
    Route::get('/documents', [DataBrowserController::class, 'documents'])->middleware('throttle:admin-read');
    Route::get('/chats', [DataBrowserController::class, 'chats'])->middleware('throttle:admin-read');

    Route::get('/roles', [RoleController::class, 'index'])->middleware(['permission:manage roles', 'throttle:admin-read']);
    Route::post('/roles', [RoleController::class, 'store'])->middleware(['permission:manage roles', 'throttle:admin-write']);
    Route::put('/roles/{role}', [RoleController::class, 'update'])->middleware(['permission:manage roles', 'throttle:admin-write']);
    Route::delete('/roles/{role}', [RoleController::class, 'destroy'])->middleware(['permission:manage roles', 'throttle:admin-write']);
    Route::post('/roles/{role}/permissions', [RoleController::class, 'syncPermissions'])->middleware(['permission:manage roles', 'throttle:admin-write']);

    Route::get('/permissions', [PermissionController::class, 'index'])->middleware(['permission:manage permissions', 'throttle:admin-read']);
    Route::post('/permissions', [PermissionController::class, 'store'])->middleware(['permission:manage permissions', 'throttle:admin-write']);
    Route::put('/permissions/{permission}', [PermissionController::class, 'update'])->middleware(['permission:manage permissions', 'throttle:admin-write']);
    Route::delete('/permissions/{permission}', [PermissionController::class, 'destroy'])->middleware(['permission:manage permissions', 'throttle:admin-write']);
});
