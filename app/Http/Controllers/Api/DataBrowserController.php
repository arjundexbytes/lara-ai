<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class DataBrowserController extends Controller
{
    public function users(Request $request): JsonResponse
    {
        $this->authorize('viewAny', User::class);
        $q = trim((string) $request->query('q', ''));
        $perPage = max(1, min(50, (int) $request->query('per_page', 10)));

        $users = User::query()
            ->with('roles:id,name')
            ->when($q !== '', fn ($query) => $query->where('name', 'like', "%$q%"))
            ->paginate($perPage);

        return response()->json($users);
    }

    public function products(Request $request): JsonResponse
    {
        $q = trim((string) $request->query('q', ''));
        $perPage = max(1, min(50, (int) $request->query('per_page', 10)));

        $products = Product::query()
            ->when($q !== '', fn ($query) => $query->where('name', 'like', "%$q%"))
            ->paginate($perPage);

        return response()->json($products);
    }

    public function orders(Request $request): JsonResponse
    {
        $status = trim((string) $request->query('status', ''));
        $perPage = max(1, min(50, (int) $request->query('per_page', 10)));

        $orders = Order::query()
            ->when($status !== '', fn ($query) => $query->where('status', $status))
            ->paginate($perPage);

        return response()->json($orders);
    }

    public function documents(Request $request): JsonResponse
    {
        $type = trim((string) $request->query('file_type', ''));
        $perPage = max(1, min(50, (int) $request->query('per_page', 10)));

        $documents = Document::query()
            ->when($type !== '', fn ($query) => $query->where('file_type', $type))
            ->paginate($perPage);

        return response()->json($documents);
    }

    public function chats(Request $request): JsonResponse
    {
        $q = trim((string) $request->query('q', ''));
        $perPage = max(1, min(50, (int) $request->query('per_page', 10)));

        $chats = \App\Models\Chat::query()
            ->when($q !== '', fn ($query) => $query->where('message', 'like', "%$q%"))
            ->orderByDesc('created_at')
            ->paginate($perPage);

        return response()->json($chats);
    }

    public function analytics(): JsonResponse
    {
        $payload = Cache::remember('dashboard:analytics', now()->addMinutes(2), function (): array {
            return [
                'users_by_role' => [
                    'admin' => User::query()->role('admin')->count(),
                    'manager' => User::query()->role('manager')->count(),
                    'analyst' => User::query()->role('analyst')->count(),
                ],
                'orders_by_status' => Order::query()->selectRaw('status, COUNT(*) as total')->groupBy('status')->pluck('total', 'status'),
                'product_categories' => Product::query()->selectRaw('category, COUNT(*) as total')->groupBy('category')->pluck('total', 'category'),
            ];
        });

        return response()->json($payload);
    }
}
