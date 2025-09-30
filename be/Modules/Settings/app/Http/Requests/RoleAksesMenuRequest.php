<?php

namespace Modules\Settings\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RoleAksesMenuRequest extends FormRequest
{
  public function authorize() : bool
  {
    return true;
  }
  public function rules() : array
  {
    return [
      'role_id' => 'required',
      'menu_id' => 'required',
      'can_create' => 'nullable',
      'can_read' => 'nullable',
      'can_update' => 'nullable',
      'can_delete' => 'nullable',
    ];
  }

  public function messages() : array
  {
    return [
      'role_id.required' => 'Role wajib diisi.',
      'menu_id.required' => 'Menu wajib diisi.',
    ];
  }
}
