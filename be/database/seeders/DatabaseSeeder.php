<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run() : void
  {
    // User::factory(10)->create();

    User::factory()->create([
      'name' => 'Udin Petot',
      'username' => 'udin',
      'email' => 'udin@gamil.com',
      'password' => Hash::make('password'),
    ]);
      $this->call(UsersTableSeeder::class);
        $this->call(SettingsTableSeeder::class);
        $this->call(MenusTableSeeder::class);
        $this->call(RolesTableSeeder::class);
        $this->call(RoleAksesMenusTableSeeder::class);
        $this->call(LogActivitiesTableSeeder::class);
    }
}
