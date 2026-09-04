<?php

namespace App\Modules\AnneeAcademique\controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Annee\CreateAnneeScolaireRequest;
use App\Http\Requests\Annee\UpdateAnneeScolaireRequest;
use App\Models\AnneeUniversitaire;
use App\Modules\AnneeAcademique\Resources\AnneeScolaireResource;
use App\Modules\AnneeAcademique\Services\AnneeAcademiqueService;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AnneeAcademiqueController extends Controller
{
    public function __construct(
        protected AnneeAcademiqueService $anneeAcademiqueService
    ) {}
    public function index()
    {
        try {
            $annees = AnneeScolaireResource::collection($this->anneeAcademiqueService->all());

            return Inertia::render("annee/Index", [
                "annees" => $annees
            ]);
        } catch (Exception $e) {
            Log::error('Erreur lors la recuperation de la liste des années', ["erreur" => $e->getMessage()]);
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function store(CreateAnneeScolaireRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            if (isset($data['estActive'])) {
                // Raison pour laquelle je n'ai pas utilisé le service ici, c'est que je veux cette annee en collection
                $anneeActive = AnneeUniversitaire::where("estActive", 1);

                DB::transaction(function () use ($anneeActive, $data) {
                    $anneeActive->update([[
                        "estActive" => false
                    ]]);

                    $this->anneeAcademiqueService->create($data);
                });
            } else {
                //Creation d'une année scolaire
                $this->anneeAcademiqueService->create($data);
            }

            return response()->json(["success" => true]);
        } catch (Exception $e) {
            Log::error('Erreur lors de la création d\'une année', ["erreur" => $e->getMessage()]);

            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function edit(AnneeUniversitaire $annee)
    {
        return Inertia::render("annee/Edit", [
            // Pouvoir recuperer les dates sous format 'Y-m-d' pour mes inputs coté frontend
            "annee" => [
                "id" => $annee->id,
                "libelle" => $annee->libelle,
                "date_debut" => Carbon::parse($annee->date_debut)->format('Y-m-d'),
                "date_fin" => Carbon::parse($annee->date_fin)->format('Y-m-d'),
            ]
        ]);
    }

    public function update(UpdateAnneeScolaireRequest $request, AnneeUniversitaire $annee)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $this->anneeAcademiqueService->update($annee, $data);

            return response()->json(["success" => true]);
        } catch (Exception $e) {
            Log::error('Erreur lors de la modification d\'une année', ["erreur" => $e->getMessage()]);
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(AnneeUniversitaire $annee)
    {
        try {
            //Suppression d'une année scolaire
            $this->anneeAcademiqueService->delete($annee);

            return response()->json(["success" => true]);
        } catch (Exception $e) {
            Log::error('Erreur lors de la suppression d\'une année', ["erreur" => $e->getMessage()]);
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function editAnneeActive(AnneeUniversitaire $annee)
    {
        try {

            $data = $this->anneeAcademiqueService->editAnneeActive();

            return Inertia::render("annee/AnneeAcademiqueActive", [
                "anneeActive" => $data[0],
                "annees" => $data[1]
            ]);
        } catch (Exception $e) {

            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function changeAnneeActive(string $id)
    {
        try {
            $this->anneeAcademiqueService->changeAnneeActive($id);

            return response()->json([
                "success" => true,
            ]);
        } catch (Exception $e) {
            Log::error('Erreur lors du changement de l\'annee', ["erreur" => $e->getMessage()]);
            return response()->json(["message" => $e->getMessage()]);
        }
    }
}
