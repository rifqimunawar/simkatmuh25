<?php

namespace Modules\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Modules\User\Models\LogActivities;

class AuthController extends Controller
{

  public function authenticate(Request $request)
  {
    $request->validate([
      'username' => 'required',
      'password' => 'required',
    ]);

    if (!Auth::attempt($request->only('username', 'password'))) {
      return response()->json(['message' => 'Username atau password salah'], 401);
    }

    $user = Auth::user();

    // logging aktivitas login
    LogActivities::create([
      'user_id' => $user->id,
      'username' => $user->username,
      'activity' => 'login',
      'ip_address' => $request->ip(),
      'user_agent' => $request->userAgent(),
    ]);

    // membuat token Sanctum
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
      'access_token' => $token,
      'token_type' => 'Bearer',
      'user' => $user
    ], 200);
  }

  public function register(Request $request)
  {
    $rules = [
      'name' => 'required|string|max:255',
      'username' => 'required|string|max:255|unique:users,username',
      'email' => 'required|string|email|max:255|unique:users,email',
      'password' => 'required|string|min:6',
      'role_id' => 'nullable|string',
      'img' => 'nullable|string',
    ];

    $messages = [
      'name.required' => 'Nama wajib diisi.',
      'username.required' => 'Username wajib diisi.',
      'username.unique' => 'Username sudah digunakan.',
      'email.required' => 'Email wajib diisi.',
      'email.email' => 'Format email tidak valid.',
      'email.unique' => 'Email sudah terdaftar.',
      'password.required' => 'Password wajib diisi.',
      'password.min' => 'Password minimal 6 karakter.',
    ];

    $validated = $request->validate($rules, $messages);

    $user = User::create([
      'name' => $validated['name'],
      'username' => $validated['username'],
      'email' => $validated['email'],
      'role_id' => $validated['role_id'] ?? null,
      'img' => $validated['img'] ?? null,
      'password' => Hash::make($validated['password']),
    ]);

    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
      'message' => 'Registrasi berhasil.',
      'access_token' => $token,
      'token_type' => 'Bearer',
      'user' => $user
    ], 201);
  }

  public function logout(Request $request)
  {
    $request->user()->currentAccessToken()->delete();

    LogActivities::create([
      'user_id' => $request->user()->id,
      'username' => $request->user()->username,
      'activity' => 'logout',
      'ip_address' => $request->ip(),
      'user_agent' => $request->userAgent(),
    ]);

    return response()->json(['message' => 'Berhasil logout'], 200);
  }
}
