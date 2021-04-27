<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\ScraperController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|

*/
// Public Routes
Route::get('/card', [CardController::class, 'allCards']);
Route::prefix('auth')->group(function() {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout'] );
});

// Protected Routes
Route::group(['middleware'=> ['auth:sanctum']], function () {
});

// Marks Routes
Route::get('/scraper', [ScraperController::class, 'index']);
