<?php

namespace App\Modules\Enseignement\Services;

use App\Models\Enseignement;
use App\Modules\AnneeAcademique\Services\AnneeAcademiqueService;
use Illuminate\Support\Facades\Cache;


class EnseignementService
{
    public function __construct(
        protected AnneeAcademiqueService $anneeAcademiqueService
    ) {}

    public function getEnseignements()
    {
        return Cache::remember('enseignement:all', 3600, function () {
            return Enseignement::latest()->get();
        });
    }

    public function getEnseignement(string $id)
    {
        return Enseignement::where("id", $id)->first();
    }

    public function createEnseignement(string $coursId, string $professeurId)
    {
        $anneeActive = $this->anneeAcademiqueService->getAnneeActive();

        $enseignement = Enseignement::create([
            "professeur_id" => $professeurId,
            "cours_id" => $coursId,
            "annee_universitaire_id" => $anneeActive->id
        ]);

        Cache::forget('enseignement:all');

        return $enseignement;
    }

    public function updateEnseignement(string $id, array $data)
    {
        $enseignement = Enseignement::find($id);
        $enseignementModifie = $enseignement->niveaux()->sync($data['classes']);

        Cache::forget('enseignement:all');

        return $enseignementModifie;
    }

    public function deleteEnseignement(string $id)
    {
        $enseignement = Enseignement::find($id);
        $enseignementSupprime = $enseignement->delete();

        Cache::forget('enseignement:all');

        return $enseignementSupprime;
    }

    public function updateCoefficentInClasse(string $id, array $data)
    {
        $enseignement = Enseignement::find($id);

        $coefficientModifie = $enseignement->niveaux()->syncWithPivotValues($data['classeId'], [
            "coefficient" => $data['coefficient']
        ]);

        Cache::forget('enseignement:all');

        return $coefficientModifie;
    }
}
