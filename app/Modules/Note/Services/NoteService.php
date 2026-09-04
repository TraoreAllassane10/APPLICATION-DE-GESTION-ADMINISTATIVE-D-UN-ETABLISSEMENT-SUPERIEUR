<?php

namespace App\Modules\Note\Services;

use App\Modules\Evaluation\Events\EvaluationNoteUpdated;
use App\Modules\Evaluation\Services\EvaluationService;
use Exception;


class NoteService
{
    public function __construct(
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
                    "valeur" => $note['est_absent'] ? null : $note['valeur'] * $evaluation->coefficient,
                    "est_absent" => $note['est_absent']
                ]
            );
        }

        EvaluationNoteUpdated::dispatch($evaluation);

        return $evaluation;
    }
}
