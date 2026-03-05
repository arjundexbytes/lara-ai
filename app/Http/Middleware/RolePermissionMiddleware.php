<?php

namespace App\Http\Middleware;

use App\Services\Permission\PermissionService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RolePermissionMiddleware
{
    public function __construct(private readonly PermissionService $permissionService) {}

    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user || ! $this->permissionService->canAccessAiApi($user)) {
            abort(403, 'Access denied by role/permission policy.');
        }

        return $next($request);
    }
}
