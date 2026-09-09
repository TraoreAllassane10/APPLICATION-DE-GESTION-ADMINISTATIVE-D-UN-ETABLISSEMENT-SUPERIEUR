<?php

namespace App\Modules\Bulletin\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Niveau;
use App\Models\PeriodeAcademique;
use App\Modules\Bulletin\Services\BulletinService;
use App\Modules\Bulletin\Services\BulletinZipService;
use App\Modules\PeriodeAcademique\Services\PeriodeAcademiqueService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;


class BulletinController extends Controller
{
    public function __construct(
        protected BulletinService $bulletinService,
        protected PeriodeAcademiqueService $periodeAcademiqueService,
        protected BulletinZipService $bulletinZipService
    ) {}

    public function index()
    {
        $niveaux = Niveau::latest()->get();
        $periodes = $this->periodeAcademiqueService->all();

        return Inertia::render("bulletin/Index", [
            "niveaux" => $niveaux,
            "periodes" => $periodes
        ]);
    }

    public function getBulletins(Request $request)
    {
        $classeId = $request->query('classeId') ?? null;
        $periodeId = $request->query('periodeId') ?? null;

        $data = $this->bulletinService->getBulletins($classeId, $periodeId);

        return response()->json(["sucess" => true, "data" => $data]);
    }

    public function telechargerBulletin(string $bulletin)
    {
        return $this->bulletinService->telechargerBulletinPdf($bulletin);
    }

    public function telechargerZip(Niveau $classe, PeriodeAcademique $periode)
    {
        set_time_limit(300);

        // Retournera 'zips/bulletin_IDA 2_Semestre 1_1788875387.zip'
        $cheminRelativeZip = $this->bulletinZipService->GenererZipBulletinDuneClasse($classe, $periode);

        // Convertit en 'C:\laragon\www\GESTION-EMPLOI-TEMPS\storage\app/public\zips\bulletin_...'
        $cheminAbsoluZip = Storage::disk('public')->path($cheminRelativeZip);

        return response()->download($cheminAbsoluZip)->deleteFileAfterSend(true);
    }
}
