<?php

namespace App\Modules\Note\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Evaluation;
use App\Modules\Evaluation\Services\EvaluationService;
use App\Modules\Note\Requests\UpdateNoteRequest;
use App\Modules\Note\Services\NoteService;
use Exception;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ProfesseurNoteController extends Controller
{
    public function __construct(protected NoteService $noteService, protected EvaluationService $evaluationService) {}

    public function create(Evaluation $evaluation)
    {
        Gate::authorize('update', $evaluation);

        $evaluation = $this->evaluationService->getEvaluation($evaluation->id);

        return Inertia::render('EspaceProfesseur/note/Saisie', [
            "evaluation" => $evaluation
        ]);
    }

    public function update(UpdateNoteRequest $request)
    {
        try {
            $data = $request->validated();

            // Recupere l'evaluation
            $evaluation = $this->evaluationService->getEvaluation($data['evaluation_id']);

            // Verifie si l'evaluation appartient au professeur connecté
            Gate::authorize('update', $evaluation);

            $this->noteService->createOrUpdateNote($data);

            return response()->json([
                "success" => true,
                "message" => "Notes enregistrées avec succès !"
            ]);
        } catch (Exception $e) {
            Log::error("L'enregistrement des notes a echoué !", ["error" => $e->getMessage()]);
            return response()->json([
                "success" => false,
                "message" => "L'enregistrement des notes a echoué !"
            ]);
        }
    }
}
