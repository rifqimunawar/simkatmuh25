<?php

namespace Modules\User\Http\Controllers;

use App\Helpers\Fungsi;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Modules\User\Http\Requests\UserRequest;

class UserController extends Controller
{
  public function index()
  {
    // $cekAkses = Fungsi::hakAksesRead('/settings/roles');
    // if ($cekAkses !== true) {
    //   return $cekAkses;
    // }

    $data = User::latest()->get();

    return response()->json([
      'title' => 'Data User',
      'data' => $data
    ], 200);
  }
  public function show($id)
  {
    // $cekAkses = Fungsi::hakAksesRead('/settings/roles');
    // if ($cekAkses !== true) {
    //   return $cekAkses;
    // }

    $data = User::findOrFail($id);

    return response()->json([
      'title' => 'Data User',
      'data' => $data
    ], 200);
  }
  public function store(UserRequest $request)
  {
    $data = $request->validated();

    if (!empty($data['password'])) {
      $data['password'] = Hash::make($data['password']);
    }

    if ($request->img) {
      $imageName = Fungsi::saveImage($request, 'img', 'roleImg');
      if ($imageName) {
        $data['img'] = $imageName;
      }
    }

    if ($request->id) {
      // $cekHakAkses = Fungsi::hakAksesUpdate('/settings/roles');
      // if ($cekHakAkses !== true)
      //   return $cekHakAkses;
      $model = User::findOrFail($request->id);
      $data['updated_by'] = Auth::user()->username;
      Fungsi::logModelActivity('Update', $model, $data);
    } else {
      // $cekHakAkses = Fungsi::hakAksesCreate('/settings/roles');
      // if ($cekHakAkses !== true)
      //   return $cekHakAkses;
      $data['created_by'] = Auth::user()->username;
      Fungsi::logModelActivity('Tambah', new User, $data);
    }

    return response()->json([
      'message' => 'Success',
      'detail' => 'Data berhasil ' . ($request->id ? 'diupdate' : 'disimpan')
    ], 200);
  }
  public function destroy($id)
  {
    // $cekHakAkses = Fungsi::hakAksesDelete('/settings/roles');
    // if ($cekHakAkses !== true) {
    //   return $cekHakAkses;
    // }

    $data = User::findOrFail($id);
    $data->deleted_by = Auth::user()->username;
    $data->save();
    $data->delete();
    Fungsi::logModelActivity('Hapus', $data);

    return response()->json([
      'message' => 'Success',
      'detail' => 'Data berhasil dihapus'
    ], 200);
  }

  // ===========================================
  public function profile()
  {
    $userLogin = Auth::user();
    $data = User::findOrFail($userLogin->id);

    return response()->json([
      'title' => 'Data User',
      'data' => $data
    ], 200);
  }

  public function profileStore(UserRequest $request)
  {
    $data = $request->validated();

    if ($request->img) {
      $imageName = Fungsi::saveImage($request, 'img', 'roleImg');
      if ($imageName) {
        $data['img'] = $imageName;
      }
    }

    $userLogin = Auth::user();
    $model = User::findOrFail($userLogin->id);
    $data['updated_by'] = Auth::user()->username;
    Fungsi::logModelActivity('Update', $model, $data);

    return response()->json([
      'message' => 'Success',
      'detail' => 'Data berhasil ' . ($request->id ? 'diupdate' : 'disimpan')
    ], 200);
  }
}
