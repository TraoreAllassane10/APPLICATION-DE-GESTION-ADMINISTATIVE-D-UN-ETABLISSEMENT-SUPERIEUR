<?php

namespace App\Services;

use App\Models\AnneeUniversitaire;
use App\Repositories\AnneeAcademiqueRepository;
use Illuminate\Support\Facades\Auth;

class AnneeAcademiqueService
{

    public function __construct(
        protected AnneeAcademiqueRepository $anneeAcademiqueRepository
    ) {}

    public function all()
    {
        return $this->anneeAcademiqueRepository->all();
    }

    public function find(string $id)
    {
        return AnneeUniversitaire::find($id);
    }

    public function create(array $data)
    {
        //Creation d'une année scolaire
        return $this->anneeAcademiqueRepository->create($data);
    }

    public function update(AnneeUniversitaire $annee, array $data)
    {
        return  $this->anneeAcademiqueRepository->update($annee, $data);
    }

    public function delete(AnneeUniversitaire $annee)
    {
        return $this->anneeAcademiqueRepository->delete($annee);
    }

    // Recupere l'annee active
    public function getAnneeActive()
    {
        return $this->anneeAcademiqueRepository->anneeActive();
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

    }
}
