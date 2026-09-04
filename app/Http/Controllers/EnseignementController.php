<?php

namespace App\Http\Controllers;

use App\Models\Niveau;
use App\Services\Pedagogie\EnseignementService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EnseignementController extends Controller
{
    public function __construct(
        protected EnseignementService $enseignementService
    ) {}
    public function findEnseignement(string $enseignement)
    {
        $enseignement = $this->enseignementService->getEnseignement($enseignement);
        $niveaux = Niveau::latest()->get();

        return response()->json([
            "success" => true,
            "data" => [
                "enseignement" => $enseignement,
                "niveaux" => $niveaux
            ]
        ]);
    }

    public function store(Request $request)
    {
        try {
            $data = $request->validate([
                "cours" => "required",
                "professeurId" => "required"
            ]);

            $this->enseignementService->createEnseignement($data["cours"], $data['professeurId']);

            return response()->json([
                "success" => true,
                "message" => "Attribution de cours réussie"
            ]);
        } catch (Exception $e) {
            Log::info("Erreur survenue lors de l'attribution de cours", ["erreur" => $e]);
            return response()->json([
                "success" => false,
                "message" => $e->getMessage()
            ]);
        }
    }

    public function update(Request $request, string $enseignement)
    {
        $data = $request->validate([
            'classes' => 'required|array'
        ]);

        $enseignement = $this->enseignementService->updateEnseignement($enseignement, $data);

        return response()->json([
            "success" => true,
            "data" => $enseignement
        ]);
    }

    public function destroy(string $enseignement)
    {
        try {

            $this->enseignementService->deleteEnseignement($enseignement);
            return response()->json([
                "success" => true,
            ]);
        } catch (Exception $e) {
            Log::error('Erreur survenue lors de la suppression d\'un enseignement', ["erreur" => $e->getMessage()]);
            return response()->json([
                "success" => false,
                "message" => "Erreur survenue lors de la suppression d'un enseignement"
            ]);
        }
    }

    public function updateCoefficentInClasse(Request $request, string $enseignement)
    {
        try {
            $data = $request->validate(["classeId" => ['required'], "coefficient" => ["required"]]);

            $this->enseignementService->updateCoefficentInClasse($enseignement, $data);

            return response()->json(["success" => true]);
        } catch (Exception $e) {
            Log::error('Erreur survenue lors de la mise à jour d\'un coefficient', ["erreur" => $e->getMessage()]);
        }
    }
}
