<?php

namespace App\Modules\Bulletin\Services;

use App\Models\Niveau;
use App\Models\PeriodeAcademique;
use Illuminate\Support\Facades\Storage;
use ZipArchive;

class BulletinZipService
{
    public function __construct(
        protected BulletinPdfService $bulletinPdfService
    ) {}

    public function GenererZipBulletinDuneClasse(Niveau $niveau, PeriodeAcademique $periode)
    {
        $zip = new ZipArchive();

        // Nom et chemin du dossier cible
        $zipName = "bulletin_{$niveau->nom}_{$periode->libelle}_" . time() . ".zip";
        $zipDirectory = Storage::disk('public')->path('zips');

        // S'assurer que le dossier de destination existe
        if (!file_exists($zipDirectory)) {
            mkdir($zipDirectory, 0755, true);
        }

        $cheminZip = $zipDirectory . "/" . $zipName;

        // CORRECTION 1 : Utilisation du OU binaire "|" au lieu de "||"
        if ($zip->open($cheminZip, ZipArchive::CREATE | ZipArchive::OVERWRITE) === true) {

            $inscriptions = $niveau->inscriptions()->get();

            foreach ($inscriptions as $inscrit) {
                $cheminRelativePdf = $this->bulletinPdfService->getOrGeneratePdf($inscrit->id, $periode->id);
                $cheminCompletPdf = Storage::path($cheminRelativePdf);

                $nomFichierDansZip = sprintf(
                    "Bulletin_%s_%s.pdf",
                    strtoupper($inscrit->etudiant->nom),
                    strtoupper($inscrit->etudiant->prenom)
                );

                if (file_exists($cheminCompletPdf)) {
                    $zip->addFile($cheminCompletPdf, $nomFichierDansZip);
                }
            }

            $zip->close();
        }

        // CORRECTION 2 : Retourner uniquement 'zips/...' sans le préfixe 'public/'
        return 'zips/' . $zipName;
    }
}