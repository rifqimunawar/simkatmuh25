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
    Schema::create('log_activities', function (Blueprint $table) {
      $table->id();
      $table->integer('user_id');
      $table->string('username');
      $table->string('activity');
      $table->string('model_type')->nullable();
      $table->string('model_id')->nullable();
      $table->string('changes')->nullable();
      $table->string('ip_address');
      $table->string('user_agent');
      $table->softDeletes();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down() : void
  {
    Schema::dropIfExists('log_activities');
  }
};
