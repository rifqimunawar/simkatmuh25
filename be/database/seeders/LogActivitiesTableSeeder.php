<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class LogActivitiesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('log_activities')->delete();
        
        \DB::table('log_activities')->insert(array (
            0 => 
            array (
                'id' => 1,
                'user_id' => 1,
                'username' => 'udin',
                'activity' => 'login',
                'model_type' => NULL,
                'model_id' => NULL,
                'changes' => NULL,
                'ip_address' => '127.0.0.1',
                'user_agent' => 'PostmanRuntime/7.48.0',
                'deleted_at' => NULL,
                'created_at' => '2025-09-29 12:50:17',
                'updated_at' => '2025-09-29 12:50:17',
            ),
            1 => 
            array (
                'id' => 2,
                'user_id' => 1,
                'username' => 'udin',
                'activity' => 'login',
                'model_type' => NULL,
                'model_id' => NULL,
                'changes' => NULL,
                'ip_address' => '127.0.0.1',
                'user_agent' => 'PostmanRuntime/7.48.0',
                'deleted_at' => NULL,
                'created_at' => '2025-09-29 13:34:09',
                'updated_at' => '2025-09-29 13:34:09',
            ),
            2 => 
            array (
                'id' => 3,
                'user_id' => 1,
                'username' => 'udin',
                'activity' => 'logout',
                'model_type' => NULL,
                'model_id' => NULL,
                'changes' => NULL,
                'ip_address' => '127.0.0.1',
                'user_agent' => 'PostmanRuntime/7.48.0',
                'deleted_at' => NULL,
                'created_at' => '2025-09-29 13:34:22',
                'updated_at' => '2025-09-29 13:34:22',
            ),
            3 => 
            array (
                'id' => 4,
                'user_id' => 1,
                'username' => 'udin',
                'activity' => 'login',
                'model_type' => NULL,
                'model_id' => NULL,
                'changes' => NULL,
                'ip_address' => '127.0.0.1',
                'user_agent' => 'PostmanRuntime/7.48.0',
                'deleted_at' => NULL,
                'created_at' => '2025-09-29 13:35:00',
                'updated_at' => '2025-09-29 13:35:00',
            ),
            4 => 
            array (
                'id' => 5,
                'user_id' => 1,
                'username' => 'udin',
                'activity' => 'login',
                'model_type' => NULL,
                'model_id' => NULL,
                'changes' => NULL,
                'ip_address' => '127.0.0.1',
                'user_agent' => 'PostmanRuntime/7.48.0',
                'deleted_at' => NULL,
                'created_at' => '2025-09-29 13:42:33',
                'updated_at' => '2025-09-29 13:42:33',
            ),
            5 => 
            array (
                'id' => 6,
                'user_id' => 1,
                'username' => 'udin',
                'activity' => 'login',
                'model_type' => NULL,
                'model_id' => NULL,
                'changes' => NULL,
                'ip_address' => '127.0.0.1',
                'user_agent' => 'PostmanRuntime/7.48.0',
                'deleted_at' => NULL,
                'created_at' => '2025-09-29 13:50:08',
                'updated_at' => '2025-09-29 13:50:08',
            ),
            6 => 
            array (
                'id' => 7,
                'user_id' => 1,
                'username' => 'udin',
                'activity' => 'logout',
                'model_type' => NULL,
                'model_id' => NULL,
                'changes' => NULL,
                'ip_address' => '127.0.0.1',
                'user_agent' => 'PostmanRuntime/7.48.0',
                'deleted_at' => NULL,
                'created_at' => '2025-09-29 13:50:29',
                'updated_at' => '2025-09-29 13:50:29',
            ),
        ));
        
        
    }
}