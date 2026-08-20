<?php

namespace App\Http\Middleware;

use App\Enums\RoleUser;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class InspecteurPedagogiqueMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user || (!$user->hasRole(RoleUser::INSPECTEUR_PEDAGOGIQUE->value) && !$user->hasRole(RoleUser::ADMINISTRATEUR->value)))
        {
            abort(403);
        }

        return $next($request);
    }
}
