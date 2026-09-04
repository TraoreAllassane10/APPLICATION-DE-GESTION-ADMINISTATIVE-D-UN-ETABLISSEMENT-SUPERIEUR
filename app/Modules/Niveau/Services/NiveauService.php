<?php

namespace App\Modules\Niveau\Services;

use App\Models\Niveau;
use App\Modules\AnneeAcademique\Services\AnneeAcademiqueService;
use App\Modules\Niveau\Repositories\NiveauRepository;
use Barryvdh\DomPDF\Facade\Pdf;

class NiveauService
{
 
    public function __construct(
        protected NiveauRepository $niveauRepository,
        protected AnneeAcademiqueService $anneeAcademiqueService
    ){}

    public function getAllNiveaux() {
        return $this->niveauRepository->all();
    }

    public function getNiveau(string $niveauId) {
        return $this->niveauRepository->find($niveauId);
    }

    public function createNiveau(array $data) {
        return $this->niveauRepository->create($data);
    }

     public function updateNiveau(Niveau $niveau ,array $data) {
        return $this->niveauRepository->update($niveau, $data);
    }

    public function deleteNiveau(Niveau $niveau) {
        return $this->niveauRepository->delete($niveau);
    }

    public function getListeDeClasse(string $niveauId) {

        $anneeActive = $this->anneeAcademiqueService->getAnneeActive();

        return $this->niveauRepository->ListeDeClasse($anneeActive->id, $niveauId);
    }

    public function getListeDeClasseEnPdf(string $niveauId) {

        $anneeActive = $this->anneeAcademiqueService->getAnneeActive();

        $niveau = $this->getNiveau($niveauId);

        $listeDesEtudiants = $this->getListeDeClasse($niveauId);

        $pdf = Pdf::loadView('pdf.liste_classe', [
            "liste" => $listeDesEtudiants,
            "annee_academique" => $anneeActive->libelle,
            "filiere" => $niveau->nom
        ]);

        return $pdf->stream("liste_de_classe_{$niveau->nom}.pdf");
    }
}
