<?php

use App\Http\Controllers\GlobalController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
  return response()->json(['message' => 'Laravel 12 API'], 200);
});

