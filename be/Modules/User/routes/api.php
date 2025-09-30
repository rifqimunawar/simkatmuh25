<?php

use Illuminate\Support\Facades\Route;
use Modules\User\Http\Controllers\UserController;


Route::middleware(['auth:sanctum'])
  ->prefix('v1/user')
  ->group(function () {

    Route::get('/index', [UserController::class, 'index']);
    Route::get('/{id}', [UserController::class, 'show']);
    Route::post('/store', [UserController::class, 'store']);
    Route::delete('/{id}', [UserController::class, 'destroy']);

    Route::get('/profile', [UserController::class, 'profile']);
    Route::post('/profile/store', [UserController::class, 'profileStore']);
  });

