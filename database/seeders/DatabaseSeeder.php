<?php

namespace Database\Seeders;

use App\Models\Document;
use Database\Seeders\Samples\ChatSeeder;
use Database\Seeders\Samples\OrderSeeder;
use Database\Seeders\Samples\ProductSeeder;
use Database\Seeders\Samples\UserSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            ProductSeeder::class,
            OrderSeeder::class,
            ChatSeeder::class,
        ]);

        Document::query()->insert([
            [
                'title' => 'Enterprise AI Policy',
                'content' => 'All AI requests require RAG context and permission checks.',
                'embedding' => [0.1, 0.5, 0.3],
            ],
            [
                'title' => 'Order SLA Handbook',
                'content' => 'Order processing SLA is 24 hours for premium accounts.',
                'embedding' => [0.9, 0.4, 0.2],
            ],
        ]);
    }
}
