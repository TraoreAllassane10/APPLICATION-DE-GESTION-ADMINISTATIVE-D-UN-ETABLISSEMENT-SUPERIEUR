<?php

namespace App\Modules\Niveau\Services;

use App\Models\Niveau;
use App\Modules\AnneeAcademique\Services\AnneeAcademiqueService;
use App\Modules\Niveau\Repositories\NiveauRepository;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Cache;

class NiveauService
{

    public function __construct(
        protected NiveauRepository $niveauRepository,
        protected AnneeAcademiqueService $anneeAcademiqueService
    ) {}

    public function getAllNiveaux()
    {
        $niveaux = Cache::remember(
            "niveau:all",
            3600,
            function () {
                return $this->niveauRepository->all();
            }
        );

        return $niveaux;
    }

    public function getNiveau(string $niveauId)
    {
        return $this->niveauRepository->find($niveauId);
    }

    public function createNiveau(array $data)
    {
        $niveau = $this->niveauRepository->create($data);

        Cache::forget('niveau:all');

        return $niveau;
    }

    public function updateNiveau(Niveau $niveau, array $data)
    {
        $niveauModifie = $this->niveauRepository->update($niveau, $data);

        Cache::forget('niveau:all');

        return $niveauModifie;
    }

    public function deleteNiveau(Niveau $niveau)
    {
        $niveauSupprime = $this->niveauRepository->delete($niveau);

        Cache::forget('niveau:all');

        return $niveauSupprime;
    }

    public function getListeDeClasse(string $niveauId)
    {

        $anneeActive = $this->anneeAcademiqueService->getAnneeActive();

        return $this->niveauRepository->ListeDeClasse($anneeActive->id, $niveauId);
    }

    public function getListeDeClasseEnPdf(string $niveauId)
    {

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
