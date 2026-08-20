<?php

use App\Http\Middleware\AdministrateurMiddleware;
use App\Http\Middleware\EnseignantMiddleware;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\InspecteurPedagogiqueMiddleware;
use App\Http\Middleware\ServiceScolariteMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->alias([
            "administrateur" => AdministrateurMiddleware::class,
            "inspecteur_pedagogique" => InspecteurPedagogiqueMiddleware::class,
            "service_scolarite" => ServiceScolariteMiddleware::class,
            "enseignant" => EnseignantMiddleware::class
        ]);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
