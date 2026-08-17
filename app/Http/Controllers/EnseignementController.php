<?php

namespace App\Http\Controllers;

use App\Models\Niveau;
use App\Services\Pedagogie\EnseignementService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EnseignementController extends Controller
{
    public function __construct(
        protected EnseignementService $enseignementService
    ) {}
    public function findEnseignement(string $enseignement)
    {
        $enseignement = $this->enseignementService->getEnseignement($enseignement);
        $niveaux = Niveau::latest()->get();

        return response()->json([
            "success" => true,
            "data" => [
                "enseignement" => $enseignement,
                "niveaux" => $niveaux
            ]
        ]);
    }

    public function update(Request $request, string $enseignement)
    {   
        $data = $request->validate([
            'classes' => 'required|array'
        ]);

        $enseignement = $this->enseignementService->update($enseignement, $data);

        return response()->json([
            "success" => true,
            "data" => $enseignement
        ]);
    }
}
