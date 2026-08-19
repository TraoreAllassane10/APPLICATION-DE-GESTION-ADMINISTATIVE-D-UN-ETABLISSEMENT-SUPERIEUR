<?php

namespace App\Services\Pedagogie;

use App\Repositories\Pedagogie\EvaluationRepository;
use Carbon\Carbon;

class EvaluationService
{
    public function __construct(
        protected EvaluationRepository $evaluationRepository
    ) {}

    public function createEvaluation(array $data)
    {
        return $this->evaluationRepository->create($data);
    }
}
