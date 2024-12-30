<?php

namespace Database\Seeders\Dev;

use Illuminate\Database\Seeder;
use Silber\Bouncer\BouncerFacade;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = BouncerFacade::role()->create([
            'name' => 'admin',
            'title' => 'Administrator',
            'deletable' => false,
        ]);

        BouncerFacade::allow($admin)->to(['manage-roles']);

        BouncerFacade::role()->create([
            'name' => 'user',
            'title' => 'User',
            'deletable' => false,
        ]);
    }
}
