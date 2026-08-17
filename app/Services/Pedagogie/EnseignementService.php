<?php

namespace App\Services\Pedagogie;

use App\Models\Enseignement;
use App\Services\AnneeAcademiqueService;
use Exception;

class EnseignementService
{
    public function __construct(
        protected AnneeAcademiqueService $anneeAcademiqueService
    )
    {}

    public function getEnseignement(string $id)
    {
        return Enseignement::where("id", $id)->first();
    }

    public function createEnseignement(string $coursId, string $professeurId)
    {
        $anneeActive = $this->anneeAcademiqueService->getAnneeActive();

        $coursExiste = Enseignement::where("professeur_id", $professeurId)
                ->where('cours_id', $coursId)
                ->exists();
        
        if ($coursExiste){
            throw new Exception("Ce cours lui est déjà attribué !");
        }

        return Enseignement::create([
            "professeur_id" => $professeurId,
            "cours_id" => $coursId,
            "annee_universitaire_id" => $anneeActive->id
        ]);
    }

    public function updateEnseignement(string $id, array $data)
    {
        $enseignement = Enseignement::find($id);
        return $enseignement->niveaux()->sync($data['classes']);
    }

    public function deleteEnseignement(string $id)
    {
        $enseignement = Enseignement::find($id);
        return $enseignement->delete();
    }
}
