<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('roles')->delete();
        
        \DB::table('roles')->insert(array (
            0 => 
            array (
                'id' => 1,
            'role_name' => 'System Adminstrator ( IT ) Update',
                'created_by' => 'udin',
                'updated_by' => 'udin',
                'deleted_by' => 'udin',
                'deleted_at' => '2025-10-01 05:14:43',
                'created_at' => '2025-10-01 05:09:37',
                'updated_at' => '2025-10-01 05:14:43',
            ),
            1 => 
            array (
                'id' => 2,
            'role_name' => 'HRD (Sumber Daya Manusia)',
                'created_by' => 'udin',
                'updated_by' => 'unknown',
                'deleted_by' => 'udin',
                'deleted_at' => '2025-10-01 05:15:13',
                'created_at' => '2025-10-01 05:13:07',
                'updated_at' => '2025-10-01 05:15:13',
            ),
            2 => 
            array (
                'id' => 3,
                'role_name' => 's',
                'created_by' => 'udin',
                'updated_by' => 'unknown',
                'deleted_by' => 'udin',
                'deleted_at' => '2025-10-01 05:38:54',
                'created_at' => '2025-10-01 05:38:32',
                'updated_at' => '2025-10-01 05:38:54',
            ),
            3 => 
            array (
                'id' => 4,
                'role_name' => 'OWNER update',
                'created_by' => 'udin',
                'updated_by' => 'udin',
                'deleted_by' => 'udin',
                'deleted_at' => '2025-10-01 05:56:32',
                'created_at' => '2025-10-01 05:44:15',
                'updated_at' => '2025-10-01 05:56:32',
            ),
            4 => 
            array (
                'id' => 5,
            'role_name' => 'System Adminstrator ( IT ) Update0',
                'created_by' => 'udin',
                'updated_by' => 'udin',
                'deleted_by' => NULL,
                'deleted_at' => NULL,
                'created_at' => '2025-10-01 05:44:32',
                'updated_at' => '2025-10-01 06:34:30',
            ),
            5 => 
            array (
                'id' => 6,
                'role_name' => 'Staff Keuangan',
                'created_by' => 'udin',
                'updated_by' => 'udin',
                'deleted_by' => NULL,
                'deleted_at' => NULL,
                'created_at' => '2025-10-01 05:51:41',
                'updated_at' => '2025-10-01 06:38:04',
            ),
            6 => 
            array (
                'id' => 7,
                'role_name' => 'Direktur',
                'created_by' => 'udin',
                'updated_by' => 'unknown',
                'deleted_by' => NULL,
                'deleted_at' => NULL,
                'created_at' => '2025-10-01 05:53:15',
                'updated_at' => '2025-10-01 05:53:15',
            ),
            7 => 
            array (
                'id' => 8,
                'role_name' => 'OWNER14',
                'created_by' => 'udin',
                'updated_by' => 'udin',
                'deleted_by' => NULL,
                'deleted_at' => NULL,
                'created_at' => '2025-10-01 05:56:24',
                'updated_at' => '2025-10-01 06:37:03',
            ),
            8 => 
            array (
                'id' => 9,
            'role_name' => 'HRD (Sumber Daya Manusia)2',
                'created_by' => 'udin',
                'updated_by' => 'unknown',
                'deleted_by' => NULL,
                'deleted_at' => NULL,
                'created_at' => '2025-10-01 06:03:55',
                'updated_at' => '2025-10-01 06:03:55',
            ),
        ));
        
        
    }
}