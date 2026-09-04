<?php

namespace App\Modules\Bulletin\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Niveau;
use App\Modules\Bulletin\Services\BulletinService;
use App\Modules\PeriodeAcademique\Services\PeriodeAcademiqueService;
use Illuminate\Http\Request;
use Inertia\Inertia;


class BulletinController extends Controller
{
    public function __construct(
        protected BulletinService $bulletinService,
        protected PeriodeAcademiqueService $periodeAcademiqueService,
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

    public function telechargerBulletin(string $bulletin) {
        return $this->bulletinService->telechargerBulletinPdf($bulletin);
    }
}
