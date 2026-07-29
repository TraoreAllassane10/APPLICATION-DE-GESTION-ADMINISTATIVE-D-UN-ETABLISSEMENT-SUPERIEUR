<?php

namespace App\Http\Controllers\Pedagogie;

use App\Exports\EnseignantExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\professeur\CreateProfesseurRequest;
use App\Http\Requests\professeur\UpdateProfesseurRequest;
use App\Http\Resources\ProfesseurResource;
use App\Models\Professeur;
use App\Services\AnneeAcademiqueService;
use App\Services\ProfesseurService;
use Exception;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ProfesseurController extends Controller
{
    public function __construct(
        protected ProfesseurService $professeurService,
        protected AnneeAcademiqueService $anneeAcademiqueService
    ) {}

    public function index()
    {
        try {
            $professeurs = ProfesseurResource::collection($this->professeurService->getAllProfesseurs());

            return Inertia::render("professeur/Index", [
                "professeurs" => $professeurs,
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function show(Professeur $professeur)
    {
        $anneeActive = $this->anneeAcademiqueService->getAnneeActive();

        $professeur->load(['anneeAcademiques' => function ($query) use ($anneeActive) {
            $query->where('annee_universitaire_id', $anneeActive->id);
        }]);

        return Inertia::render("professeur/Show", ["professeur" => $professeur]);
    }

    public function create()
    {
        $professeurs = $this->professeurService->getProfesseurNonEnregistreDabord();
        return Inertia::render('professeur/Create', ["professeurs" => $professeurs]);
    }

    public function store(CreateProfesseurRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            //Creation d'un professeur
            $professeurCree = $this->professeurService->createProfesseur($data);

            if ($professeurCree) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function edit(Professeur $professeur)
    {
        $anneeActive = $this->anneeAcademiqueService->getAnneeActive();

        $professeur->load(['anneeAcademiques' => function ($query) use ($anneeActive) {
            $query->where('annee_universitaire_id', $anneeActive->id);
        }]);

        return Inertia::render("professeur/Edit", [
            "professeur" => $professeur,
        ]);
    }

    public function update(UpdateProfesseurRequest $request, Professeur $professeur)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $professeurModifie = $this->professeurService->updateProfesseur($professeur, $data);

            if ($professeurModifie) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(Professeur $professeur)
    {
        try {
            //Suppression d'un professeur
            $professeurSupprime = $this->professeurService->deleteProfesseur($professeur);

            if ($professeurSupprime) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function export()
    {

        $anneeActive = $this->anneeAcademiqueService->getAnneeActive();

        return Excel::download(new EnseignantExport($anneeActive->id), 'Liste_des_enseignants_' . $anneeActive->libelle . '.xlsx');
    }
}
