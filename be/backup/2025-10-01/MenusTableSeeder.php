<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class MenusTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('menus')->delete();
        
        \DB::table('menus')->insert(array (
            0 => 
            array (
                'id' => 1,
                'title' => 'Dashboard',
                'url' => '/dashboard',
                'icon' => NULL,
                'caret' => 0,
                'is_aktif' => 1,
                'parent_id' => NULL,
                'created_by' => 'udin',
                'updated_by' => 'unknown',
                'deleted_by' => NULL,
                'deleted_at' => NULL,
                'created_at' => '2025-09-29 18:22:44',
                'updated_at' => '2025-09-29 18:22:44',
            ),
            1 => 
            array (
                'id' => 2,
                'title' => 'Settings',
                'url' => '/settings',
                'icon' => NULL,
                'caret' => 0,
                'is_aktif' => 1,
                'parent_id' => NULL,
                'created_by' => 'udin',
                'updated_by' => 'unknown',
                'deleted_by' => NULL,
                'deleted_at' => NULL,
                'created_at' => '2025-09-29 18:23:25',
                'updated_at' => '2025-09-29 18:23:25',
            ),
            2 => 
            array (
                'id' => 3,
                'title' => 'General Setting',
                'url' => '/setting/general',
                'icon' => NULL,
                'caret' => 0,
                'is_aktif' => 1,
                'parent_id' => 2,
                'created_by' => 'udin',
                'updated_by' => 'udin',
                'deleted_by' => NULL,
                'deleted_at' => NULL,
                'created_at' => '2025-09-29 18:23:53',
                'updated_at' => '2025-10-01 07:59:34',
            ),
            3 => 
            array (
                'id' => 4,
                'title' => 'Roles',
                'url' => '/setting/role',
                'icon' => NULL,
                'caret' => 0,
                'is_aktif' => 1,
                'parent_id' => NULL,
                'created_by' => 'udin',
                'updated_by' => 'unknown',
                'deleted_by' => NULL,
                'deleted_at' => NULL,
                'created_at' => '2025-09-29 18:24:32',
                'updated_at' => '2025-09-29 18:24:32',
            ),
            4 => 
            array (
                'id' => 5,
                'title' => 'Hak Akses',
                'url' => '/setting/roleAkses',
                'icon' => NULL,
                'caret' => 0,
                'is_aktif' => 1,
                'parent_id' => NULL,
                'created_by' => 'udin',
                'updated_by' => 'unknown',
                'deleted_by' => NULL,
                'deleted_at' => NULL,
                'created_at' => '2025-09-29 18:25:05',
                'updated_at' => '2025-09-29 18:25:05',
            ),
        ));
        
        
    }
}