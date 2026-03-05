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
    Route::get('/system/status', SystemStatusController::class)->middleware('throttle:60,1');

    Route::get('/dashboard/metrics', DashboardMetricsController::class)->middleware('throttle:120,1');
    Route::get('/settings', SettingsController::class)->middleware('throttle:60,1');
    Route::get('/analytics', [DataBrowserController::class, 'analytics'])->middleware('throttle:120,1');

    Route::get('/users', [DataBrowserController::class, 'users'])->middleware('throttle:120,1');
    Route::delete('/users/{user}', [UserManagementController::class, 'destroy'])->middleware('permission:manage users');
    Route::post('/users/{user}/permissions', [UserManagementController::class, 'assignPermissions'])->middleware('permission:manage users');
    Route::get('/users/{user}/profile', [UserManagementController::class, 'profile'])->middleware('permission:manage users|view analytics');

    Route::get('/products', [DataBrowserController::class, 'products'])->middleware('throttle:120,1');
    Route::get('/orders', [DataBrowserController::class, 'orders'])->middleware('throttle:120,1');
    Route::get('/documents', [DataBrowserController::class, 'documents'])->middleware('throttle:120,1');
    Route::get('/chats', [DataBrowserController::class, 'chats'])->middleware('throttle:120,1');

    Route::get('/roles', [RoleController::class, 'index'])->middleware('permission:manage roles');
    Route::post('/roles', [RoleController::class, 'store'])->middleware('permission:manage roles');
    Route::put('/roles/{role}', [RoleController::class, 'update'])->middleware('permission:manage roles');
    Route::delete('/roles/{role}', [RoleController::class, 'destroy'])->middleware('permission:manage roles');
    Route::post('/roles/{role}/permissions', [RoleController::class, 'syncPermissions'])->middleware('permission:manage roles');

    Route::get('/permissions', [PermissionController::class, 'index'])->middleware('permission:manage permissions');
    Route::post('/permissions', [PermissionController::class, 'store'])->middleware('permission:manage permissions');
    Route::put('/permissions/{permission}', [PermissionController::class, 'update'])->middleware('permission:manage permissions');
    Route::delete('/permissions/{permission}', [PermissionController::class, 'destroy'])->middleware('permission:manage permissions');
});
