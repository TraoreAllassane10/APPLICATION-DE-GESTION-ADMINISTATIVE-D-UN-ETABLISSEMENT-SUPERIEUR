<?php

namespace App\Modules\Evaluation\Services;

use App\Modules\Evaluation\Repositories\ProfesseurEvaluationRepository;
use App\Modules\Professeur\Repositories\ProfesseurRepository;
use App\Modules\Utilisateur\Services\UserService;
use App\Notifications\EvaluationTransmisseNotification;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

class ProfesseurEvaluationService extends EvaluationService
{
    public function __construct(
        public ProfesseurEvaluationRepository $professeurEvaluationRepository,
        public ProfesseurRepository $professeurRepository,
         protected UserService $userService
    ) {
        parent::__construct($professeurEvaluationRepository);
    }

    public function getProfesseurEvaluation(mixed $filtreEnseignement, mixed $filtrePeriode)
    {
        $user = Auth::user();

        $professeur = $this->professeurRepository->findByUserId($user->id);

        return $this->professeurEvaluationRepository->allEvaluation($professeur->id, $filtreEnseignement, $filtrePeriode);
    }

    public function getDernieresEvaluation()
    {
        $user = Auth::user();

        $professeur = $this->professeurRepository->findByUserId($user->id);

        return $this->professeurEvaluationRepository->lastEvaluation($professeur->id);
    }

    // Envoie l'évaluation au service pédagogique
    public function sendEvaluationToPedagogique(string $evaluationId)
    {

        $evaluation = $this->professeurEvaluationRepository->find($evaluationId);

        if ($evaluation->notes()->count() <= 0) {
            throw new Exception('Aucune notes saisie pour cette evaluation');
        }

        $evaluation->est_transmise = 1;
        $evaluation->save();

        // Recupérer tous les inspecteurs pédagogique
        $inspecteurs = $this->userService->getInspecteursPedagogique();

        // Envoyer la notification pour l'évaluation transmisse
        Notification::send($inspecteurs, new EvaluationTransmisseNotification($evaluation));
    }
}
