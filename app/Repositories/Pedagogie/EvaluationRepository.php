<?php

namespace App\Repositories\Pedagogie;

use App\Models\Evaluation;

class EvaluationRepository
{
    public function all()
    {
        return Evaluation::latest()->get();
    }

    public function paginate(mixed $filtreEnseignement, mixed $filtrePeriode)
    {
        $query = Evaluation::query();

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
        return Evaluation::find($id);
    }

    public function create(array $data)
    {
        return Evaluation::create($data);
    }

    public function update(Evaluation $evaluation, array $data)
    {
        return $evaluation->update([
            "enseignement_id" => $evaluation->enseignement_id,
            "periode_academique_id" => $evaluation->periode_academique_id,
            "titre" => $data['titre'],
            "type" => $data['type'],
            "date" => $data['date'],
            "coefficient" => $data['coefficient'],
            "note_maximale" => $data['note_maximale'],
        ]);
    }

    public function delete(Evaluation $evaluation)
    {
        return $evaluation->delete();
    }
}
