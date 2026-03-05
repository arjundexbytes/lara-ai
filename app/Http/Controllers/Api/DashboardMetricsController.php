<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Chat;
use App\Models\Order;
use Illuminate\Http\JsonResponse;

class DashboardMetricsController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $latestOrders = Order::query()->latest()->limit(5)->get(['id', 'status', 'total', 'created_at']);
        $latestChats = Chat::query()->latest('created_at')->limit(5)->get(['conversation_id', 'role', 'message', 'created_at']);

        return response()->json([
            'metrics' => [
                'avg_ai_latency_ms' => 420,
                'ai_requests_today' => Chat::query()->whereDate('created_at', now()->toDateString())->count(),
                'error_rate' => 0.02,
                'system_health' => 'healthy',
            ],
            'latest_orders' => $latestOrders,
            'latest_chat' => $latestChats,
        ]);
    }
}
