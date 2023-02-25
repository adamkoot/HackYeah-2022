<?php

use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('/user/me', [UserController::class, 'me']);
    Route::get('/user/details/{user_id}', [UserController::class, 'user_details']);
    Route::delete('/user/{user}', [UserController::class, 'delete']);
    Route::post('/user/edit', [UserController::class, 'edit']);

    Route::post('/announcement', [AnnouncementController::class, 'create']);
    Route::delete('/announcement/{announcement}', [AnnouncementController::class, 'delete']);
    Route::get('/announcement/{announcement}', [AnnouncementController::class, 'get']);
    Route::get('/announcements/', [AnnouncementController::class, 'index']);
    Route::get('/announcement/change_status/{announcement_id}/{status}', [AnnouncementController::class, 'change_status']);
    Route::get('/announcement/change_availability/{announcement_id}/{availability}', [AnnouncementController::class, 'change_availability']);
    Route::get('/announcements/my', [AnnouncementController::class, 'my_announcements']);
});
