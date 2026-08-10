<?php

namespace App\Http\Controllers;

use App\Enums\StatutEtudiant;
use App\Http\Requests\etudiant\CreateEtudiantRequest;
use App\Http\Requests\etudiant\UpdateEtudiantRequest;
use Exception;
use Inertia\Inertia;
use App\Models\Etudiant;
use App\Services\EtudiantService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EtudiantController extends Controller
{
    public function __construct(
        protected EtudiantService $etudiantService
    ) {}

    public function index(Request $request)
    {
        try {
            $etudiants = $this->etudiantService->all($request);

            $total = Etudiant::count();
            $affecte = $this->etudiantService->totalEtudiantParStatut(StatutEtudiant::AFFECTE->value);
            $naff = $this->etudiantService->totalEtudiantParStatut(StatutEtudiant::NAFF->value);
            $reaffecte = $this->etudiantService->totalEtudiantParStatut(StatutEtudiant::REAFFECTE->value);
            $transfert = $this->etudiantService->totalEtudiantParStatut(StatutEtudiant::TRANSFERT->value);

            return Inertia::render("etudiant/Index", [
                "etudiants" => $etudiants,
                "stats" => [
                    "total" => $total,
                    "affecte" => $affecte,
                    "naff" => $naff,
                    "reaffecte" => $reaffecte,
                    "transfert" => $transfert
                ],
                'filters' => $request->only(['search', 'genre', 'statut'])
            ]);
        } catch (Exception $e) {
            Log::error("Erreur lors de l'affichage des etudiants", ["erreur" => $e->getMessage()]);
            return response()->json(["success" => false, "message" => "Erreur lors de la mise à jour d'une scolarité"]);
        }
    }

    public function show(Etudiant $etudiant)
    {
        return Inertia::render("etudiant/Show", [
            "etudiant" => $etudiant->load('inscriptions')
        ]);
    }

    public function create()
    {
        return Inertia::render("etudiant/Create");
    }

    public function store(CreateEtudiantRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            //Creation d'un etudiant
            $this->etudiantService->create($data);
  
            return response()->json(["success" => true]);
        } catch (Exception $e) {
            Log::error("Erreur lors de la création d'un etudiant", ["erreur" => $e->getMessage()]);
            return response()->json(["success" => false, "message" => "Erreur lors de la création d'un etudiant"]);
        }
    }

    public function edit(Etudiant $etudiant)
    {

        return Inertia::render("etudiant/Edit", [
            "etudiant" => $etudiant
        ]);
    }

    public function update(UpdateEtudiantRequest $request, string $etudiant)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            // Recuperation de l'etudiant à modifier
            $etudiant = $this->etudiantService->find($etudiant);

            // Modification de l'etudiant
            $this->etudiantService->update($etudiant, $data);

            return response()->json(["success" => true]);
        } catch (Exception $e) {
            Log::error("Erreur lors de la mise à jour d'un etudiant", ["erreur" => $e->getMessage()]);
            return response()->json(["success" => false, "message" => "Erreur lors de la mise à jour d'un etudiant"]);
        }
    }

    public function delete(Etudiant $etudiant)
    {
        try {
            //Suppression d'une filiere
            $this->etudiantService->delete($etudiant);

            return response()->json(["success" => true]);
        } catch (Exception $e) {
            Log::error("Erreur lors de la suppression d'un etudiant", ["erreur" => $e->getMessage()]);
            return response()->json(["success" => false, "message" => "Erreur lors de la suppression d'un etudiant"]);
        }
    }

    public function getFicheIndentification(string $etudiant)
    {
        try {
            return $this->etudiantService->ficheIdentification($etudiant);
        } catch (Exception $e) {
            Log::error("Erreur lors de la recuperation de la fiche d'indentification", ["erreur" => $e->getMessage()]);
            return response()->json(["success" => false, "message" => "Erreur lors de la recuperation de la fiche d'indentification"]);
        }
    }

    public function certificatDeScolarite(string $etudiant)
    {
        try {
            return $this->etudiantService->getCertificatDeScolarite($etudiant);
        } catch (Exception $e) {
            Log::error("Erreur lors de la génération du certificat de scolairé", ["erreur" => $e->getMessage()]);
            return response()->json(["success" => false, "message" => "Erreur lors de la génération du certificat de scolairé"]);
        }
    }
}
