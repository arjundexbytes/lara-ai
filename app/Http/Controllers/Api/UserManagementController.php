<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Chat;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserManagementController extends Controller
{
    public function assignPermissions(Request $request, User $user): JsonResponse
    {
        $validated = $request->validate(['permissions' => ['array']]);
        $user->syncPermissions($validated['permissions'] ?? []);

        return response()->json(['synced' => true]);
    }

    public function destroy(User $user): JsonResponse
    {
        $user->delete();

        return response()->json(['deleted' => true]);
    }

    public function profile(User $user): JsonResponse
    {
        return response()->json([
            'user' => $user->load(['roles', 'permissions']),
            'products' => Product::query()->latest()->limit(5)->get(),
            'orders' => Order::query()->where('user_id', $user->id)->latest()->limit(10)->get(),
            'chats' => Chat::query()->where('user_id', $user->id)->latest('created_at')->limit(20)->get(),
        ]);
    }
}
