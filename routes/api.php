<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ScraperController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|


*/
// Marks Routes
Route::get('/scraper', [ScraperController::class, 'index']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});