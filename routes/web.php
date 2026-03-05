<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function (): void {
    Route::get('/', fn () => Inertia::render('Dashboard/Index'));
    Route::get('/orders', fn () => Inertia::render('Orders/Index'));
    Route::get('/products', fn () => Inertia::render('Products/Index'));
    Route::get('/users', fn () => Inertia::render('Users/Index'));
    Route::get('/documents', fn () => Inertia::render('Documents/Index'));
    Route::get('/settings', fn () => Inertia::render('Settings/Index'));
    Route::get('/chat', fn () => Inertia::render('Chat/Index'));
});
