<?php

use App\Http\Controllers\GlobalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
  return $request->user();
})->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])
  ->prefix('v1/')
  ->group(function () {
    Route::get('global/get_menu', [GlobalController::class, 'getMenu']);
    Route::get('global/get_path', [GlobalController::class, 'getPath']);
  });


// cek validasi token masih valid atau tidak
Route::middleware('auth:sanctum')->get('/v1/auth/check', function (Request $request) {
  return response()->json(['authenticated' => true]);
});
