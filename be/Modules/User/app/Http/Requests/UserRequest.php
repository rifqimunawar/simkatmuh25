<?php

namespace Modules\User\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
  public function authorize() : bool
  {
    return true;
  }

  public function rules() : array
  {
    return [
      'name' => 'required|string|max:255',
      'username' => 'required|string|max:255|unique:users,username',
      'role_id' => 'nullable|string|max:255',
      'img' => 'nullable|string|max:255',
      'email' => 'required|string|email|max:255|unique:users,email',
      'email_verified_at' => 'nullable|date',
      'password' => 'required|string|min:5',
    ];
  }

  public function messages() : array
  {
    return [
      'name.required' => 'Nama wajib diisi.',
      'username.required' => 'Username wajib diisi.',
      'username.unique' => 'Username sudah terpakai.',
      'email.required' => 'Email wajib diisi.',
      'email.email' => 'Format email tidak valid.',
      'email.unique' => 'Email sudah terpakai.',
      'password.required' => 'Password wajib diisi.',
      'password.min' => 'Password minimal 5 karakter.',
    ];
  }


}
