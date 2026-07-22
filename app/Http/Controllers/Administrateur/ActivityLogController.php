<?php

namespace App\Http\Controllers\Administrateur;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Inertia\Inertia;

class ActivityLogController extends Controller
{
    public function index()
    {
        $activites = ActivityLog::latest()->paginate();

        return Inertia::render("historique/Index", ["activites" => $activites]);
    }

    public function show(ActivityLog $activite)
    {
        return Inertia::render("historique/Show", ["activite" => $activite]);
    }
}
