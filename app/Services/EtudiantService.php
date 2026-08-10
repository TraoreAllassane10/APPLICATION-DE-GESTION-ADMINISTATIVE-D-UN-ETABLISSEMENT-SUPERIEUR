<?php

namespace App\Services;

use App\Http\Resources\EtudiantRessource;
use App\Models\Etudiant;
use App\Repositories\EtudiantRepository;
use Barryvdh\DomPDF\Facade\Pdf;
use GuzzleHttp\Psr7\UploadedFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class EtudiantService
{

    public function __construct(
        protected EtudiantRepository $etudiantRepository
    ) {}

    public function all(Request $request)
    {
        return EtudiantRessource::collection($this->etudiantRepository->all($request));
    }

    public function find(string $etudiant)
    {
        return $this->etudiantRepository->find($etudiant);
    }

    public function findByIp(string $ip)
    {
        return $this->etudiantRepository->findByIp($ip);
    }

    public function create(array $data)
    {
        if (isset($data['photo'])) {
            $data['photo'] = $data['photo']->store('etudiants', 'public');
        }

        return $this->etudiantRepository->create($data);
    }

    public function update(Etudiant $etudiant, array $data)
    {
        $anciennePhoto = $etudiant->photo;

        if (isset($data['photo'])) {
            $nouvellePhoto = $data['photo']->store(
                'etudiants',
                'public'
            );

            $data['photo'] = $nouvellePhoto;
        } else {
            unset($data['photo']);
        }

        $etudiant = $this->etudiantRepository->update($etudiant, $data);

        // Supprimer seulement après la mise à jour réussie
        if (
            isset($data['photo']) &&
            $anciennePhoto
        ) {
            Storage::disk('public')->delete($anciennePhoto);
        }

        return $etudiant;
    }

    public function delete(Etudiant $etudiant)
    {
        return $this->etudiantRepository->delete($etudiant);
    }

    public function ficheIdentification(string $etudiant)
    {
        $etudiantData = Etudiant::where("ip", $etudiant)->first()->toArray();
        $pdf = Pdf::loadView("pdf.fiche_etudiant", [
            "etudiant" => $etudiantData
        ]);

        return $pdf->stream("fiche_identification.pdf");
    }

    public function getCertificatDeScolarite(string $etudiant)
    {
        $etudiantData = Etudiant::with('inscriptions')->where("ip", $etudiant)->first()->toArray();

        $pdf = Pdf::loadView("pdf.certificat_scolarite", [
            "etudiant" => $etudiantData
        ]);

        return $pdf->stream('certificat_scolarite.pdf');
    }

    public function totalEtudiant()
    {
        return $this->etudiantRepository->totalEtudiant();
    }

    public function totalEtudiantParStatut(string $statut)
    {
        return $this->etudiantRepository->totalEtudiantParStatut($statut);
    }
}
