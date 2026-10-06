<?php

namespace App\Modules\Enseignement\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Niveau;
use App\Modules\Cours\Services\CoursService;
use App\Modules\Enseignement\Services\EnseignementService;
use App\Modules\Niveau\Services\NiveauService;
use App\Modules\Professeur\Services\ProfesseurService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class EnseignementController extends Controller
{
    public function __construct(
        protected EnseignementService $enseignementService,
        protected ProfesseurService $professeurService,
        protected CoursService $coursService,
        protected NiveauService $niveauService
    ) {}

    public function index(Request $request)
    {
        $professeurQuery = $request->query('professeur') ?? '';
        $coursQuery = $request->query('cours') ?? '';
        $niveauQuery = $request->query('niveau') ?? '';

        $professeurs = $this->professeurService->getAllProfesseurs();
        $cours = $this->coursService->getAllCours();
        $niveaux = $this->niveauService->getAllNiveaux();
        $enseignements = $this->enseignementService->getEnseignementPaginate($professeurQuery, $coursQuery, $niveauQuery);

        return Inertia::render('enseignement/Index', [
            'professeurs' => $professeurs,
            'cours' => $cours,
            'niveaux' => $niveaux,
            'enseignements' => $enseignements
        ]);
    }

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
        try {
            if ($request->has('classes')) {
                $data = $request->validate([
                    'classes' => 'present|array',
                    'classes.*.niveauId' => 'required|exists:niveaux,id',
                    'classes.*.coefficient' => 'required|numeric|min:0.1'
                ]);
                $this->enseignementService->updateEnseignement($enseignement, $data['classes']);
            } else {
                $data = $request->validate([
                    'niveau' => 'required|numeric',
                    'coefficient' => 'required|numeric'
                ]);
                $this->enseignementService->updateEnseignement($enseignement, [
                    ['niveauId' => (int) $data['niveau'], 'coefficient' => (float) $data['coefficient']]
                ]);
            }

            return response()->json([
                "success" => true,
                "message" => "Classes et coefficients mis à jour avec succès"
            ]);
        } catch (Exception $e) {
            Log::error("Erreur survenue lors de la mise à jour d'un enseignement", ["erreur" => $e->getMessage()]);
            return response()->json([
                "success" => false,
                "message" => "Erreur survenue lors de la mise à jour : " . $e->getMessage()
            ], 422);
        }
    }

    public function destroy(string $enseignement)
    {
        try {
            $this->enseignementService->deleteEnseignement($enseignement);
            return response()->json([
                "success" => true,
                "message" => "Enseignement supprimé avec succès"
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
