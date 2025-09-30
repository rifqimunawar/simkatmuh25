<?php

namespace Modules\Settings\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RolesRequest extends FormRequest
{
  public function authorize() : bool
  {
    return true;
  }

  public function rules() : array
  {
    $id = $this->id; // dipakai saat update

    return [
      'role_name' => 'required|string|max:255|unique:roles,role_name,' . $id,
    ];
  }

  public function messages() : array
  {
    return [
      'role_name.required' => 'Nama role wajib diisi.',
      'role_name.string' => 'Nama role harus berupa teks.',
      'role_name.max' => 'Nama role maksimal 255 karakter.',
      'role_name.unique' => 'Nama role sudah digunakan.',
    ];
  }
}
