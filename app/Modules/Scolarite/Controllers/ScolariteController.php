<?php

namespace App\Modules\Scolarite\Controllers;


use App\Http\Controllers\Controller;
use App\Models\Scolarite;
use App\Modules\AnneeAcademique\Services\AnneeAcademiqueService;
use App\Modules\Niveau\Services\NiveauService;
use App\Modules\Scolarite\Enums\ScolariteType;
use App\Modules\Scolarite\Requests\CreateScolariteRequest;
use App\Modules\Scolarite\Requests\UpdateScolariteRequest;
use App\Modules\Scolarite\Services\ScolariteService;
use Exception;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ScolariteController extends Controller
{
    public function __construct(
        protected ScolariteService $scolariteService,
        protected AnneeAcademiqueService $anneeAcademiqueService,
        protected NiveauService $niveauService
    ) {}

    public function index()
    {
        try {
            $niveaux = $this->niveauService->getAllNiveaux();

            $annee = $this->anneeAcademiqueService->getAnneeActive();

            // Recupere les scolarite de l'annee active (Voir repository)
            $scolarites = $this->scolariteService->getAllScolarites();

            return Inertia::render("scolarite/Index", [
                "scolarites" => $scolarites,
                "niveaux" => $niveaux,
                "annee" => $annee,
                "types" => ScolariteType::cases()
            ]);
        } catch (Exception $e) {
            Log::error("Erreur lors l'afficahge de la vue de scolarite", ["erreur" => $e->getMessage()]);
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function store(CreateScolariteRequest $request)
    {
        try {
            $data = $request->validated();

            return $this->scolariteService->createScolarite($data);
        } catch (Exception $e) {
            Log::error("Erreur lors la création d'une scolarité", ["erreur" => $e->getMessage()]);
            return response()->json(["success" => false, "message" => "Erreur lors la création d'une scolarité"]);
        }
    }

    public function edit(Scolarite $scolarite)
    {
        try {
            $niveaux = $this->niveauService->getAllNiveaux();

            return Inertia::render("scolarite/Edit", [
                "scolarite" => $scolarite,
                "niveaux" => $niveaux,
                "types" => ScolariteType::cases()
            ]);
        } catch (Exception $e) {
            Log::error("Erreur lors de l'affichage de la vue d'edition d'une scolarité", ["erreur" => $e->getMessage()]);
            return response()->json(["success" => false, "message" => "Erreur lors de l'affichage de la vue d'edition d'une scolarité"]);
        }
    }

    public function update(UpdateScolariteRequest $request, Scolarite $scolarite)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $scolariteModifiee = $this->scolariteService->updateScolarite($scolarite, $data);

            if ($scolariteModifiee) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            Log::error("Erreur lors de la mise à jour d'une scolarité", ["erreur" => $e->getMessage()]);
            return response()->json(["success" => false, "message" => "Erreur lors de la mise à jour d'une scolarité"]);
        }
    }

    public function delete(Scolarite $scolarite)
    {
        try {
            //Suppression d'une scolarite
            $scolariteSupprimee = $this->scolariteService->deleteScolarite($scolarite);

            if ($scolariteSupprimee) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            Log::error("Erreur lors de la suppression d'une scolarité", ["erreur" => $e->getMessage()]);
            return response()->json(["success" => false, "message" => "Erreur lors de la suppression d'une scolarité"]);
        }
    }
}
