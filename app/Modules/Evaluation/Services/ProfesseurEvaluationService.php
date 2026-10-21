<?php

namespace App\Modules\Evaluation\Services;

use App\Modules\Evaluation\Repositories\ProfesseurEvaluationRepository;
use App\Modules\Professeur\Repositories\ProfesseurRepository;
use App\Modules\Utilisateur\Services\UserService;
use Illuminate\Support\Facades\Auth;

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

}
