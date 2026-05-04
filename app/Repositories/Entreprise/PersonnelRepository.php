<?php

namespace App\Repositories\Entreprise;

use App\Models\Entreprise\Personnel;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
            $formations = json_decode($data['formations'], true);

            if ($formations) {
                foreach ($formations as $formation) {
                    $personnel->formations()->create([
                        'annee' => $formation['annee'] ?? null,
                        'diplome' => $formation['diplome'] ?? null,
                        'ecole' => $formation['ecole'] ?? null
                    ]);
                }
            }

            // Enregistrement de ses experiences
            $experiences = json_decode($data['experiences'], true);

            if ($experiences) {
                foreach ($experiences as $experience) {
                    $personnel->experiences()->create([
                        'annee' => $experience['annee'] ?? null,
                        'nom_ecole' => $experience['nom_ecole'] ?? null,
                        'fonction' => $experience['fonction'] ?? null,
                        'nombre_annee_enseignement' => $experience['nombre_annee_enseignement'] ?? null,
                        'matiere_enseignee' => $experience['matiere'] ?? null
                    ]);
                }
            }

            // Enregistrement de ses documents
            if (! empty($data['files'])) {
                foreach ($data['files'] as $file) {
                    $path = $file->store('personnels/documents', 'public');

                    if ($path) {
                        $personnel->documents()->create([
                            'nom' => $file->getClientOriginalName(),
                            "chemin" => $path,
                            "personnel_id" => $personnel->id
                        ]);
                    }
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
                $formations = json_decode($data['formations'], true);
                // Parmi les formations qui viennent du front, il y des formations qui continent des ids, donc déjà ajouté
                // J'extraits leur id
                $idsEnvoyes = collect($formations)->pluck('id')->filter();

                // Supprime toutes les formations qui on été retirer du coté front 
                // Je me sers des ids 
                $personnel->formations()
                    ->whereNotIn('id', $idsEnvoyes)
                    ->delete();

                // Enregistrement ou mise à jour des formations
                foreach ($formations as $formation) {
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
                $experiences = json_decode($data['experiences'], true);
                // Parmi les experiences qui viennent du front, il y des experiences qui continent des ids, donc déjà ajouté
                // J'extraits leur id
                $idsEnvoyes = collect($experiences)->pluck('id')->filter();

                // Supprime toutes les experiences qui on été retirer du coté front 
                // Je me sers des ids 
                $personnel->experiences()
                    ->whereNotIn('id', $idsEnvoyes)
                    ->delete();

                // Enregistrement ou mise à jour des experiences
                foreach ($experiences as $experience) {
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

            // Mise à jour des documents
            DB::transaction(function () use ($personnel, $data) {
                $files = $data['files'] ?? [];

                if (! empty($data['files'])) {
                    foreach ($files as $file) {

                        $path = $file->store('personnels/documents', 'public');

                        $personnel->documents()->create(
                            [
                                'nom' => $file->getClientOriginalName(),
                                "chemin" => $path,
                                "personnel_id" => $personnel->id
                            ]
                        );
                    }
                }
            });

            Log::info('les documents', ["data" => empty($data['files']) ? 'Aucun fichier envoyé' : $data['files']]);
        }

        return $personnelModifie;
    }

    public function delete(Personnel $personnel)
    {
        return $personnel->delete();
    }
}
