<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CardController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('api')->group(function () {

    Route::post('/reset-password', [AuthController::class, 'resetPassword'])
        ->middleware('guest')->name('password.update');

        Route::get('/reset-password/{token}', [AuthController::class, 'resetPasswordToken'])
        ->middleware('guest')->name('password.reset');

    // Public Routes
    Route::get('/card', [CardController::class, 'allCards']);
    
    // Public Routes with auth prefix
    Route::prefix('auth')->group(function() {
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/register-new', [AuthController::class, 'register']);  
        Route::get('/password-forgot', [AuthController::class, 'forgot'])
        ->middleware('guest')
        ->name('password.request');
    });

    Route::prefix('deck')->group(function() {
        Route::get('/trending-leaders', [CardController::class, 'get_trending_leaders']);
        Route::get('/list', [CardController::class, 'get_deck_lists_all']);
        Route::get('/list/view', [CardController::class, 'get_deck_list_data']);
        Route::get('/list/view-deck', [CardController::class, 'get_deck_view_data']);
        Route::get('/get-leaders', [CardController::class, 'get_leaders']);
        Route::post('/submit', [CardController::class, 'submitDeck']);
        
    });

    // Protected Routes
    Route::group(['middleware' => ['auth:sanctum']], function() {
        Route::prefix('auth')->group(function() {
            Route::get('/check', [AuthController::class, 'check']);
            Route::get('/user', [AuthController::class, 'user']);
            Route::post('/logout', [AuthController::class, 'logout'] );
        });
    });


});

Route::get('/{any}', function () {
    return file_get_contents(public_path('index.html'));
})->where('any', '.*');