<?php

namespace App\Modules\Bulletin\Services;

use App\Modules\Bulletin\Repositories\BulletinRepository;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;

class BulletinPdfService
{
    public function __construct(
        protected BulletinRepository $bulletinRepository
    ) {}
    public function getOrGeneratePdf(int $inscriptionId, int $periodeId)
    {
        $bulletin = $this->bulletinRepository->find($inscriptionId, $periodeId);

        // Si le bulletin existe et que les données n'ont pas changées
        if ($bulletin->pdf_path && !$bulletin->is_changed && Storage::exists($bulletin->pdf_path)) {
            return $bulletin->pdf_path;
        }

        // sinon, generation du PDF
        $pdf = Pdf::loadView("bulletin.bulletin", [
            "bulletin" => $bulletin
        ]);

        // Personnalisation du chemin de fichier
        $path = "bulletins/{$bulletin->periodeAcademique->libelle}-annee {$bulletin->periodeAcademique->annee_universitaire_id}/bulletin_{$bulletin->inscription_id}.pdf";
        Storage::put($path, $pdf->output());

        $bulletin->update([
            "is_changed" => false,
            "pdf_path" => $path
        ]);

        return $path;
    }
}
