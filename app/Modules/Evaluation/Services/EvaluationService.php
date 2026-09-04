<?php

namespace App\Modules\Evaluation\Services;

use App\Modules\Evaluation\Repositories\EvaluationRepository;
use Exception;

class EvaluationService
{
    public function __construct(
        protected EvaluationRepository $evaluationRepository
    ) {}

    public function getEvaluationsPaginate(mixed $filtreEnseignement, mixed $filtrePeriode) {
        return $this->evaluationRepository->paginate($filtreEnseignement, $filtrePeriode);
    }

    public function getEvaluations() {
        return $this->evaluationRepository->all();
    }

    public function getEvaluation(string $id) {
        return $this->evaluationRepository->find($id);
    }

    public function createEvaluation(array $data)
    {
        return $this->evaluationRepository->create($data);
    }

     public function updateEvaluation(string $id, array $data)
    {
        $evaluation = $this->evaluationRepository->find($id);  

        $evaluationUpdated = $this->evaluationRepository->update($evaluation, $data);

        // EvaluationUpdated::dispatch($evaluationUpdated);
        
        return $evaluationUpdated;
    }

    public function deleteEvaluation(string $evaluation) {
        $evaluation = $this->evaluationRepository->find($evaluation);

        if (!$evaluation) {
            throw new Exception('Evaluation introuvable');
        }

        return $this->evaluationRepository->delete($evaluation);
    }
}
