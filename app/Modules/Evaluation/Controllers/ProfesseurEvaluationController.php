<?php

namespace App\Modules\Evaluation\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Evaluation;
use App\Modules\Enseignement\Services\EnseignementService;
use App\Modules\Evaluation\Enums\TypeEvaluationEnum;
use App\Modules\Evaluation\Requests\CreateEvaluationRequest;
use App\Modules\Evaluation\Requests\UpdateEvaluationRequest;
use App\Modules\Evaluation\Services\ProfesseurEvaluationService;
use App\Modules\PeriodeAcademique\Services\PeriodeAcademiqueService;
use App\Modules\Professeur\Services\ProfesseurService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProfesseurEvaluationController extends Controller
{
    public function __construct(
        public ProfesseurEvaluationService $professeurEvaluationService,
        public EnseignementService $enseignementService,
        public PeriodeAcademiqueService $periodeAcademiqueService,
        public ProfesseurService $professeurService
    ) {}

    public function index(Request $request)
    {
        $filtrePeriode = $request->query('periode') ?? "all";
        $filtreEnseignement = $request->query('enseignement') ?? "all";

        $evaluations = $this->professeurEvaluationService->getProfesseurEvaluation($filtreEnseignement, $filtrePeriode);
        $periodes = $this->periodeAcademiqueService->all();

        // Recupere tous les enseignements du professeur connecté
        $user = $request->user();
        $professeur = $this->professeurService->getProfesseurByUserId($user->id);
        $enseignements = $this->enseignementService->getEnseignementByProfesseurId($professeur->id);

        return Inertia::render("EspaceProfesseur/evaluation/Index", [
            'evaluations' => $evaluations,
            "enseignements" => $enseignements,
            "periodes" => $periodes,
            "filters" => $request->only(["enseignement", "periode"])
        ]);
    }

    public function create()
    {
        // Recupere tous les enseignements de professeur connecté
        $user = Auth::user();
        $professeur = $this->professeurService->getProfesseurByUserId($user->id);
        $enseignements = $this->enseignementService->getEnseignementByProfesseurId($professeur->id);
        $periodes = $this->periodeAcademiqueService->all();

        return Inertia::render('EspaceProfesseur/evaluation/Create', [
            "enseignements" => $enseignements,
            "periodes" => $periodes,
            "type_evaluations" => TypeEvaluationEnum::cases()
        ]);
    }

    public function store(CreateEvaluationRequest $createEvaluationRequest)
    {
        try {
            $data = $createEvaluationRequest->validated();

            // Recupere l'utilisateur connecté
            $user = Auth::user();
            $enseignement = $this->enseignementService->getEnseignement($data['enseignement_id']);

            // On verifie si l'enseignement choisir appartient au professeur connecté.
            if ($enseignement->professeur_id !== $user->professeur?->id)
            {
                abort(403, "Vous n'etes pas authorisé créer des evaluations pour cet enseignement");
            }

            // Cree l'evaluation
            $this->professeurEvaluationService->createEvaluation($data);

            return response()->json([
                "success" => true,
                "message" => "Evaluation crée avec succès"
            ]);
        } catch (Exception $e) {
            Log::error("La création d'evaluation a echoué !", ["erreur" => $e->getMessage()]);

            return response()->json([
                "success" => false,
                "message" => "La création d'evaluation a echouée !"
            ]);
        }
    }

    public function edit(Evaluation $evaluation)
    {
        Gate::authorize('update', $evaluation);

        $evaluation = $this->professeurEvaluationService->getEvaluation($evaluation->id);

        return Inertia::render("EspaceProfesseur/evaluation/Edit", [
            "evaluation" => $evaluation,
            "type_evaluations" => TypeEvaluationEnum::cases()
        ]);
    }

    public function update(UpdateEvaluationRequest $updateEvaluationRequest, Evaluation $evaluation)
    {
         Gate::authorize('update', $evaluation);
         
        try {
            $data = $updateEvaluationRequest->validated();

            $this->professeurEvaluationService->updateEvaluation($evaluation->id, $data);

            return response()->json([
                "success" => true,
                "message" => "Evaluation modifiée avec succès"
            ]);
        } catch (Exception $e) {
            Log::error("La Modification d'evaluation a echouée !", ["erreur" => $e->getMessage()]);

            return response()->json([
                "success" => false,
                "message" => "La Modification d'evaluation a echouée !"
            ]);
        }
    }

    public function destroy(Evaluation $evaluation)
    {
        Gate::authorize('delete', $evaluation);

        try {
            $this->professeurEvaluationService->deleteEvaluation($evaluation->id);

            return response()->json([
                "success" => true,
                "message" => "Evaluation supprimée avec succès"
            ]);
        } catch (Exception $e) {
            Log::error("La suppression d'evaluation a echoué !", ["erreur" => $e->getMessage()]);

            return response()->json([
                "success" => false,
                "message" => "La suppression d'evaluation a echouée !"
            ]);
        }
    }
}
