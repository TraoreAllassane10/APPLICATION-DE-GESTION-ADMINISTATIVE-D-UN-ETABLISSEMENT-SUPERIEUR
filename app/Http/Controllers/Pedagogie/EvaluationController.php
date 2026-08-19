<?php

namespace App\Http\Controllers\Pedagogie;

use App\Enums\TypeEvaluationEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\evaluation\CreateEvaluationRequest;
use App\Services\Pedagogie\EnseignementService;
use App\Services\Pedagogie\EvaluationService;
use App\Services\PeriodeAcademiqueService;
use Exception;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class EvaluationController extends Controller
{
    public function __construct(
        protected EnseignementService $enseignementService,
        protected PeriodeAcademiqueService $periodeAcademiqueService,
        protected EvaluationService $evaluationService
    ) {}
    public function index()
    {
        return Inertia::render('evaluation/Index');
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

    public function createSaisirNotes()
    {
        return Inertia::render('evaluation/SaisirNotes');
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
}
