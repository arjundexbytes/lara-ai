<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AssignPermissionsRequest;
use App\Http\Requests\UpsertRoleRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $q = trim((string) $request->query('q', ''));
        $perPage = max(1, min(50, (int) $request->query('per_page', 10)));

        $roles = Role::query()
            ->with('permissions:id,name')
            ->when($q !== '', fn ($query) => $query->where('name', 'like', "%$q%"))
            ->orderBy('name')
            ->paginate($perPage);

        return response()->json($roles);
    }

    public function store(UpsertRoleRequest $request): JsonResponse
    {
        $role = Role::findOrCreate($request->validated('name'), 'web');

        return response()->json($role, 201);
    }

    public function update(UpsertRoleRequest $request, Role $role): JsonResponse
    {
        $role->update(['name' => $request->validated('name')]);

        return response()->json($role);
    }

    public function destroy(Role $role): JsonResponse
    {
        $role->delete();

        return response()->json(['deleted' => true]);
    }

    public function syncPermissions(AssignPermissionsRequest $request, Role $role): JsonResponse
    {
        $permissions = Permission::query()->whereIn('name', $request->validated('permissions'))->pluck('name')->toArray();
        $role->syncPermissions($permissions);

        return response()->json(['synced' => true, 'permissions' => $permissions]);
    }
}
