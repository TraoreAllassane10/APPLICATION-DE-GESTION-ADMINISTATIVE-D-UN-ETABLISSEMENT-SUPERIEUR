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

    public function getEnseignementPaginate(string $professeurQuery, string $coursQuery, string $niveauQuery)
    {
        $enseignements = Enseignement::query();

        $enseignements->when($professeurQuery, function ($q) use ($professeurQuery) {
            if ($professeurQuery !== "") {
                $q->where("professeur_id", $professeurQuery);
            }
        });

        $enseignements->when($coursQuery, function ($q) use ( $coursQuery) {
            if ($coursQuery !== "") {
                $q->where("cours_id", $coursQuery);
            }
        });

         $enseignements->when($niveauQuery, function ($q) use ( $niveauQuery) {
            if ($niveauQuery !== "") {
                $q->whereHas('niveaux', function($q) use ($niveauQuery) {
                    $q->where('niveau_id', $niveauQuery);
                });
            }
        });

         return $enseignements->latest()->paginate(20);
    }

    public function getEnseignement(string $id)
    {
        return Enseignement::where("id", $id)->first();
    }

    public function getEnseignementByProfesseurId(string $professeurId)
    {
        return Enseignement::where('professeur_id', $professeurId)->get();
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
        $enseignement = Enseignement::findOrFail($id);

        $syncData = [];
        foreach ($data as $item) {
            $niveauId = $item['niveauId'] ?? $item['niveau_id'] ?? null;
            $coeff = $item['coefficient'] ?? 1;
            if ($niveauId) {
                $syncData[$niveauId] = [
                    'coefficient' => $coeff
                ];
            }
        }

        $enseignementModifie = $enseignement->niveaux()->sync($syncData);

        Cache::forget('enseignement:all');

        return $enseignementModifie;
    }

    public function deleteEnseignement(string $id)
    {
        $enseignement = Enseignement::findOrFail($id);
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
