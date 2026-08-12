<?php

namespace App\Http\Controllers\Pedagogie;

use App\Http\Controllers\Controller;
use App\Http\Requests\Annee\CreateAnneeScolaireRequest;
use App\Http\Requests\Annee\UpdateAnneeScolaireRequest;
use App\Models\PeriodeAcademique;
use App\Services\PeriodeAcademiqueService;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PeriodeAcdemiqueController extends Controller
{
    public function __construct(
        protected PeriodeAcademiqueService $periodeAcademiqueService
    ) {}

    public function index()
    {
        try {
            $periodes = $this->periodeAcademiqueService->all();

            return Inertia::render('periodeAcademique/Index', [
                "periodes" => $periodes
            ]);
        } catch (Exception $e) {
            Log::error('Erreur lors la recuperation de la liste des periodes academiques', ["erreur" => $e->getMessage()]);
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function store(CreateAnneeScolaireRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $this->periodeAcademiqueService->create($data);

            return response()->json(["success" => true]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function edit(PeriodeAcademique $periode)
    {
        return Inertia::render("periodeAcademique/Edit", [
            // Pouvoir recuperer les dates sous format 'Y-m-d' pour mes inputs coté frontend
            "periode" => [
                "id" => $periode->id,
                "libelle" => $periode->libelle,
                "date_debut" => Carbon::parse($periode->date_debut)->format('Y-m-d'),
                "date_fin" => Carbon::parse($periode->date_fin)->format('Y-m-d'),
            ]
        ]);
    }

    public function update(UpdateAnneeScolaireRequest $request, PeriodeAcademique $periode)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $this->periodeAcademiqueService->update($periode, $data);

            return response()->json(["success" => true]);
        } catch (Exception $e) {
            Log::error('Erreur lors de la modification d\'une période académique', ["erreur" => $e->getMessage()]);
            return response()->json(["message" => $e->getMessage()]);
        }
    }

     public function delete(PeriodeAcademique $periode)
    {
        try {    
            $this->periodeAcademiqueService->delete($periode);

            return response()->json(["success" => true]);
        } catch (Exception $e) {
            Log::error('Erreur lors de la suppression d\'une période académique', ["erreur" => $e->getMessage()]);
            return response()->json(["message" => $e->getMessage()]);
        }
    }
}
