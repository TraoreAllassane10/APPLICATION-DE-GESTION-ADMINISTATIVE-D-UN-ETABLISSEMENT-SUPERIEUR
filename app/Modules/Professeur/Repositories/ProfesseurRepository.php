<?php

namespace App\Modules\Professeur\Repositories;

use App\Models\Professeur;
use App\Modules\AnneeAcademique\Repositories\AnneeAcademiqueRepository;

class ProfesseurRepository
{
    public function __construct(
        protected AnneeAcademiqueRepository $anneeAcademiqueRepository
    ) {}
    public function all()
    {
        $anneeActive = $this->anneeAcademiqueRepository->anneeActive();

        $professeurs = Professeur::whereHas("anneeAcademiques", function ($query) use ($anneeActive) {
            $query->where("annee_universitaire_id", $anneeActive->id);
        })->with(["anneeAcademiques" => function ($query) use ($anneeActive) {
            $query->where("annee_universitaire_id", $anneeActive->id);
        }])
        ->latest()->paginate(10);

        return $professeurs;
    }

    public function find(Professeur $professeur)
    {
        return $professeur->anneeAcademiques()->first();
    }

    public function create(array $data)
    {
        // Option 1 : Nouvel enseignant
        // Option 2 : Enseignant existant

        if ($data['option'] === 2) {
            // Recuperation de l'enseignement existant
            $professeur = Professeur::where("matricule", $data["matricule"])
                ->where('nom_prenom', $data['nom_prenom'])
                ->where('date_naissance', $data['date_naissance'])
                ->first();

            $this->informationDeLaFonction($professeur, $data);
        } else {
            // CReation d'un nouvel enseignant
            $professeur = Professeur::create($data);

            $this->informationDeLaFonction($professeur, $data);
        }

        return $professeur;
    }

    public function update(Professeur $professeur, array $data)
    {
        $anneeActive = $this->anneeAcademiqueRepository->anneeActive();

        $professeur->update($data);

        $professeur->anneeAcademiques()->updateExistingPivot($anneeActive->id, [
            "diplome" => $data['diplome'],
            "grade" => $data['grade'],
            "statut" => $data['statut'],
            "annee_prise_fonction" => $data['annee_prise_fonction'],
            "formation_continue" => $data['formation_continue'],
            "nombre_heure_cours_prevue" => $data['nombre_heure_cours_prevue'],
            "nombre_heure_cours_realise" => $data['nombre_heure_cours_realise'],
        ]);

        return $professeur;
    }

    public function delete(Professeur $professeur)
    {
        $anneeActive = $this->anneeAcademiqueRepository->anneeActive();

        // Supprimer les données de l'enseignant durant l'année active
        $professeur->anneeAcademiques()->detach($anneeActive->id);

        // Supprimmer l'enseignant s'il existe plus dans aucune des années
        if ($professeur->anneeAcademiques()->count() == 0) {
            $professeur->delete();
        }

        return $professeur;
    }

    public function professeurNonEnregistreDabord()
    {
        $anneeActive = $this->anneeAcademiqueRepository->anneeActive();

        $professeurs = Professeur::whereDoesntHave("anneeAcademiques", function ($query) use ($anneeActive) {
            $query->where("annee_universitaire_id", $anneeActive->id);
        })->latest()->get();

        return $professeurs;
    }

    public function informationDeLaFonction($professeur, array $data)
    {
        $anneeActive = $this->anneeAcademiqueRepository->anneeActive();

        $anneeActive->professeurs()->attach($professeur->id, [
            "diplome" => $data['diplome'],
            "grade" => $data['grade'],
            "statut" => $data['statut'],
            "annee_prise_fonction" => $data['annee_prise_fonction'],
            "formation_continue" => $data['formation_continue'],
            "nombre_heure_cours_prevue" => $data['nombre_heure_cours_prevue'],
            "nombre_heure_cours_realise" => $data['nombre_heure_cours_realise'],
        ]);
    }
}
