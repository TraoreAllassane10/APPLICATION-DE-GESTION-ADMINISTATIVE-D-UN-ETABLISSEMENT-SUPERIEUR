<?php

namespace App\Modules\Evaluation\Repositories;

use App\Models\Evaluation;
use App\Modules\AnneeAcademique\Repositories\AnneeAcademiqueRepository;


class EvaluationRepository
{
    public function __construct(
        public AnneeAcademiqueRepository $anneeAcademiqueRepository
    ) {}
    public function all()
    {
        $anneActive = $this->anneeAcademiqueRepository->anneeActive();

        return Evaluation::whereHas("periode_academique", function ($q) use ($anneActive) {
            $q->where('annee_universitaire_id', $anneActive->id);
        })
            ->latest()->get();
    }

    public function paginate(mixed $filtreEnseignement, mixed $filtrePeriode)
    {
        $query = Evaluation::query()->where('est_transmise', 1);

        $query->when($filtreEnseignement, function ($q) use ($filtreEnseignement) {
            if ($filtreEnseignement !== "all") {
                $q->where('enseignement_id', $filtreEnseignement);
            }
        });

        $query->when($filtrePeriode, function ($q) use ($filtrePeriode) {
            if ($filtrePeriode !== "all") {
                $q->where('periode_academique_id', $filtrePeriode);
            }
        });

        return $query->latest()->paginate(20)->withQueryString();
    }

    public function find(string $id)
    {
        $anneeActive = $this->anneeAcademiqueRepository->anneeActive();

        return Evaluation::where('id', $id)
            ->with('notes')
            ->with(['enseignement' => function ($q) use ($anneeActive) {
                $q->with(["niveaux" => function ($q) use ($anneeActive) {
                    $q->with(["inscriptions" => function ($q) use ($anneeActive) {
                        $q->where('annee_universitaire_id', $anneeActive->id);
                    }]);
                }]);
            }])
            ->first()
        ;
    }

    // Liste des 5 Dernieres évaluations transmisse par les enseiganants
    public function lastEvaluations()
    {
        $anneActive = $this->anneeAcademiqueRepository->anneeActive();

        return Evaluation::whereHas("periode_academique", function ($q) use ($anneActive) {
            $q->where('annee_universitaire_id', $anneActive->id);
        })
            ->where("est_transmise", 1)
            ->latest()
            ->limit(5)
            ->get();
    }

    public function create(array $data)
    {
        return Evaluation::create($data);
    }

    public function update(Evaluation $evaluation, array $data)
    {
        $evaluation->update([
            "enseignement_id" => $evaluation->enseignement_id,
            "periode_academique_id" => $evaluation->periode_academique_id,
            "titre" => $data['titre'],
            "type" => $data['type'],
            "date" => $data['date'],
            "coefficient" => $data['coefficient'],
            "note_maximale" => $data['note_maximale'],
        ]);

        return $evaluation->getChanges();
    }

    public function delete(Evaluation $evaluation)
    {
        return $evaluation->delete();
    }
}
