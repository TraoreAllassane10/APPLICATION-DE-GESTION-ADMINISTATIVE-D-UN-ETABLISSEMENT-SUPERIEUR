<?php

namespace App\Modules\Dashboard\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Professeur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfesseurDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $professeur = Professeur::with('enseignements')
            ->where('user_id', $user->id)
            ->firstOrFail();

        return Inertia::render('EspaceProfesseur/dashboard', [
            "professeur" => $professeur
        ]);
    }
}
