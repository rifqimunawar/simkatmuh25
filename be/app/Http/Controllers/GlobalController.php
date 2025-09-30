<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Modules\Settings\Models\Menu;

class GlobalController extends Controller
{
  public function getMenu()
  {
    $menus = Menu::whereNull('deleted_at')
      ->where('is_aktif', '1')
      ->orderBy('id')
      ->get();

    $menuById = $menus->keyBy('id')->toArray();
    $tree = [];
    foreach ($menus as $menu) {
      $item = [
        'id' => $menu->id,
        'title' => $menu->title,
        'href' => $menu->url,
        'icon' => $this->$menu->icon ?? '-',
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
    $tree = $this->buildTree($tree, $menus);
    return response()->json($tree);
  }

  private function buildTree(array $nodes, $allMenus)
  {
    foreach ($nodes as &$node) {
      $children = $allMenus->where('parent_id', $node['id']);
      $node['children'] = [];
      foreach ($children as $child) {
        $node['children'][] = [
          'id' => $child->id,
          'title' => $child->title,
          'href' => $child->url,
          'icon' => $this->$child->icon ?? '-',
          'children' => [],
        ];
      }
      if (count($node['children']) > 0) {
        $node['children'] = $this->buildTree($node['children'], $allMenus);
      }
    }
    return $nodes;
  }
}
