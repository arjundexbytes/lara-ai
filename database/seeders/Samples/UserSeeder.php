<?php

namespace Database\Seeders\Samples;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::query()->insert([
            ['name' => 'Admin User', 'email' => 'admin@example.com', 'role' => 'admin', 'password' => bcrypt('password'), 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Ops Manager', 'email' => 'manager@example.com', 'role' => 'manager', 'password' => bcrypt('password'), 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'AI Analyst', 'email' => 'analyst@example.com', 'role' => 'analyst', 'password' => bcrypt('password'), 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
