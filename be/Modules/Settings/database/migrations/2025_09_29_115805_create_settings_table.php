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
    Schema::create('settings', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->string('address')->nullable();
      $table->string('email')->nullable();
      $table->string('phone')->nullable();
      $table->string('base_url')->nullable();
      $table->string('logo')->nullable();
      $table->string('background')->nullable();
      $table->text('description')->nullable();
      $table->string('social_facebook')->nullable();
      $table->string('social_twitter')->nullable();
      $table->string('social_instagram')->nullable();


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
    Schema::dropIfExists('settings');
  }
};
