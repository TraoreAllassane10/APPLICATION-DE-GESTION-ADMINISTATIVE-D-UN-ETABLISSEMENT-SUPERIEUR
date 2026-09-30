<?php

namespace App\Modules\Evaluation\Repositories;

use App\Models\Evaluation;
use App\Modules\AnneeAcademique\Repositories\AnneeAcademiqueRepository;
use Override;

class ProfesseurEvaluationRepository extends EvaluationRepository
{
    public function __construct(AnneeAcademiqueRepository $anneeAcademiqueRepository)
    {
        return parent::__construct($anneeAcademiqueRepository);
    }
    
    public function allEvaluation(string $professeurId, mixed $filtreEnseignement, mixed $filtrePeriode)
    {
        
        $anneActive = $this->anneeAcademiqueRepository->anneeActive();

        if (!$anneActive) {
            return collect([]);
        }

        $query = Evaluation::query()
            ->whereHas('enseignement', function ($q) use ($anneActive, $professeurId) {
                $q->where('professeur_id', $professeurId)
                    ->where('annee_universitaire_id', $anneActive->id);
            })
            ->with('enseignement')
            ->when($filtreEnseignement && $filtreEnseignement !== 'all', function ($q) use ($filtreEnseignement) {
                $q->where('enseignement_id', $filtreEnseignement);
            })
            ->when($filtrePeriode && $filtrePeriode !== 'all', function ($q) use ($filtrePeriode) {
                $q->where('periode_academique_id', $filtrePeriode);
            });

        return $query->latest()->paginate(20)->withQueryString();
    }
}
