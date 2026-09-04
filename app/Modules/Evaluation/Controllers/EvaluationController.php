<?php

namespace App\Modules\Evaluation\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Enseignement\Services\EnseignementService;
use App\Modules\Evaluation\Enums\TypeEvaluationEnum;
use App\Modules\Evaluation\Requests\CreateEvaluationRequest;
use App\Modules\Evaluation\Requests\UpdateEvaluationRequest;
use App\Modules\Evaluation\Services\EvaluationService;
use App\Modules\PeriodeAcademique\Services\PeriodeAcademiqueService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class EvaluationController extends Controller
{
    public function __construct(
        protected EnseignementService $enseignementService,
        protected PeriodeAcademiqueService $periodeAcademiqueService,
        protected EvaluationService $evaluationService
    ) {}
    public function index(Request $request)
    {
        $filtreEnseignement = $request->query('enseignement') ?? "all";
        $filtrePeriode = $request->query('periode') ?? "all";

        $evaluations = $this->evaluationService->getEvaluationsPaginate($filtreEnseignement, $filtrePeriode);
        $enseignements = $this->enseignementService->getEnseignements();
        $periodes = $this->periodeAcademiqueService->all();

        return Inertia::render('evaluation/Index', [
            "evaluations" => $evaluations,
            "enseignements" => $enseignements,
            "periodes" => $periodes,
            "filters" => $request->only(["enseignement", "periode"])
        ]);
    }

    public function create()
    {
        $enseignements = $this->enseignementService->getEnseignements();
        $periodes = $this->periodeAcademiqueService->all();

        return Inertia::render('evaluation/Create', [
            "enseignements" => $enseignements,
            "periodes" => $periodes,
            "type_evaluations" => TypeEvaluationEnum::cases()
        ]);
    }
    
    public function store(CreateEvaluationRequest $createEvaluationRequest)
    {
        try {
            $data = $createEvaluationRequest->validated();

            $this->evaluationService->createEvaluation($data);

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

    public function edit(string $evaluation)
    {
        $evaluation = $this->evaluationService->getEvaluation($evaluation);

        return Inertia::render("evaluation/Edit", [
            "evaluation" => $evaluation,
            "type_evaluations" => TypeEvaluationEnum::cases()
        ]);
    }

    public function update(UpdateEvaluationRequest $updateEvaluationRequest, string $evaluation) 
    {
        try {
            $data = $updateEvaluationRequest->validated();

            $this->evaluationService->updateEvaluation($evaluation, $data);

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

    public function destroy(string $evaluation)
    {
        try {

            $this->evaluationService->deleteEvaluation($evaluation);

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
