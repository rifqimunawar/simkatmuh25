<?php

use App\Http\Controllers\GlobalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
  return $request->user();
})->middleware('auth:sanctum');
Route::get('/global/get_menu', [GlobalController::class, 'getMenu']);

// cek validasi token masih valid atau tidak
Route::middleware('auth:sanctum')->get('/v1/auth/check', function (Request $request) {
  return response()->json(['authenticated' => true]);
});
