<?php

namespace Database\Seeders\Dev;

use App\Enums\Gender;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Filbert Mangiri',
            'username' => 'filbertmangiri',
            'email' => 'filbertmangiri12345@gmail.com',
            'gender' => Gender::Male,
            'description' => 'Informatics Student and Fullstack Web Developer',
        ]);

        User::factory()->count(50)->create();
    }
}
