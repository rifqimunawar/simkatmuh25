<?php

use Illuminate\Support\Facades\Route;
use Modules\Auth\Http\Controllers\AuthController;

Route::post('/login', [AuthController::class, 'authenticate']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
  Route::post('/logout', [AuthController::class, 'logout']);
});
