<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AssignPermissionsRequest;
use App\Models\Chat;
use App\Models\Document;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserManagementController extends Controller
{
    public function assignPermissions(AssignPermissionsRequest $request, User $user): JsonResponse
    {
        $this->authorize('assignPermissions', $user);

        $user->syncPermissions($request->validated('permissions'));

        return response()->json(['synced' => true]);
    }

    public function destroy(User $user): JsonResponse
    {
        $this->authorize('delete', $user);

        $user->delete();

        return response()->json(['deleted' => true]);
    }

    public function profile(Request $request, User $user): JsonResponse
    {
        $this->authorize('viewProfile', $user);

        $perPage = max(1, min(50, (int) $request->query('per_page', 10)));

        return response()->json([
            'user' => $user->load(['roles', 'permissions']),
            'products' => Product::query()->latest()->paginate($perPage, ['*'], 'products_page'),
            'orders' => Order::query()->where('user_id', $user->id)->latest()->paginate($perPage, ['*'], 'orders_page'),
            'chats' => Chat::query()->where('user_id', $user->id)->latest('created_at')->paginate($perPage, ['*'], 'chats_page'),
            'documents' => Document::query()->latest('id')->paginate($perPage, ['*'], 'documents_page'),
        ]);
    }
}
