<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class HorizonMetricsController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $pending = Schema::hasTable('jobs') ? DB::table('jobs')->count() : 0;
        $failed = Schema::hasTable('failed_jobs') ? DB::table('failed_jobs')->count() : 0;

        return response()->json([
            'queues' => [
                'pending_jobs' => $pending,
                'failed_jobs' => $failed,
                'processed_today' => (int) cache('horizon:processed_today', 0),
                'throughput_per_min' => (int) cache('horizon:throughput_per_min', 0),
            ],
        ]);
    }
}
