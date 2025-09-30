<?php

namespace Modules\Settings\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MenuRequest extends FormRequest
{
  public function authorize() : bool
  {
    return true;
  }
  public function rules() : array
  {
    return [
      'title' => 'required|string|max:255',
      'url' => 'required|string|max:255',
      'icon' => 'nullable',
      'caret' => 'nullable',
      'is_aktif' => 'nullable',
      'parent_id' => 'nullable',
    ];
  }

  public function messages() : array
  {
    return [
      'title.required' => 'Nama Menu wajib diisi.',
      'title.string' => 'Nama Menu harus berupa teks.',
      'title.max' => 'Nama Menu maksimal 255 karakter.',
      'url.required' => 'Link Menu wajib diisi.',
      'url.string' => 'Link Menu harus berupa teks.',
      'url.max' => 'Link Menu maksimal 255 karakter.',
    ];
  }
}
