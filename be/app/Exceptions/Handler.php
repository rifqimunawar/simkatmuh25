<?php

namespace App\Exceptions;

use Throwable;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
namespace App\Exceptions;

use Throwable;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;

class Handler extends ExceptionHandler
{
  protected $dontReport = [];
  protected $dontFlash = ['current_password', 'password', 'password_confirmation'];

  public function register() : void
  {
    // 404 API
    $this->renderable(function (NotFoundHttpException $e, $request) {
      return response()->json(['message' => 'Endpoint tidak ditemukan'], 404);
    });
  }

  public function render($request, Throwable $e)
  {
    if ($e instanceof ValidationException) {
      return response()->json([
        'message' => 'Validasi gagal',
        'errors' => $e->errors()
      ], 422);
    }

    return response()->json([
      'message' => $e->getMessage() ?: 'Terjadi kesalahan server'
    ], $this->isHttpException($e) ? $e->getStatusCode() : 500);
  }

  protected function unauthenticated($request, AuthenticationException $e)
  {
    return response()->json(['message' => 'Tidak terautentikasi'], 401);
  }
}
