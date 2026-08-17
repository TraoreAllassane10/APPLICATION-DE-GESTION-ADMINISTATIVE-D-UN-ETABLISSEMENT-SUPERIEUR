<?php

namespace App\Services\Pedagogie;

use App\Models\Enseignement;

class EnseignementService
{
    public function getEnseignement(string $id)
    {
        return Enseignement::where("id", $id)->first();
    }

    public function update(string $id, array $data)
    {
        $enseignement = Enseignement::find($id);
        return $enseignement->niveaux()->sync($data['classes']);
    }
}
