<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Landing/Index'));

Route::middleware(['auth'])->group(function (): void {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard/Index'))->middleware('can:view analytics');
    Route::get('/orders', fn () => Inertia::render('Orders/Index'))->middleware('can:view analytics');
    Route::get('/products', fn () => Inertia::render('Products/Index'))->middleware('can:view analytics');
    Route::get('/users', fn () => Inertia::render('Users/Index'))->middleware('can:manage users');
    Route::get('/users/{id}', fn (int $id) => Inertia::render('Users/Profile', ['id' => $id]))->middleware('can:manage users');
    Route::get('/documents', fn () => Inertia::render('Documents/Index'))->middleware('can:view analytics');
    Route::get('/settings', fn () => Inertia::render('Settings/Index'))->middleware('can:manage settings');
    Route::get('/roles', fn () => Inertia::render('Roles/Index'))->middleware('can:manage roles');
    Route::get('/permissions', fn () => Inertia::render('Permissions/Index'))->middleware('can:manage permissions');
    Route::get('/vector-dbs', fn () => Inertia::render('VectorDatabases/Index'))->middleware('can:manage settings');
    Route::get('/campaigns', fn () => Inertia::render('Campaigns/Index'))->middleware('can:manage campaigns');
    Route::get('/chat', fn () => Inertia::render('Chat/Index'))->middleware('can:query ai');
});
