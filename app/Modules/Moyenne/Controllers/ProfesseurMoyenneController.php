<?php

namespace App\Modules\Moyenne\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Moyenne\Services\MoyenneService;
use App\Modules\PeriodeAcademique\Services\PeriodeAcademiqueService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfesseurMoyenneController extends Controller
{
    public function __construct(
        protected PeriodeAcademiqueService $periodeAcademiqueService,
        protected MoyenneService $moyenneService
    ) {}
    public function index(Request $request)
    {
        $user = Auth::user();

        $niveaux = $user->professeur
            ->enseignements()
            ->with("niveaux.enseignements", "niveaux.inscriptions")
            ->get()
            ->pluck("niveaux")
            ->flatten()
            ->unique('id')
            ->values();

        $periodes = $this->periodeAcademiqueService->all();

        return Inertia::render('EspaceProfesseur/moyenne/Index', [
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
