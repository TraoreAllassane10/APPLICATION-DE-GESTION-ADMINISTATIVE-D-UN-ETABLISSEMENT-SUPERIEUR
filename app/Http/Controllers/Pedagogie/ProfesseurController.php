<?php

namespace App\Http\Controllers\Pedagogie;

use App\Exports\EnseignantExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\professeur\CreateProfesseurRequest;
use App\Http\Requests\professeur\UpdateProfesseurRequest;
use App\Http\Resources\ProfesseurResource;
use App\Models\Cours;
use App\Models\Niveau;
use App\Models\Professeur;
use App\Services\AnneeAcademiqueService;
use App\Services\CoursService;
use App\Services\ProfesseurService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ProfesseurController extends Controller
{
    public function __construct(
        protected ProfesseurService $professeurService,
        protected AnneeAcademiqueService $anneeAcademiqueService,
        protected CoursService $coursService
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
        }])->load(["enseignements" => function ($query) use ($anneeActive) {
            $query->where('annee_universitaire_id', $anneeActive->id);
        }]);

        return Inertia::render("professeur/Show", ["professeur" => $professeur]);
    }

    public function create()
    {
        $professeurs = $this->professeurService->getProfesseurNonEnregistreDabord();
        $cours = Cours::latest()->get();

        return Inertia::render('professeur/Create', [
            "professeurs" => $professeurs,
            "cours" => $cours,

        ]);
    }

    public function store(CreateProfesseurRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            //Creation d'un professeur
            $this->professeurService->createProfesseur($data);

            return response()->json(["success" => true]);
        } catch (Exception $e) {
            Log::info("Erreur survenue lors de la création de l'enseignant", ["erreur" => $e->getMessage()]);
            return response()->json(["message" => "Erreur survenue lors de l'enregistrement de l'enseignant"]);
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

            $this->professeurService->updateProfesseur($professeur, $data);

            return response()->json(["success" => true]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(Professeur $professeur)
    {
        try {
            //Suppression d'un professeur
            $this->professeurService->deleteProfesseur($professeur);
            return response()->json(["success" => true]);
        } catch (Exception $e) {
            return response()->json(["message" => "Erreur survenue lors de la suppression"]);
        }
    }

    public function export()
    {

        $anneeActive = $this->anneeAcademiqueService->getAnneeActive();

        return Excel::download(new EnseignantExport($anneeActive->id), 'Liste_des_enseignants_' . $anneeActive->libelle . '.xlsx');
    }

    public function createAssigner(Professeur $professeur)
    {
        $anneeActive = $this->anneeAcademiqueService->getAnneeActive();

        $professeur->load(["enseignements" => function ($query) use ($anneeActive) {
            $query->where('annee_universitaire_id', $anneeActive->id);
        }]);

        $niveaux = Niveau::latest()->get();

        return Inertia::render("professeur/AssignerClasse", [
            "professeur" => $professeur,
            "niveaux" => $niveaux
        ]);
    }

    public function assigner(Request $request, Professeur $professeur)
    {
        try {
            $validated = $request->validate([
                "enseignement" => "required",
                "classes" => "required|array"
            ]);

            $this->professeurService->attribuerClassesProfesseur($validated);

            return response()->json(["success" => true]);
        } catch (Exception $e) {

            return response()->json(["message" => "Erreur survenue lors de l'attribution"]);
        }
    }
}
