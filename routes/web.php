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

    // Public Routes with auth
    Route::prefix('auth')->group(function() {
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/register-new', [AuthController::class, 'register']);
        Route::post('/logout', [AuthController::class, 'logout'] );
    });

    // Protected Routes
    Route::group(['middleware'=> ['auth:sanctum']], function () {
        Route::get('/deck/list', [CardController::class, 'all']);
    });

    Route::prefix('auth')->group(function () {
        Route::post('login', [AuthController::class, 'login']);
        Route::get('authlog', [UserController::class, 'index']);
    });

});

Route::get('/{any}', function () {
    return file_get_contents(public_path('index.html'));
})->where('any', '.*');