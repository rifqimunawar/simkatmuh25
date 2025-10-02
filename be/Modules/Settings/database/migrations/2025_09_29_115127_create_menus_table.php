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
    Schema::create('menus', function (Blueprint $table) {
      $table->id();
      $table->string('title');
      $table->string('url');
      $table->string('path')->nullable();
      $table->string('component')->nullable();
      $table->string('icon')->nullable();
      $table->integer('caret')->default(false);
      $table->integer('is_aktif')->default(true);
      $table->foreignId('parent_id')->nullable();

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
    Schema::dropIfExists('menus');
  }
};
