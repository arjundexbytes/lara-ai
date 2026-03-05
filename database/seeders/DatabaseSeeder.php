<?php

namespace Database\Seeders;

use App\Models\Document;
use Database\Seeders\Samples\ChatSeeder;
use Database\Seeders\Samples\OrderSeeder;
use Database\Seeders\Samples\ProductSeeder;
use Database\Seeders\Samples\UserSeeder;
use Database\Seeders\Samples\PlanSeeder;
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
            PlanSeeder::class,
        ]);

        Document::query()->insert([
            [
                'title' => 'Enterprise AI Policy',
                'content' => 'All AI requests require RAG context and permission checks.',
                'file_type' => 'document',
                'embedding' => [0.1, 0.5, 0.3],
            ],
            [
                'title' => 'Support Call Recording Summary',
                'content' => 'Audio transcript summary for escalation handling.',
                'file_type' => 'audio',
                'embedding' => [0.4, 0.2, 0.8],
            ],
            [
                'title' => 'Product Launch Walkthrough',
                'content' => 'Video script and highlights for product launch.',
                'file_type' => 'video',
                'embedding' => [0.9, 0.4, 0.2],
            ],
        ]);
    }
}
