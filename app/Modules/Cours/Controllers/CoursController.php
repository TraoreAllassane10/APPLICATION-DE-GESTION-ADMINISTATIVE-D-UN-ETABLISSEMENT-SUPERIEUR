<?php

namespace App\Modules\Cours\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Cours;
use App\Modules\Cours\Enums\TypeEnseignement;
use App\Modules\Cours\Requests\CreateCoursRequest;
use App\Modules\Cours\Requests\UpdateCoursRequest;
use App\Modules\Cours\Resources\CoursResource;
use App\Modules\Cours\Services\CoursService;
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
                "types_enseignement" => TypeEnseignement::cases(),
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
            "types_enseignement" => TypeEnseignement::cases()
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
