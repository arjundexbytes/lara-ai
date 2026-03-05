<?php

namespace Database\Seeders\Samples;

use App\Models\Chat;
use App\Models\User;
use Illuminate\Database\Seeder;

class ChatSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::query()->first();

        Chat::query()->insert([
            ['conversation_id' => 'conv_demo_001', 'user_id' => $user->id, 'role' => 'user', 'message' => 'Show total orders by status', 'created_at' => now()],
            ['conversation_id' => 'conv_demo_001', 'user_id' => $user->id, 'role' => 'assistant', 'message' => 'Completed orders currently lead by revenue.', 'created_at' => now()],
        ]);
    }
}
