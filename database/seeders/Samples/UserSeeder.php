<?php

namespace Database\Seeders\Samples;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $roles = ['admin', 'manager', 'analyst'];
        $permissions = [
            'manage roles',
            'manage permissions',
            'manage users',
            'view analytics',
            'query ai',
            'manage settings',
            'manage campaigns',
            'manage uploads',
        ];

        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission, 'web');
        }

        foreach ($roles as $role) {
            Role::findOrCreate($role, 'web');
        }

        Role::findByName('admin')->syncPermissions($permissions);
        Role::findByName('manager')->syncPermissions(['manage users', 'view analytics', 'query ai', 'manage campaigns']);
        Role::findByName('analyst')->syncPermissions(['view analytics', 'query ai']);

        $admin = User::query()->create(['name' => 'Admin User', 'email' => 'admin@example.com', 'password' => bcrypt('password')]);
        $manager = User::query()->create(['name' => 'Ops Manager', 'email' => 'manager@example.com', 'password' => bcrypt('password')]);
        $analyst = User::query()->create(['name' => 'AI Analyst', 'email' => 'analyst@example.com', 'password' => bcrypt('password')]);

        $admin->assignRole('admin');
        $manager->assignRole('manager');
        $analyst->assignRole('analyst');
    }
}
