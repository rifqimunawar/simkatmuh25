<?php
namespace App\Helpers;

use Modules\Ronda\Models\Ronda;
use Modules\Settings\Models\Menu;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class GetSettings
{
  public static function getMenu()
  {
    $user = Auth::user();
    $menus = Menu::whereNull('deleted_at')
      ->where('is_aktif', '1')
      ->whereHas('roles', function ($query) use ($user) {
        $query->where('roles.id', $user->role_id);
      })
      ->orderBy('id')
      ->get();

    $menuById = $menus->keyBy('id')->toArray();

    $tree = [];
    foreach ($menus as $menu) {
      $item = [
        'id' => $menu->id,
        'title' => $menu->title,
        'href' => $menu->url,
        'icon' => $menu->icon ?? '-', // FIXED
        'children' => [],
      ];

      if ($menu->parent_id) {
        $parentId = $menu->parent_id;
        if (!isset($menuById[$parentId]['_children'])) {
          $menuById[$parentId]['_children'] = [];
        }
        $menuById[$parentId]['_children'][] = $item;
      } else {
        $tree[] = $item;
      }
    }

    $tree = self::buildTree($tree, $menus); // FIXED
    return $tree;
  }

  private static function buildTree(array $nodes, $allMenus)
  {
    foreach ($nodes as &$node) {
      $children = $allMenus->where('parent_id', $node['id']);
      $node['children'] = [];
      foreach ($children as $child) {
        $node['children'][] = [
          'id' => $child->id,
          'title' => $child->title,
          'href' => $child->url,
          'icon' => $child->icon ?? '-', // FIXED
          'children' => [],
        ];
      }
      if (count($node['children']) > 0) {
        $node['children'] = self::buildTree($node['children'], $allMenus); // FIXED
      }
    }
    return $nodes;
  }


















  public static function getBackground()
  {
    $settings = DB::table('settings')->first();
    $data = $settings->background;
    return $data;
  }

  public static function getTelp()
  {
    $settings = DB::table('settings')->first();
    $data = $settings->phone;
    return $data;
  }

  public static function getEmail()
  {
    $settings = DB::table('settings')->first();
    $data = $settings->email;
    return $data;
  }
  public static function getAlamat()
  {
    $settings = DB::table('settings')->first();
    $data = $settings->alamat;
    return $data;
  }
  public static function getNamaWeb()
  {
    $settings = DB::table('settings')->first();
    $data = $settings->name;
    return $data;
  }

  public static function getLogo()
  {
    $settings = DB::table('settings')->first();
    $data = $settings->base_url . 'img/' . $settings->logo;
    return $data;
  }
  public static function getBaseUrl()
  {
    $settings = DB::table('settings')->first();
    $data = $settings->base_url;
    return $data;
  }

}
