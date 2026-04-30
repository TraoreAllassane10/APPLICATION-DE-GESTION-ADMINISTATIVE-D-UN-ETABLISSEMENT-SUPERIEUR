<?php

namespace App\Repositories\Entreprise;

use App\Models\Entreprise\Personnel;

class PersonnelRepository
{
    public function all()
    {
        return Personnel::latest()->paginate(20);
    }

    public function find(Personnel $personnel)
    {
        return $personnel;
    }

    public function create(array $data)
    {
        $personnel = Personnel::create($data);

        if ($personnel) {
            // Enregistrement de ses formations
            if ($data['formations']) {
                foreach ($data['formations'] as $formation) {
                    $personnel->formations()->create([
                        'annee' => $formation['annee'] ?? null,
                        'diplome' => $formation['diplome'] ?? null,
                        'ecole' => $formation['ecole'] ?? null
                    ]);
                }
            }

            // Enregistrement de ses experiences
            if ($data['experiences']) {
                foreach ($data['experiences'] as $experience) {
                    $personnel->experiences()->create([
                        'annee' => $experience['annee'] ?? null,
                        'nom_ecole' => $experience['nom_ecole'] ?? null,
                        'fonction' => $experience['fonction'] ?? null,
                        'nombre_annee_enseignement' => $experience['nombre_annee_enseignement'] ?? null,
                        'matiere_enseignee' => $experience['matiere'] ?? null
                    ]);
                }
            }
        }

        return $personnel;
    }

    public function update(Personnel $personnel, array $data) {
        $personnelModifie = $personnel->update($data);

        if ($personnelModifie) {

        }
    }

    public function delete(Personnel $personnel) {
        return $personnel->delete();
    }
}
