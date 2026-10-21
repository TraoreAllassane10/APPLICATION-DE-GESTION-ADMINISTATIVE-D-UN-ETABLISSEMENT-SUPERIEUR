<?php

namespace App\Modules\Note\Services;

use App\Modules\Evaluation\Events\EvaluationNoteUpdated;
use App\Modules\Evaluation\Services\EvaluationService;
use App\Modules\Utilisateur\Services\UserService;
use App\Notifications\NoteEditedNotification;
use Exception;
use Illuminate\Support\Facades\Notification;

class NoteService
{
    public function __construct(
        protected EvaluationService $evaluationService,
        protected UserService $userService
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
                    "valeur" => $note['est_absent'] ? null : (float) $note['valeur'] * $evaluation->coefficient,
                    "est_absent" => $note['est_absent']
                ]
            );
        }

        EvaluationNoteUpdated::dispatch($evaluation);

        // Envoie une notification aux inspecteurs pédagogiques
        $inspecteurs = $this->userService->getInspecteursPedagogique();
        Notification::send($inspecteurs, new NoteEditedNotification($evaluation));

        return $evaluation;
    }
}
