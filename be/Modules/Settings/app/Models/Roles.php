<?php

namespace Modules\Settings\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

// use Modules\Settings\Database\Factories\RolesFactory;

class Roles extends Model
{
  use HasFactory, SoftDeletes;

  protected $guarded = [];
}
