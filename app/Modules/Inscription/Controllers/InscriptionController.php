<?php

namespace App\Modules\Inscription\Controllers;

use App\Http\Controllers\Controller;
use App\Models\AnneeUniversitaire;
use App\Models\Etudiant;
use App\Models\Inscription;
use App\Modules\AnneeAcademique\Services\AnneeAcademiqueService;
use App\Modules\Inscription\Requests\CreateInscriptionRequest;
use App\Modules\Inscription\services\InscriptionService;
use App\Modules\Niveau\Services\NiveauService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;


class InscriptionController extends Controller
{
    public function __construct(
        protected InscriptionService $inscriptionService,
        protected AnneeAcademiqueService $anneeAcademiqueService,
        protected NiveauService $niveauService
    ) {}

    public function index(Request $request)
    {
        try {
            $response = $this->inscriptionService->all($request);

            return Inertia::render('inscription/Index', [
                "niveaux" => $response['niveaux'],
                "inscriptions" => $response['inscriptions'],
                "stats" => $response['stats'],
                'filters' => $request->only(['search', 'genre', 'statut'])
            ]);
        } catch (Exception $e) {
            Log::error('Erreur lors de la generation de la vue d\'affichage des inscrits', ["erreur" => $e->getMessage()]);
        }
    }

    public function create()
    {
        try {
            $anneeActive = $this->anneeAcademiqueService->getAnneeActive();

            // Recupere les etudiants qui ne sont pas incrire durant l'annee universitaire active
            $etudiants = Etudiant::whereDoesntHave("inscriptions", function ($query) use ($anneeActive) {
                return $query->where("annee_universitaire_id", $anneeActive->id);
            })->get();

            $niveaux = $this->niveauService->getAllNiveaux();

            // La recuperation de l'annee active MAIS en collection
            $user = Auth::user();
            $annees = AnneeUniversitaire::where("id", $user->annee_active)->get();

            return Inertia::render('inscription/Create', [
                "etudiants" => $etudiants,
                "niveaux" => $niveaux,
                "annees" => $annees
            ]);
        } catch (Exception $e) {
            Log::error('Erreur lors de la recuperation du formulaire de creation d\'inscription', ["erreur" => $e->getMessage()]);
        }
    }

    public function store(CreateInscriptionRequest $request)
    {

        try {
            $data = $request->validated();

            // Creation d'une inscription
            return $this->inscriptionService->create($data);
        } catch (Exception $e) {
            Log::error('Erreur lors de la suppression d\'une année', ["erreur" => $e->getMessage()]);
            return response()->json(["success" => false, "message" => "Erreur lors de la suppression d\'une année"]);
        }
    }

    public function show(string $inscription)
    {
        $inscriptionData = $this->inscriptionService->find($inscription);

        return Inertia::render('inscription/Show', [
            "inscription" => $inscriptionData
        ]);
    }

    public function delete(Inscription $inscription)
    {
        try {
            $this->inscriptionService->delete($inscription);

            return response()->json([
                "success" => true,
                "message" => "Inscription supprimée avec succès"
            ]);
        } catch (Exception $e) {
            Log::error('Erreur lors de la suppression d\'une inscription', ["erreur" => $e->getMessage()]);

            return response()->json([
                "success" => false,
                "message" => "Erreur survenue au niveau du serveur"
            ]);
        }
    }
}
