<?php

namespace App\Http\Controllers\Pedagogie;

use App\Http\Controllers\Controller;
use App\Http\Requests\note\UpdateNoteRequest;
use App\Services\Pedagogie\EvaluationService;
use App\Services\Pedagogie\NoteService;
use Exception;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class NoteController extends Controller
{
    public function __construct(
        protected NoteService $noteService,
        protected EvaluationService $evaluationService
    ) {}
    public function create(string $evaluation)
    {
        $evaluation = $this->evaluationService->getEvaluation($evaluation);
        return Inertia::render('note/Saisie', [
            "evaluation" => $evaluation
        ]);
    }

    public function update(UpdateNoteRequest $request)
    {
        try {
            $data = $request->validated();

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
