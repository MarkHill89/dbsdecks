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

    // Public Routes
    Route::get('/card', [CardController::class, 'allCards']);
    Route::get('/deck/list', [CardController::class, 'all']);

    
    // Public Routes with auth prefix
    Route::prefix('auth')->group(function() {
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/register-new', [AuthController::class, 'register']);        
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