<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $q = (string) $request->query('q', '');
        $permissions = Permission::query()->when($q !== '', fn ($query) => $query->where('name', 'like', "%$q%"))->paginate(10);

        return response()->json($permissions);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate(['name' => ['required', 'string', 'max:100']]);
        $permission = Permission::findOrCreate($validated['name'], 'web');

        return response()->json($permission, 201);
    }

    public function update(Request $request, Permission $permission): JsonResponse
    {
        $validated = $request->validate(['name' => ['required', 'string', 'max:100']]);
        $permission->update(['name' => $validated['name']]);

        return response()->json($permission);
    }

    public function destroy(Permission $permission): JsonResponse
    {
        $permission->delete();

        return response()->json(['deleted' => true]);
    }
}
