<?php

namespace App\Services\Pedagogie;

use App\Repositories\Pedagogie\NoteRepository;
use Exception;

class NoteService
{
    public function __construct(
        protected NoteRepository $noteRepository,
        protected EvaluationService $evaluationService
    ) {}

    public function createOrUpdateNote(array $data)
    {
        $evaluation = $this->evaluationService->getEvaluation($data['evaluation_id']);

        if (!$evaluation) {
            throw new Exception('Evaluation est introuvable !');
        }

        foreach ($data['notes'] as $note) {
            $evaluation->notes()->updateOrCreate(
                [
                    "inscription_id" => $note['inscription_id'],
                ],
                [
                    "valeur" => $note['est_absent'] ? null : $note['valeur'],
                    "est_absent" => $note['est_absent']
                ]
            );
        }

        return $evaluation;
    }
}
