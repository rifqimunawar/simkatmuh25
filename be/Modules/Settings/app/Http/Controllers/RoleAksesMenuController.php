<?php

namespace Modules\Settings\Http\Controllers;

use App\Helpers\Fungsi;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Settings\Http\Requests\RoleAksesMenuRequest;
use Modules\Settings\Models\RoleAksesMenu;

class RoleAksesMenuController extends Controller
{
  public function index()
  {
    // $cekAkses = Fungsi::hakAksesRead('/settings/roles');
    // if ($cekAkses !== true) {
    //   return $cekAkses;
    // }

    $data = RoleAksesMenu::latest()->get();

    return response()->json([
      'title' => 'Data Role Akses',
      'data' => $data
    ], 200);
  }
  public function show($id)
  {
    // $cekAkses = Fungsi::hakAksesRead('/settings/roles');
    // if ($cekAkses !== true) {
    //   return $cekAkses;
    // }

    $data = RoleAksesMenu::findOrFail($id);

    return response()->json([
      'title' => 'Data Role Akses',
      'data' => $data
    ], 200);
  }
  public function store(RoleAksesMenuRequest $request)
  {
    $data = $request->validated();

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
      $model = RoleAksesMenu::findOrFail($request->id);
      $data['updated_by'] = Auth::user()->username;
      Fungsi::logModelActivity('Update', $model, $data);
    } else {
      // $cekHakAkses = Fungsi::hakAksesCreate('/settings/roles');
      // if ($cekHakAkses !== true)
      //   return $cekHakAkses;
      $data['created_by'] = Auth::user()->username;
      Fungsi::logModelActivity('Tambah', new RoleAksesMenu, $data);
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

    $data = RoleAksesMenu::findOrFail($id);
    $data->deleted_by = Auth::user()->username;
    $data->save();
    $data->delete();
    Fungsi::logModelActivity('Hapus', $data);

    return response()->json([
      'message' => 'Success',
      'detail' => 'Data berhasil dihapus'
    ], 200);
  }
}
