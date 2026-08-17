<?php

namespace App\Http\Controllers\Pedagogie;

use App\Http\Controllers\Controller;
use App\Http\Requests\cours\CreateCoursRequest;
use App\Http\Requests\cours\UpdateCoursRequest;
use App\Http\Resources\CoursResource;
use App\Http\Resources\ProfesseurResource;
use App\Models\Cours;
use App\Models\Professeur;
use App\Services\CoursService;
use Exception;
use Inertia\Inertia;

class CoursController extends Controller
{
    public function __construct(
        protected CoursService $coursService
    ) {}
    public function index()
    {
        try {
            $cours = CoursResource::collection($this->coursService->getAllCours()->paginate(10));

            return Inertia::render("cours/Index", [
                "cours" => $cours,
                "professeurs" => ProfesseurResource::collection(Professeur::latest()->get())
            ]);
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function getCours()
    {
        $cours = $this->coursService->getAllCours()->get();
        return response()->json(["success" => true, "data" => $cours]);
    }

    public function store(CreateCoursRequest $request)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            //Creation d'un cours
            $coursCree = $this->coursService->createCours($data);

            if ($coursCree) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function edit(Cours $cours)
    {
        return Inertia::render("cours/Edit", [
            "cours" => $cours,
            "professeurs" => ProfesseurResource::collection(Professeur::latest()->get())
        ]);
    }

    public function update(UpdateCoursRequest $request, Cours $cours)
    {
        try {
            // Validation des entrées
            $data = $request->validated();

            $coursModifie = $this->coursService->updateCours($cours, $data);

            if ($coursModifie) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function delete(Cours $cours)
    {
        try {
            //Suppression d'un cours
            $coursSupprime = $this->coursService->deleteCours($cours);

            if ($coursSupprime) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }
}
