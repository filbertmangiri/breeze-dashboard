<?php

namespace Database\Seeders;

use Database\Seeders\Dev\PermissionSeeder;
use Database\Seeders\Dev\RoleSeeder;
use Database\Seeders\Dev\UserSeeder;
use Illuminate\Database\Seeder;

class DevSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            PermissionSeeder::class,
            RoleSeeder::class,
            UserSeeder::class,
        ]);
    }
}
