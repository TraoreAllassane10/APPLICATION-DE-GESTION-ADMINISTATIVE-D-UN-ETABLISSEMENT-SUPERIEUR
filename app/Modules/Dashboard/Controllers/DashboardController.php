<?php

namespace App\Modules\Dashboard\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Etudiant;
use App\Models\Filiere;
use App\Models\Inscription;
use App\Models\Niveau;
use App\Models\Paiement;
use App\Models\Professeur;
use App\Modules\AnneeAcademique\Services\AnneeAcademiqueService;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(
        protected AnneeAcademiqueService $anneeAcademiqueService
    ) {}
    public function index()
    {
        $anneeActive = $this->anneeAcademiqueService->getAnneeActive();

        if (!$anneeActive) {
            abort(404, "Aucune année academique active");
        }

        // Statitstiques globals
        $totalEtudiants = Etudiant::count();
        $totalInscriptions = Inscription::where("annee_universitaire_id", $anneeActive->id)->count();
        $totalEnseignants = Professeur::count();
        $totalFilieres = Filiere::count();


        // Statistiques financiers
        $totalAttendu = Inscription::where("annee_universitaire_id", $anneeActive->id)->sum("montant_total");
        $totalPaye = Paiement::whereHas("inscription", function ($query) use ($anneeActive) {
            return $query->where("annee_universitaire_id", $anneeActive->id);
        })->sum("montant");
        $resteAPayer = $totalAttendu - $totalPaye;
        $tauxRecouvrement = $totalAttendu > 0 ? ceil(($totalPaye / $totalAttendu) * 100) : 0;


        // derniers paiements et inscriptions
        $derniers_paiements = Paiement::with([
            "inscription",
            "inscription.etudiant",
            "inscription.niveaux"
        ])->latest()->limit(5)->get();

        $dernieres_inscriptions = Inscription::with([
            "etudiant",
            "niveaux"
        ])->where("annee_universitaire_id", $anneeActive->id)
            ->latest()->limit(5)->get();


        // Repartition des niveaux
        $couleurs = [
            '#3b82f6',
            '#8b5cf6',
            '#06b6d4',
            '#10b981',
            '#f59e0b',
            '#ef4444',
            '#6366f1',
        ];

        $niveaux = Niveau::withCount([
            'inscriptions as inscriptions_count' => function ($query) use ($anneeActive) {
                $query->where('annee_universitaire_id', $anneeActive->id);
            }
        ])->get();

        $repartitionNiveaux = $niveaux->map(function ($niveau, $index) use ($couleurs) {
            return [
                "niveau" => $niveau->nom,
                "inscrits" => $niveau->inscriptions_count,
                "couleur" => $couleurs[$index % count($couleurs)]
            ];
        });

        return Inertia::render(
            "dashboard",
            [
                "stats_globales" => [
                    "totalEtudiants" => $totalEtudiants,
                    "totalInscriptions" => $totalInscriptions,
                    "totalEnseignants" => $totalEnseignants,
                    "totalFilieres" => $totalFilieres
                ],
                "stats_financiere" => [
                    "totalAttendu" => $totalAttendu,
                    "totalPaye" => $totalPaye,
                    "resteAPayer" => $resteAPayer,
                    "tauxRecouvrement" => $tauxRecouvrement
                ],
                "repartitionNiveaux" => $repartitionNiveaux,
                "derniers_paiements" => $derniers_paiements,
                "dernieres_inscriptions" => $dernieres_inscriptions,
            ]
        );
    }
}
