<?php

namespace App\Modules\AnneeAcademique\Services;

use App\Models\AnneeUniversitaire;
use App\Modules\AnneeAcademique\Repositories\AnneeAcademiqueRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class AnneeAcademiqueService
{

    public function __construct(
        protected AnneeAcademiqueRepository $anneeAcademiqueRepository
    ) {}

    public function all()
    {
        $annees_academiques = Cache::remember("annees_academiques:all", 3600, function () {
            return $this->anneeAcademiqueRepository->all();
        });

        return $annees_academiques;
    }

    public function find(string $id)
    {
        return AnneeUniversitaire::find($id);
    }

    public function create(array $data)
    {
        //Creation d'une année scolaire
        $annee = $this->anneeAcademiqueRepository->create($data);

        Cache::forget('annees_academiques:all');

        return $annee;
    }

    public function update(AnneeUniversitaire $annee, array $data)
    {
        $annee = $this->anneeAcademiqueRepository->update($annee, $data);
        
        Cache::forget('annees_academiques:all');

        return $annee;
    }

    public function delete(AnneeUniversitaire $annee)
    {
        $annee = $this->anneeAcademiqueRepository->delete($annee);

        Cache::forget('annees_academiques:all');

        return $annee;
    }

    // Recupere l'annee active
    public function getAnneeActive()
    {
        $anneeActive = Cache::remember("annee_active", 3600, function() {
            return $this->anneeAcademiqueRepository->anneeActive();
        });

        return $anneeActive;
    }

    public function editAnneeActive()
    {
        $user = Auth::user();
        $anneeActive = AnneeUniversitaire::where("id", $user->annee_active)->first();
        $touteLesAnnees = AnneeUniversitaire::orderByDesc("date_fin")->get();

        return [$anneeActive, $touteLesAnnees];
    }

    // Change d'année
    public function changeAnneeActive(string $id)
    {

        $user = Auth::user();

        $annee = AnneeUniversitaire::find($id);

        $user->update([
            "annee_active" => $annee->id
        ]);

        Cache::forget('annee_active');
    }
}
