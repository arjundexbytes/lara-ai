<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Chat;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;

class DashboardMetricsController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $payload = Cache::remember('dashboard:metrics', now()->addSeconds(30), function (): array {
            $latestOrders = Order::query()->latest()->limit(5)->get(['id', 'status', 'total', 'created_at']);
            $latestChats = Chat::query()->latest('created_at')->limit(5)->get(['conversation_id', 'role', 'message', 'created_at']);

            $requests = (int) Cache::get('ai:request_count:today', 0);
            $errors = (int) Cache::get('ai:error_count:today', 0);
            $latency = (float) Cache::get('ai:latency_avg_ms', 0);

            return [
                'metrics' => [
                    'avg_ai_latency_ms' => $latency,
                    'ai_requests_today' => $requests,
                    'error_rate' => $requests > 0 ? round($errors / $requests, 4) : 0,
                    'system_health' => $errors > 20 ? 'degraded' : 'healthy',
                ],
                'latest_orders' => $latestOrders,
                'latest_chat' => $latestChats,
            ];
        });

        return response()->json($payload);
    }
}
