<?php

namespace App\Modules\Inscription\repositories;

use App\Models\Inscription;
use App\Models\Paiement;
use App\Modules\AnneeAcademique\Repositories\AnneeAcademiqueRepository;
use App\Modules\Inscription\Enums\StatutInscription;
use Illuminate\Http\Request;

class InscriptionRepository
{
    public function __construct(
        protected AnneeAcademiqueRepository $anneeAcademiqueRepository
    ) {}
    public function all(Request $request)
    {
        $anneeActive = $this->anneeAcademiqueRepository->anneeActive();

        $query = Inscription::with("paiements")
            ->withSum("paiements as total_paiements", "montant")
            ->where('annee_universitaire_id', $anneeActive->id);

        $query->when($request->search, function ($q) use ($request) {
            $q->whereHas('etudiant', function ($sub) use ($request) {
                $sub->where('nom', 'like', '%' . $request->search . '%')
                    ->orWhere('prenom', 'like', '%' . $request->search . '%')
                    ->orWhere('ip', 'like', '%' . $request->search . '%');
            });
        });

        $query->when($request->niveau, function ($q) use ($request) {
            if ($request->niveau !== "all") {
                $q->whereHas('niveaux', function ($sub) use ($request) {
                    $sub->whereIn("niveau_id", [$request->niveau]);
                });
            }
        });

        $query->when($request->statut, function ($q) use ($request) {
            if ($request->statut !== "all") {
                if ($request->statut === "Solde") {

                    // Having, car total_paiements est un valeur calculée et non une colonne
                    // sinon on utilise whereColumn 
                    $q->havingRaw('montant_total = total_paiements');
                } else {
                    $q->havingRaw('(montant_total > total_paiements OR total_paiements IS NULL)');
                }
            }
        });

        return $query
            ->latest()
            ->paginate(20)->withQueryString();
    }

    public function find(string $inscription)
    {
        return Inscription::where("id", $inscription)
            ->with("paiements")
            ->withSum("paiements as total_paiements", "montant")
            ->first();
    }
    public function create(array $data, $frais_annexe, $scolariteApresReduction, $montantTotalScolarite, $etudiant, $anneeUniversitaire)
    {
        return Inscription::create([
            "date" => now(),
            "status" => StatutInscription::BON,
            "type_inscription" => $data["type_inscription"],
            "taux_reduction" => $data['taux_reduction'] > 0 ? $data['taux_reduction'] : 0,
            "frais_annexe" => $frais_annexe->montant,
            "montant_scolarite" => $scolariteApresReduction,
            "montant_total" => $montantTotalScolarite,
            "etudiant_ip" => $etudiant->ip,
            "annee_universitaire_id" => $anneeUniversitaire->id
        ]);
    }

    public function delete(Inscription $inscription)
    {
        return $inscription->delete();
    }

    public function totalInscription()
    {
        return Inscription::count();
    }

    public function totalInscriptionAnneeActive($anneeActiveId)
    {
        return Inscription::where("annee_universitaire_id", $anneeActiveId)->count();
    }

    public function totalRecetteAnneeActive($anneeActiveId)
    {
        return Inscription::where("annee_universitaire_id", $anneeActiveId)->sum("montant_total");
    }

    public function totalEncaisseAnneActive($anneeActiveId)
    {
        return Paiement::whereHas("inscription", function ($query) use ($anneeActiveId) {
            return $query->where("annee_universitaire_id", $anneeActiveId);
        })->sum("montant");
    }
}
