<?php

namespace Database\Seeders\Dev;

use Illuminate\Database\Seeder;
use Silber\Bouncer\BouncerFacade;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BouncerFacade::ability()->create([
            'name' => 'manage-roles',
            'title' => 'Manage Roles and Permissions',
        ]);
    }
}
