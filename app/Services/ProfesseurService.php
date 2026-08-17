<?php

namespace App\Services;

use App\Models\Enseignement;
use App\Models\Professeur;
use App\Repositories\ProfesseurRepository;
use Exception;
use Illuminate\Support\Facades\Log;

class ProfesseurService
{

    public function __construct(
        protected ProfesseurRepository $professeurRepository,
        protected AnneeAcademiqueService $anneeAcademiqueService
    ) {}

    public function getAllProfesseurs()
    {
        return $this->professeurRepository->all();
    }

    public function getAllProfesseur(Professeur $professeur)
    {
        return $this->professeurRepository->find($professeur);
    }

    public function getProfesseurNonEnregistreDabord()
    {
        return $this->professeurRepository->professeurNonEnregistreDabord();
    }

    public function createProfesseur(array $data)
    {
        try {
            $anneeActive = $this->anneeAcademiqueService->getAnneeActive();
            $professeur = $this->professeurRepository->create($data);

            if (!empty($data['cours_enseignes'])) {
                foreach ($data['cours_enseignes'] as $coursId) {
                    $professeur->enseignements()->create([
                        "cours_id" => $coursId,
                        "annee_universitaire_id" => $anneeActive->id
                    ]);
                }
            }

            return $professeur;
        } catch (Exception $e) {
            Log::info("Erreur survenue lors de la creation d'un professeur", ["erreur" => $e->getMessage()]);
        }
    }

    public function updateProfesseur(Professeur $professeur, array $data)
    {
        return $this->professeurRepository->update($professeur, $data);
    }

    public function deleteProfesseur(Professeur $professeur)
    {
        return $this->professeurRepository->delete($professeur);
    }

    public function attribuerClassesProfesseur(array $data)
    {

        $enseignement = Enseignement::find($data['enseignement']);

        if (!$enseignement) {
            throw new Exception('Erreur lors de la recuperation de l\'enseignement');
        }

        foreach ($data['classes'] as $classeId) {
            $enseignement->niveaux()->attach($classeId);
        }

        return $enseignement;
    }
}
