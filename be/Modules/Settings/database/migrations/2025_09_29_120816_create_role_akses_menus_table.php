<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up() : void
  {
    Schema::create('role_akses_menus', function (Blueprint $table) {
      $table->id();

      $table->foreignId('role_id')->nullable();
      $table->foreignId('menu_id')->nullable();

      // Tambah hak akses CRUD
      $table->boolean('can_create')->default(false);
      $table->boolean('can_read')->default(false);
      $table->boolean('can_update')->default(false);
      $table->boolean('can_delete')->default(false);

      $table->string('created_by')->default('unknown');
      $table->string('updated_by')->default('unknown');
      $table->string('deleted_by')->nullable();
      $table->softDeletes();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down() : void
  {
    Schema::dropIfExists('role_akses_menus');
  }
};
