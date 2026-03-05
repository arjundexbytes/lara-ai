<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AutoLogoutOnIdleMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && $request->hasSession()) {
            $timeout = (int) config('auth_security.idle_timeout_seconds', 1800);
            $lastActivity = (int) $request->session()->get('last_activity', now()->timestamp);

            if (now()->timestamp - $lastActivity > $timeout) {
                auth()->guard('web')->logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
            }

            $request->session()->put('last_activity', now()->timestamp);
        }

        return $next($request);
    }
}
