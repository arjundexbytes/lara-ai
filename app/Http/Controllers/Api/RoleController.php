<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $q = (string) $request->query('q', '');
        $roles = Role::query()->when($q !== '', fn ($query) => $query->where('name', 'like', "%$q%"))->paginate(10);

        return response()->json($roles);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate(['name' => ['required', 'string', 'max:100']]);
        $role = Role::findOrCreate($validated['name'], 'web');

        return response()->json($role, 201);
    }

    public function update(Request $request, Role $role): JsonResponse
    {
        $validated = $request->validate(['name' => ['required', 'string', 'max:100']]);
        $role->update(['name' => $validated['name']]);

        return response()->json($role);
    }

    public function destroy(Role $role): JsonResponse
    {
        $role->delete();

        return response()->json(['deleted' => true]);
    }

    public function syncPermissions(Request $request, Role $role): JsonResponse
    {
        $validated = $request->validate(['permissions' => ['array']]);
        $permissions = Permission::query()->whereIn('name', $validated['permissions'] ?? [])->pluck('name')->toArray();
        $role->syncPermissions($permissions);

        return response()->json(['synced' => true, 'permissions' => $permissions]);
    }
}
