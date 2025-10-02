<?php

use Illuminate\Support\Facades\Route;
use Modules\Settings\Http\Controllers\MenuController;
use Modules\Settings\Http\Controllers\RoleAksesMenuController;
use Modules\Settings\Http\Controllers\RoleController;
use Modules\Settings\Http\Controllers\SettingsController;

Route::middleware(['auth:sanctum'])
  ->prefix('v1/settings')
  ->group(function () {

    Route::get('/menu/index', [MenuController::class, 'index']);
    Route::get('/menu/{id}', [MenuController::class, 'show']);
    Route::post('/menu/store', [MenuController::class, 'store']);
    Route::delete('/menu/{id}', [MenuController::class, 'destroy']);

    Route::get('/roles/index', [RoleController::class, 'index']);
    Route::get('/roles/{id}', [RoleController::class, 'show']);
    Route::post('/roles/store', [RoleController::class, 'store']);
    Route::delete('/roles/{id}', [RoleController::class, 'destroy']);

    Route::get('/roleAksesMenu/index', [RoleAksesMenuController::class, 'index']);
    Route::get('/roleAksesMenu/{id}', [RoleAksesMenuController::class, 'show']);
    Route::post('/roleAksesMenu/store', [RoleAksesMenuController::class, 'permissionStore']);
    Route::delete('/roleAksesMenu/{id}', [RoleAksesMenuController::class, 'destroy']);

    Route::get('/generalSettings/index', [SettingsController::class, 'index']);
    Route::get('/generalSettings/{id}', [SettingsController::class, 'show']);
    Route::post('/generalSettings/store', [SettingsController::class, 'store']);
    Route::delete('/generalSettings/{id}', [SettingsController::class, 'destroy']);

    Route::get('/roleAkses/index', [RoleAksesMenuController::class, 'index']);
    Route::get('/roleAkses/{id}', [RoleAksesMenuController::class, 'show']);
    Route::post('/roleAkses/store', [RoleAksesMenuController::class, 'store']);
    Route::delete('/roleAkses/{id}', [RoleAksesMenuController::class, 'destroy']);
  });
