<?php

namespace Database\Seeders\Samples;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::query()->insert([
            ['name' => 'Enterprise Widget', 'category' => 'Hardware', 'price' => 199.99, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'AI Support Plan', 'category' => 'Services', 'price' => 999.00, 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Data Pipeline Pro', 'category' => 'Software', 'price' => 499.00, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}
