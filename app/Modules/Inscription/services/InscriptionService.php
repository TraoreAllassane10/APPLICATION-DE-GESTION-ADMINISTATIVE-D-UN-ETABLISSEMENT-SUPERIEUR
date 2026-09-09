<?php

namespace App\Modules\Inscription\services;

use App\Models\FraisConfiguration;
use App\Models\Inscription;
use App\Models\Scolarite;
use App\Modules\AnneeAcademique\Services\AnneeAcademiqueService;
use App\Modules\Etudiant\Enums\StatutEtudiant;
use App\Modules\Etudiant\Services\EtudiantService;
use App\Modules\Inscription\repositories\InscriptionRepository;
use App\Modules\Niveau\Services\NiveauService;
use App\Modules\Scolarite\Enums\ScolariteType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class InscriptionService
{
    public function __construct(
        protected InscriptionRepository $inscriptionRepository,
        protected AnneeAcademiqueService $anneeAcademiqueService,
        protected EtudiantService $etudiantService,
        protected NiveauService $niveauService
    ) {}

    public function all(Request $request)
    {
        $niveaux = $this->niveauService->getAllNiveaux();

        // Annee universitaire active
        $anneeActive = $this->anneeAcademiqueService->getAnneeActive();

        $inscriptions = $this->inscriptionRepository->all($request);

        // Statistiques
        $nombreTotalInscription = $this->inscriptionRepository->totalInscription();

        $nombreInscriptionAnneeActive = $this->inscriptionRepository->totalInscriptionAnneeActive($anneeActive->id);

        $recetteAnneeActive = $this->inscriptionRepository->totalRecetteAnneeActive($anneeActive->id);

        $totalVerseAnneeActive = $this->inscriptionRepository->totalEncaisseAnneActive($anneeActive->id);

        return [
            "niveaux" => $niveaux,
            "inscriptions" => $inscriptions,
            "stats" => [
                "total_inscription" => $nombreTotalInscription,
                "total_inscription_annee" => $nombreInscriptionAnneeActive,
                "recette_annee_active" => $recetteAnneeActive,
                "total_verse_annee_active" => $totalVerseAnneeActive
            ]
        ];
    }

    public function find(string $inscription)
    {
        return $this->inscriptionRepository->find($inscription);
    }

    public function create(array $data)
    {
        // Recuperation l'etudiant et l'annee universitaire dans la bd
        $etudiant = $this->etudiantService->findByIp($data['etudiant_ip']);
        $anneeUniversitaire = $this->anneeAcademiqueService->find($data['annee_id']);

        if ($etudiant && $anneeUniversitaire) {

            // Verifie si l'etudiant est déjè inscrit durant l'annee choisie
            $estInscrit = $this->etudiantDejaInscriptionDurantAnneeSelectionnee($etudiant->ip, $anneeUniversitaire->id);

            if (!empty($estInscrit)) {
                return response()->json([
                    "success" => false,
                    "message" => "Cet etudiant est déjà inscrit pour l'année selectionné"
                ]);
            }

            // Recuperation de la scolarite et des frais annexe
            $frais_annexe = FraisConfiguration::where("type", "frais_annexe")->first();

            if (!$frais_annexe) {
                return response()->json([
                    "success" => false,
                    "message" => "Aucun frais annexe trouve."
                ]);
            }

            // Type de scolarite selon le statut de l'etudiant
            $typeScolarite = $etudiant->statut == StatutEtudiant::NAFF->value ? ScolariteType::NAFF->value : ScolariteType::AFFECTE->value;

            // Liste des scolarite en foction des niveaux choisit
            $scolarites = Scolarite::whereIn("niveau_id", $data['niveaux'])
                ->whereIn("type", [$typeScolarite, ScolariteType::LICENCE->value])
                ->get();


            if ($scolarites->count() !== count($data['niveaux'])) {
                return response()->json([
                    "success" => false,
                    "message" => "Certains niveaux sélectionnés n'ont pas encore de scolarité définie dans la configuration."
                ]);
            }

            // Scolarite total sans frais annexe
            $scolarite = $scolarites->sum("montant");

            // Calcule de la scolarite apres la reduction. NB: j'applique la reduction sur la scolarite et avant d'ajouter les frais annexe
            $montantReduction = $data['taux_reduction'] > 0 ? ($scolarite * $data['taux_reduction']) / 100 : 0;
            $scolariteApresReduction =  $scolarite - $montantReduction;

            // Calucle du montant total avec les frais annexe
            $montantTotalScolarite = $frais_annexe->montant + $scolariteApresReduction;

            // Enregistrement de l'inscription
            $inscription = $this->inscriptionRepository->create($data, $frais_annexe, $scolariteApresReduction, $montantTotalScolarite, $etudiant, $anneeUniversitaire);

            // Vider le cache de statistique
            Cache::forget('dashboard:stats');

            if ($inscription) {
                $inscription->niveaux()->attach($data['niveaux']);

                return response()->json([
                    "success" => true,
                    "message" => "{$inscription->etudiant->nom} {$inscription->etudiant->prenom} Inscrit avec succès"
                ]);
            }
        }
    }

    public function delete(Inscription $inscription)
    {
       $inscriptionSupprimee = $this->inscriptionRepository->delete($inscription);

        // Vider le cache de statistique
        Cache::forget('dashboard:stats');

        return $inscriptionSupprimee;
    }

    public function etudiantDejaInscriptionDurantAnneeSelectionnee($etudiantId, $anneeId)
    {
        return Inscription::where("etudiant_ip", $etudiantId)
            ->where("annee_universitaire_id", $anneeId)->first();
    }
}
