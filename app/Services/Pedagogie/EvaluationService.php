<?php

namespace App\Services\Pedagogie;

use App\Repositories\Pedagogie\EvaluationRepository;
use Exception;

class EvaluationService
{
    public function __construct(
        protected EvaluationRepository $evaluationRepository
    ) {}

    public function getEvaluationsPaginate() {
        return $this->evaluationRepository->paginate();
    }

    public function getEvaluations() {
        return $this->evaluationRepository->all();
    }

    public function createEvaluation(array $data)
    {
        return $this->evaluationRepository->create($data);
    }

    public function deleteEvaluation(string $evaluation) {
        $evaluation = $this->evaluationRepository->find($evaluation);

        if (!$evaluation) {
            throw new Exception('Evaluation introuvable');
        }

        return $this->evaluationRepository->delete($evaluation);
    }
}
