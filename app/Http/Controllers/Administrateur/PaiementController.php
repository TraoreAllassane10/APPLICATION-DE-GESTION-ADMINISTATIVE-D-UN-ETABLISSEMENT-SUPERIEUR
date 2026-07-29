<?php

namespace App\Http\Controllers\Administrateur;

use App\Http\Controllers\Controller;
use App\Http\Requests\paiement\CreatePaiementRequest;
use App\Models\Inscription;
use App\Models\Paiement;
use App\Services\PaiementService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PaiementController extends Controller
{
    public function __construct(
        protected PaiementService $paiementService
    ) {}

    public function index(Request $request)
    {

        $data = $this->paiementService->getPaiements($request);

        return Inertia::render('paiement/Index', [
            "total_recette_inscriptions" => $data['total_recette_inscriptions'],
            "total_encaisse" => $data['total_encaisse'],
            "total_reste" => $data['total_reste'],
            "paiements" => $data['paiements']
        ]);
    }

    public function store(CreatePaiementRequest $request, string $inscriptionId)
    {
        try {
            $data = $request->validated();

            return $this->paiementService->createPaiement($inscriptionId, $data);
        } catch (Exception $e) {

            Log::error('Erreur lors de l\'enregistrement d\'un paiement', ["erreur" => $e->getMessage()]);
            return response()->json(['success' => false, 'message' => 'Erreur lors de l\'enregistrement d\'un paiement']);
        }
    }

    public function recu(Paiement $paiement)
    {
        try {
            $pdf = $this->paiementService->getRecuPaiement($paiement);

            return $pdf->stream("reçu_{$paiement->inscription->etudiant->nom}_{$paiement->inscription->etudiant->prenom}_{$paiement->date}.pdf");
        } catch (Exception $e) {
            Log::error('Erreur lors de la génération d\' reçu de paiement', ["erreur" => $e->getMessage()]);
        }
    }

    public function recapitulatifPaiement(Inscription $inscription)
    {
        try {
            $pdf = $this->paiementService->getRecapPaiements($inscription);

            return $pdf->stream("paiments_{$inscription->etudiant->nom}_{$inscription->etudiant->prenom}.pdf");
        } catch (Exception $e) {
            Log::error('Erreur lors de la génération d\'un recap de paiement', ["erreur" => $e->getMessage()]);
        }
    }
}
