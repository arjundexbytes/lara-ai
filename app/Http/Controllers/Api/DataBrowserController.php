<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DataBrowserController extends Controller
{
    public function users(Request $request): JsonResponse
    {
        $q = (string) $request->query('q', '');
        $users = User::query()
            ->when($q !== '', fn ($query) => $query->where('name', 'like', "%$q%"))
            ->paginate((int) $request->query('per_page', 10));

        return response()->json($users);
    }

    public function products(Request $request): JsonResponse
    {
        $q = (string) $request->query('q', '');
        $products = Product::query()
            ->when($q !== '', fn ($query) => $query->where('name', 'like', "%$q%"))
            ->paginate((int) $request->query('per_page', 10));

        return response()->json($products);
    }

    public function orders(Request $request): JsonResponse
    {
        $status = (string) $request->query('status', '');
        $orders = Order::query()
            ->when($status !== '', fn ($query) => $query->where('status', $status))
            ->paginate((int) $request->query('per_page', 10));

        return response()->json($orders);
    }

    public function documents(Request $request): JsonResponse
    {
        $type = (string) $request->query('file_type', '');
        $documents = Document::query()
            ->when($type !== '', fn ($query) => $query->where('file_type', $type))
            ->paginate((int) $request->query('per_page', 10));

        return response()->json($documents);
    }
}
