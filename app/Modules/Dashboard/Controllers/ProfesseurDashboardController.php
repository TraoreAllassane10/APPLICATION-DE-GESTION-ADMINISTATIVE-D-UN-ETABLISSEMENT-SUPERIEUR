<?php

namespace App\Modules\Dashboard\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Enseignement;
use App\Models\Evaluation;
use App\Models\Professeur;
use App\Modules\AnneeAcademique\Services\AnneeAcademiqueService;
use App\Modules\Evaluation\Services\ProfesseurEvaluationService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfesseurDashboardController extends Controller
{
    public function __construct(
        protected AnneeAcademiqueService $anneeAcademiqueService,
        protected ProfesseurEvaluationService $professeurEvaluationService
    ) {}
    public function index(Request $request)
    {
        $user = $request->user();
        $anneeActive = $this->anneeAcademiqueService->getAnneeActive();

        $professeur = Professeur::with('enseignements')
            ->where('user_id', $user->id)
            ->firstOrFail();

        // Enseignement de l'enseignant
        $enseignements = Enseignement::where('annee_universitaire_id', $anneeActive->id)
            ->where('professeur_id', $professeur->id)
            ->get();

        // Nombre total de matiere enseignée
        $total_matiere = $enseignements
            ->pluck('cours_id')
            ->unique()
            ->count();

        // Nombre total de classe enseignée
        $total_classe = $enseignements->pluck('niveaux')
            ->flatten()
            ->pluck('id')
            ->unique()
            ->count();

        // Nombre total d'evaluation 
        $total_evaluation = 0;
        foreach ($enseignements as $enseignement) {
            $total_evaluation += Evaluation::where('enseignement_id', $enseignement->id)->count();
        }

        // Nombre total d'evaluation non transmise
        $total_evaluation_non_transmise = 0;
        foreach ($enseignements as $enseignement) {
            $total_evaluation_non_transmise += Evaluation::where('enseignement_id', $enseignement->id)
                ->where('est_transmise', 0)
                ->count();
        }

        // 5 Dernieres evaluations
        $dernieres_evaluations = $this->professeurEvaluationService->getDernieresEvaluation();

        // Les evaluations non transmisse 
        $evaluations_non_transmisse = $this->professeurEvaluationService->getEvaluationNonTransmisse();

        return Inertia::render('EspaceProfesseur/dashboard', [
            "professeur" => $professeur,
            "total_matiere" => $total_matiere,
            "total_classe" => $total_classe,
            "total_evaluation" => $total_evaluation,
            "total_evaluation_non_transmise" => $total_evaluation_non_transmise,
            "dernieres_evaluations" => $dernieres_evaluations,
            "evaluations_non_transmisse" => $evaluations_non_transmisse
        ]);
    }
}
