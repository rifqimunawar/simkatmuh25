<?php

namespace Modules\Settings\Http\Controllers;

use App\Helpers\Fungsi;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Settings\Http\Requests\MenuRequest;
use Modules\Settings\Models\Menu;

class MenuController extends Controller
{
  public function index()
  {
    // $cekAkses = Fungsi::hakAksesRead('/settings/roles');
    // if ($cekAkses !== true) {
    //   return $cekAkses;
    // }

    $data = Menu::latest()->get();

    return response()->json([
      'title' => 'Data Menu',
      'data' => $data
    ], 200);
  }
  public function show($id)
  {
    // $cekAkses = Fungsi::hakAksesRead('/settings/roles');
    // if ($cekAkses !== true) {
    //   return $cekAkses;
    // }

    $data = Menu::findOrFail($id);

    return response()->json([
      'title' => 'Data Menu',
      'data' => $data
    ], 200);
  }
  public function store(MenuRequest $request)
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
      $model = Menu::findOrFail($request->id);
      $data['updated_by'] = Auth::user()->username;
      Fungsi::logModelActivity('Update', $model, $data);
    } else {
      // $cekHakAkses = Fungsi::hakAksesCreate('/settings/roles');
      // if ($cekHakAkses !== true)
      //   return $cekHakAkses;
      $data['created_by'] = Auth::user()->username;
      Fungsi::logModelActivity('Tambah', new Menu, $data);
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

    $data = Menu::findOrFail($id);
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
