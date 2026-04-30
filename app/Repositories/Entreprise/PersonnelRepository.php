<?php

namespace App\Repositories\Entreprise;

use App\Models\Entreprise\Personnel;
use Illuminate\Support\Facades\DB;

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

    public function update(Personnel $personnel, array $data)
    {
        $personnelModifie = $personnel->update($data);

        if ($personnelModifie) {
            // Mise à jour des formations
            DB::transaction(function () use ($personnel, $data) {
                // Parmi les formations qui viennent du front, il y des formations qui continent des ids, donc déjà ajouté
                // J'extraits leur id
                $idsEnvoyes = collect($data['formations'])->pluck('id')->filter();

                // Supprime toutes les formations qui on été retirer du coté front 
                // Je me sers des ids 
                $personnel->formations()
                    ->whereNotIn('id', $idsEnvoyes)
                    ->delete();

                // Enregistrement ou mise à jour des formations
                foreach ($data['formations'] as $formation) {
                    $personnel->formations()->updateOrCreate([
                        'id' => $formation['id'] ?? null
                    ], [
                        'annee' => $formation['annee'] ?? null,
                        'diplome' => $formation['diplome'] ?? null,
                        'ecole' => $formation['ecole'] ?? null
                    ]);
                }
            });



            // Mise à jour des expériences
            DB::transaction(function () use ($personnel, $data) {
                // Parmi les experiences qui viennent du front, il y des experiences qui continent des ids, donc déjà ajouté
                // J'extraits leur id
                $idsEnvoyes = collect($data['experiences'])->pluck('id')->filter();

                // Supprime toutes les experiences qui on été retirer du coté front 
                // Je me sers des ids 
                $personnel->experiences()
                    ->whereNotIn('id', $idsEnvoyes)
                    ->delete();

                // Enregistrement ou mise à jour des experiences
                foreach ($data['experiences'] as $experience) {
                    $personnel->experiences()->updateOrCreate(
                        ['id' => $experience['id'] ?? null],
                        [
                            'annee' => $experience['annee'] ?? null,
                            'nom_ecole' => $experience['nom_ecole'] ?? null,
                            'fonction' => $experience['fonction'] ?? null,
                            'nombre_annee_enseignement' => $experience['nombre_annee_enseignement'] ?? null,
                            'matiere_enseignee' => $experience['matiere'] ?? null
                        ]
                    );
                }
            });
        }

        return $personnelModifie;
    }

    public function delete(Personnel $personnel)
    {
        return $personnel->delete();
    }
}
