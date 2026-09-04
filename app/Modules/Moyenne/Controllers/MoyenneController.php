<?php

namespace App\Modules\Moyenne\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Niveau;
use App\Modules\Moyenne\Services\MoyenneService;
use App\Modules\PeriodeAcademique\Services\PeriodeAcademiqueService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MoyenneController extends Controller
{
    public function __construct(
        protected PeriodeAcademiqueService $periodeAcademiqueService,
        protected MoyenneService $moyenneService
    ) {}
    public function index()
    {
        $niveaux = Niveau::with(['enseignements', 'inscriptions'])->latest()->get();
        $periodes = $this->periodeAcademiqueService->all();

        return Inertia::render('moyenne/Index', [
            "niveaux" => $niveaux,
            "periodes" => $periodes
        ]);
    }

    public function getMoyennes(Request $request)
    {
        $classeId = $request->query('classeId') ?? null;
        $enseignementId = $request->query('enseignementId') ?? null;
        $periodeId = $request->query('periodeId') ?? null;

        $data = $this->moyenneService->getMoyennes($classeId, $enseignementId, $periodeId);

        return response()->json([
            "success" => true,
            "coefficient" => $data['coefficient'],
            "data" => $data['data']
        ]);
    }
}
