<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpsertPermissionRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $q = trim((string) $request->query('q', ''));
        $perPage = max(1, min(50, (int) $request->query('per_page', 10)));

        $permissions = Permission::query()
            ->when($q !== '', fn ($query) => $query->where('name', 'like', "%$q%"))
            ->orderBy('name')
            ->paginate($perPage);

        return response()->json($permissions);
    }

    public function store(UpsertPermissionRequest $request): JsonResponse
    {
        $permission = Permission::findOrCreate($request->validated('name'), 'web');

        return response()->json($permission, 201);
    }

    public function update(UpsertPermissionRequest $request, Permission $permission): JsonResponse
    {
        $permission->update(['name' => $request->validated('name')]);

        return response()->json($permission);
    }

    public function destroy(Permission $permission): JsonResponse
    {
        $permission->delete();

        return response()->json(['deleted' => true]);
    }
}
