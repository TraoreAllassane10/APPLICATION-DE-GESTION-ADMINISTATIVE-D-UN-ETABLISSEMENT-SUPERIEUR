<?php

namespace App\Services\Pedagogie;

use App\Repositories\Pedagogie\EvaluationRepository;
use Carbon\Carbon;

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
}
