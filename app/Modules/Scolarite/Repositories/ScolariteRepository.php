<?php

namespace App\Modules\Scolarite\Repositories;

use App\Models\Scolarite;
use App\Modules\AnneeAcademique\Repositories\AnneeAcademiqueRepository;

class ScolariteRepository
{
    public function __construct(
        protected AnneeAcademiqueRepository $anneeAcademiqueRepository
    ) {}

    public function all()
    {
        $anneeActive = $this->anneeAcademiqueRepository->anneeActive();

        return Scolarite::where("annee_universitaire_id", $anneeActive->id)
            ->latest()
            ->get();
    }


    public function create(array $data)
    {
        return Scolarite::create([
            "annee_universitaire_id" => $data['annee_id'],
            "niveau_id" => $data['niveau_id'],
            "type" => $data['type'],
            "montant" => $data['montant'],
        ]);
    }

    public function update(Scolarite $scolarite, array $data)
    {
        return $scolarite->update([
            "annee_universitaire_id" => $data['annee_id'],
            "niveau_id" => $data['niveau_id'],
            "type" => $data['type'],
            "montant" => $data['montant'],
        ]);
    }

    public function delete(Scolarite $scolarite)
    {
        return $scolarite->delete();
    }

    public function scolariteExiste(string $niveau_id, string $type)
    {
        $anneeActive = $this->anneeAcademiqueRepository->anneeActive();

        return Scolarite::where("niveau_id", $niveau_id)
            ->where("type", $type)
            ->where('annee_universitaire_id', $anneeActive->id)
            ->exists();
    }
}
