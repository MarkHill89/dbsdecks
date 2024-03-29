<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\DeckController;
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
    
    Route::get('/password-forgot', [AuthController::class, 'forgot'])
        ->name('password.request');

    Route::get('/reset-password/{token}', [AuthController::class, 'resetPasswordToken'])
        ->middleware('guest')->name('password.reset');

    // Public Routes with auth prefix
    Route::prefix('auth')->group(function () {
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/register-new', [AuthController::class, 'register']);
        Route::get('/username-check', [AuthController::class, 'checkUserName'])
            ->middleware('guest');
        Route::get('/email-check', [AuthController::class, 'checkEmail'])
            ->middleware('guest');
    });

    Route::prefix('card')->group(function() {
        Route::get('/all', [CardController::class, 'allCards']);
        Route::get('/byName', [CardController::class, 'cardsByName']);
    });

    Route::prefix('deck')->group(function () {
        Route::get('/trending-leaders', [CardController::class, 'get_trending_leaders']);
        Route::get('/list/view', [CardController::class, 'get_deck_view_data']);
        Route::get('/list/view-deck', [CardController::class, 'get_deck_list_card_data']);
    });

    // Protected Routes
    Route::group(['middleware' => ['auth:sanctum']], function () {
        Route::prefix('auth')->group(function () {
            Route::get('/user', [AuthController::class, 'user']);
            Route::post('/logout', [AuthController::class, 'logout']);
            Route::post('/update-password', [AuthController::class, 'updatePassword']);
            Route::get('/deck-by-user', [CardController::class, 'get_deck_by_user']);
            Route::post('/update-deck', [CardController::class, 'updateDeck']);
            Route::post('/delete-deck', [CardController::class, 'deleteDeck']);
        });
    });
});

Route::get('/{any}', function () {
    return file_get_contents(public_path('index.html'));
})->where('any', '.*');
