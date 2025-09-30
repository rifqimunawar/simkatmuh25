<?php

namespace Modules\Settings\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SettingsRequest extends FormRequest
{
  public function authorize() : bool
  {
    return true;
  }

  public function rules() : array
  {
    return [
      'name' => 'required|string|max:255',
      'address' => 'nullable|string|max:255',
      'email' => 'nullable|email|max:255',
      'phone' => 'nullable',
      'base_url' => 'nullable|string|max:255',
      'logo' => 'nullable',
      'background' => 'nullable',
      'description' => 'nullable',
      'social_facebook' => 'nullable',
      'social_twitter' => 'nullable',
      'social_instagram' => 'nullable',
    ];
  }

  public function messages() : array
  {
    return [
      'name.required' => 'Nama Website wajib diisi.',
      'name.string' => 'Nama website harus berupa teks.',
      'name.max' => 'Nama website maksimal 255 karakter.',
      'phone.max' => 'Nomor telpon maksimal 255 karakter.',
      'email.email' => 'Email harus berisi email.',
      'email.max' => 'Email maksimal 255 karakter.',
      'base_url.required' => 'Link Website wajib diisi.',
      'base_url.string' => 'Link website harus berupa teks.',
      'base_url.max' => 'Link website maksimal 255 karakter.',
    ];
  }
}
