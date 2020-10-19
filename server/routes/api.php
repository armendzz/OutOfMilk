<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ListController;
use App\Http\Controllers\StoreController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Auth::routes();

Route::post('/apilogin', [LoginController::class, 'apiLogin']);
Route::post('/apiregister', [RegisterController::class, 'apiRegister'])->name('apiRegister');;

/*
Route::apiResource('/list', ListController::class);
Route::apiResource('/store', StoreController::class);
*/
Route::apiResource('/list', ListController::class)->middleware('auth:api');
Route::apiResource('/store', StoreController::class)->middleware('auth:api');

