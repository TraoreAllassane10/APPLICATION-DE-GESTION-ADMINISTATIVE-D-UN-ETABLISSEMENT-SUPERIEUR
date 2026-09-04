<?php

namespace App\Modules\Niveau\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\FiliereResource;
use App\Models\Filiere;
use App\Models\Niveau;
use App\Modules\Niveau\Requests\CreateNiveauRequest;
use App\Modules\Niveau\Requests\UpdateNiveauRequest;
use App\Modules\Niveau\Resources\NiveauResource;
use App\Modules\Niveau\Services\NiveauService;
use App\Services\FiliereService;
use Exception;
use Inertia\Inertia;

class NiveauController extends Controller
{
    public function __construct(
        protected NiveauService $niveauService,
        protected FiliereService $filiereService
    ) {}

    public function index()
    {
        try {
            $niveaux = NiveauResource::collection($this->niveauService->getAllNiveaux());
            $filieres = $this->filiereService->getAllFilieres();

            return Inertia::render("niveau/Index", [
                "niveaux" => $niveaux,
                "filieres" => FiliereResource::collection($filieres)
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function store(CreateNiveauRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            //Creation d'un niveau
            $niveauCree = $this->niveauService->createNiveau($data);

            if ($niveauCree) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function edit(Niveau $niveau)
    {
        return Inertia::render("niveau/Edit", [
            "niveau" => $niveau,
            "filieres" => FiliereResource::collection(Filiere::latest()->get())
        ]);
    }

    public function update(UpdateNiveauRequest $request, Niveau $niveau)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $niveauModifie = $this->niveauService->updateNiveau($niveau, $data);

            if ($niveauModifie) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(Niveau $niveau)
    {
        try {
            //Suppression d'un niveau
            $niveau->delete();

            return response()->json([
                "success" => true,
                "message" => "Niveau supprimé avec succès"
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function listeDeClasse(string $niveauId)
    {

        $niveau = $this->niveauService->getNiveau($niveauId);

        $listeDesEtudiants = $this->niveauService->getListeDeClasse($niveauId);

        return Inertia::render('niveau/ListeDeClasse', [
            "liste" => $listeDesEtudiants,
            "niveau" => $niveau
        ]);
    }

    public function downloadListeDeClase(string $niveauId)
    {
        return $this->niveauService->getListeDeClasseEnPdf($niveauId);
    }
}
