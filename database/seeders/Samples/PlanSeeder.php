<?php

namespace Database\Seeders\Samples;

use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    public function run(): void
    {
        $plans = [
            ['name' => 'Free', 'slug' => 'free', 'price_cents' => 0, 'ai_query_limit_per_day' => 25, 'max_upload_mb' => 10],
            ['name' => 'Basic', 'slug' => 'basic', 'price_cents' => 1900, 'ai_query_limit_per_day' => 250, 'max_upload_mb' => 50],
            ['name' => 'Pro', 'slug' => 'pro', 'price_cents' => 4900, 'ai_query_limit_per_day' => 1000, 'max_upload_mb' => 150],
            ['name' => 'Enterprise', 'slug' => 'enterprise', 'price_cents' => 19900, 'ai_query_limit_per_day' => 10000, 'max_upload_mb' => 1024],
        ];

        foreach ($plans as $plan) {
            Plan::query()->updateOrCreate(['slug' => $plan['slug']], $plan + ['currency' => 'USD', 'is_active' => true]);
        }
    }
}
