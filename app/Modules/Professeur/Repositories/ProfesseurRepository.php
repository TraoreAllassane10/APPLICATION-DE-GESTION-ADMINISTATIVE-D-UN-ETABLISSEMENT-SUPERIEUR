<?php

namespace App\Modules\Professeur\Repositories;

use App\Enums\RoleUser;
use App\Models\Professeur;
use App\Models\User;
use App\Modules\AnneeAcademique\Repositories\AnneeAcademiqueRepository;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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

    public function findByUserId(string $userId)
    {
        return Professeur::where("user_id", $userId)
            ->first();
    }

    public function create(array $data)
    {
        // Option 1 : Nouvel enseignant
        // Option 2 : Enseignant existant

        return DB::transaction(function () use ($data) {

            if ($data['option'] === 2) {
                $professeur = Professeur::where('matricule', $data['matricule'])
                    ->where('nom_prenom', $data['nom_prenom'])
                    ->where('date_naissance', $data['date_naissance'])
                    ->firstOrFail();

                $this->EnregistrerInformationDeLaFonction($professeur, $data);
            } else {
                $professeur = Professeur::create($data);

                $this->EnregistrerInformationDeLaFonction($professeur, $data);
            }

            $user = User::create([
                'name' => $professeur->nom_prenom,
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);

            $user->assignRole(RoleUser::PROFESSEUR->value);

            $professeur->update([
                'user_id' => $user->id,
            ]);

            return $professeur;
        });
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
    public function EnregistrerInformationDeLaFonction($professeur, array $data)
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
