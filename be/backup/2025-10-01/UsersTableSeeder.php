<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('users')->delete();
        
        \DB::table('users')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Udin Petot',
                'username' => 'udin',
                'role_id' => NULL,
                'img' => NULL,
                'email' => 'udin@gamil.com',
                'email_verified_at' => '2025-09-29 12:35:49',
                'password' => '$2y$12$cfZbioioKm30FhPKNY3Mw.VWN8WYuEsFV2zsJ0HEW5X908ZtgcFQS',
                'remember_token' => 'Uz5EWpPa0f',
                'deleted_at' => NULL,
                'created_at' => '2025-09-29 12:35:50',
                'updated_at' => '2025-09-29 12:35:50',
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Rifqi Munawar',
                'username' => 'rifqimunawar',
                'role_id' => NULL,
                'img' => NULL,
                'email' => 'rifqimunawar@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$12$TxEgdPz4tPjEoENql7OxHOZFQnQzCVVRiemW9PT2n/dX1sTsCS6oy',
                'remember_token' => NULL,
                'deleted_at' => NULL,
                'created_at' => '2025-09-29 13:16:02',
                'updated_at' => '2025-09-29 13:16:02',
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'Ahmad Mubarok',
                'username' => 'ahmadmubarok',
                'role_id' => NULL,
                'img' => NULL,
                'email' => 'ahmadmubarok@gmail.com',
                'email_verified_at' => NULL,
                'password' => '$2y$12$iIRjTVQiSSi1Dp9jYD7Bf.OicolEjOKstX99bgA9KQigbUe0Lqc96',
                'remember_token' => NULL,
                'deleted_at' => NULL,
                'created_at' => '2025-09-29 13:18:30',
                'updated_at' => '2025-09-29 13:18:30',
            ),
        ));
        
        
    }
}