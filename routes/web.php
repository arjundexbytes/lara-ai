<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Landing/Index'));

Route::middleware(['auth'])->group(function (): void {
    Route::get('/dashboard', fn () => Inertia::render('Dashboard/Index'));
    Route::get('/orders', fn () => Inertia::render('Orders/Index'));
    Route::get('/products', fn () => Inertia::render('Products/Index'));
    Route::get('/users', fn () => Inertia::render('Users/Index'));
    Route::get('/users/{id}', fn (int $id) => Inertia::render('Users/Profile', ['id' => $id]));
    Route::get('/documents', fn () => Inertia::render('Documents/Index'));
    Route::get('/settings', fn () => Inertia::render('Settings/Index'));
    Route::get('/roles', fn () => Inertia::render('Roles/Index'));
    Route::get('/permissions', fn () => Inertia::render('Permissions/Index'));
    Route::get('/chat', fn () => Inertia::render('Chat/Index'));
});
