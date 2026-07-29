<?php

namespace App\Services;

use App\Models\Inscription;
use App\Models\Paiement;
use App\Repositories\InscriptionRepository;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PaiementService
{
    public function __construct(
        protected InscriptionService $inscriptionService,
        protected AnneeAcademiqueService $anneeAcademiqueService,
        protected InscriptionRepository $inscriptionRepository
    ) {}

    public function getPaiements()
    {
        $anneeActive = $this->anneeAcademiqueService->getAnneeActive();

        $totalRecetteInscriptions = (int) $this->inscriptionRepository->totalRecetteAnneeActive($anneeActive->id);
        $totalEncaisse = (int) $this->inscriptionRepository->totalEncaisseAnneActive($anneeActive->id);
        $totalReste = $totalRecetteInscriptions - $totalEncaisse;

        $paiements = Paiement::whereHas('inscription', function ($inscription) use ($anneeActive) {
            $inscription->where('annee_universitaire_id', $anneeActive->id);
        })->with('inscription')->latest()->paginate(20);

        return [
            "total_recette_inscriptions" => $totalRecetteInscriptions,
            "total_encaisse" => $totalEncaisse,
            "total_reste" => $totalReste,
            "paiements" => $paiements
        ];
    }

    public function createPaiement(string $inscriptionId, array $data)
    {
        // Verifie si l'inscription existe
        $inscriptionExist = Inscription::where("id", $inscriptionId)->exists();

        if (!$inscriptionExist) {
            return response()->json(["success" => false, "message" => "Inscription introuvable"]);
        }

        // Recupération de l'inscription
        $inscription = $this->inscriptionService->find($inscriptionId);

        // Calcule le reste à payer
        $resetPaye = $inscription->montant_total - $inscription->total_paiements;

        if ($resetPaye === 0) {
            return response()->json(["success" => false, "message" => "Cet etudiant a soldé"]);
        }


        if ($data['montant'] <= $resetPaye) {

            // Effectue le paiement
            $inscription->paiements()->create([
                "reference" => $data['reference'],
                "date_paiement" => Carbon::parse($data['date_paiement']),
                "methode_paiement" => Str::upper($data['methode_paiement']),
                "montant" => $data['montant'],
                "receveur_id" => Auth::user()->id,
                "nom_receveur" => Auth::user()->name
            ]);

            return response()->json([
                "success" => true,
                "message" => "Paiement effectué avec succés !",

            ]);
        }
    }

    public function getRecuPaiement(Paiement $paiement)
    {
        $paiement->load(
            "inscription",
            "receveur"
        );

        // Total jusqu'à ce paiement
        $totalPaye = Paiement::where("inscription_id", $paiement->inscription_id)
            ->where("id", "<=", $paiement->id)
            ->sum("montant");

        $montantTotalScolarite = $paiement->inscription->montant_total;

        $restePaye = $montantTotalScolarite - $totalPaye;

        // Exporte le reçu
        return Pdf::loadView("pdf.recu_paiement", [
            "paiement" => $paiement,
            "reste" => $restePaye
        ]);
    }

    public function getRecapPaiements(Inscription $inscription)
    {
        $inscription->load('paiements');

        return Pdf::loadView('pdf.recap_paiements', [
            "etudiant" => $inscription->etudiant,
            "niveaux" => $inscription->niveaux,
            "paiements" => $inscription->paiements,
            'annee' => $inscription->annee
        ]);
    }
}
