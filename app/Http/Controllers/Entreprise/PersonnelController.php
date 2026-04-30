<?php

namespace App\Http\Controllers\Entreprise;

use App\Http\Controllers\Controller;
use App\Http\Requests\Entreprise\personnel\CreatePersonnelRequest;
use App\Http\Requests\Entreprise\personnel\UpdatePersonnelRequest;
use App\Http\Resources\Entreprise\PersonnelResource;
use App\Models\Entreprise\Personnel;
use App\Services\Entreprise\PersonnelService;
use Exception;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PersonnelController extends Controller
{
    public function __construct(
        protected PersonnelService $personnelService
    ) {}

    public function index()
    {
        $personnels = PersonnelResource::collection($this->personnelService->getPersonnels());

        return Inertia::render('Entreprise/personnel/Index', [
            "personnels" => $personnels
        ]);
    }
    public function show(Personnel $personnel)
    {
        return Inertia::render('Entreprise/personnel/Show', ['personnel' => $personnel]);
    }
    public function create()
    {
        return Inertia::render('Entreprise/personnel/Create');
    }
    public function store(CreatePersonnelRequest $request)
    {
        $data = $request->validated();

        try {
            $this->personnelService->createPersonnel($data);

            return response()->json(["success" => true, "message" => "Employé crée avec succès"]);
        } catch (Exception $e) {
            Log::error('Erreur lors de la creation d\'un employé', ["erreur" => $e->getMessage()]);
            return response()->json(["success" => false, "message" => $e->getMessage()]);
        }
    }
    public function edit(Personnel $personnel)
    {
        return Inertia::render('Entreprise/personnel/Edit', ["personnel" => $personnel]);
    }
    public function update(Personnel $personnel, UpdatePersonnelRequest $request)
    {
        $data = $request->validated();

        try {
            $this->personnelService->updatePersonnel($personnel, $data);

            return response()->json(["success" => true, "message" => "Employé modifiée avec succès"]);
        } catch (Exception $e) {
            Log::error('Erreur lors de la modification d\'un employé', ["erreur" => $e->getMessage()]);
            return response()->json(["success" => false, "message" => $e->getMessage()]);
        }
    }
    public function delete(Personnel $personnel)
    {
        try {
            $this->personnelService->deletePersonnel($personnel);

            return response()->json(["success" => true, "message" => "Employé supprimé avec succès"]);
        } catch (Exception $e) {
            Log::error('Erreur lors de la supression d\'un employé', ["erreur" => $e->getMessage()]);
            return response()->json(["success" => false, "message" => $e->getMessage()]);
        }
    }
}
