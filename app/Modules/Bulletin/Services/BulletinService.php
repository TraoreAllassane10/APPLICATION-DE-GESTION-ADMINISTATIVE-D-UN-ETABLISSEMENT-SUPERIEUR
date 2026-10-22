<?php

namespace App\Modules\Bulletin\Services;

use App\Models\Bulletin;
use App\Models\Inscription;
use App\Models\Moyenne;
use App\Models\Niveau;
use App\Models\PeriodeAcademique;
use App\Modules\Bulletin\Repositories\BulletinRepository;
use Barryvdh\DomPDF\Facade\Pdf;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class BulletinService
{
    public function __construct(
        protected BulletinRepository $bulletinRepository
    ) {}

    /**
     * Récupère la liste des enseignements configurés pour une classe et une période donnée,
     * avec leurs coefficients respectifs provenant de la table pivot `enseignement_classe`.
     */
    public function getEnseignementsClasse(int $classeId, int $anneeUniversitaireId): Collection
    {
        $niveau = Niveau::findOrFail($classeId);

        return $niveau->enseignements()
            ->where('enseignements.annee_universitaire_id', $anneeUniversitaireId)
            ->with(['cours', 'professeur'])
            ->get();
    }

    /**
     * Vérifie la complétude des moyennes d'une inscription par rapport aux enseignements attendus.
     */
    public function verifierCompletude(Collection $enseignements, $moyennesByEnseignement): array
    {
        $totalMatieres = $enseignements->count();
        $matieresEvaluees = 0;
        $matieresManquantes = [];
        $anomalies = [];

        foreach ($enseignements as $enseignement) {
            $moyenne = $moyennesByEnseignement->get($enseignement->id);

            if ($moyenne === null || $moyenne->valeur === null) {
                $matieresManquantes[] = [
                    'enseignement_id' => $enseignement->id,
                    'cours_nom' => $enseignement->cours?->nom ?? "Enseignement #{$enseignement->id}",
                ];
            } else {
                $valeur = (float) $moyenne->valeur;
                if ($valeur < 0 || $valeur > 20) {
                    $anomalies[] = [
                        'enseignement_id' => $enseignement->id,
                        'cours_nom' => $enseignement->cours?->nom ?? "Enseignement #{$enseignement->id}",
                        'valeur' => $valeur,
                        'message' => 'Moyenne hors bornes (doit être entre 0 et 20)',
                    ];
                }
                $matieresEvaluees++;
            }
        }

        $isComplet = ($totalMatieres > 0) && ($matieresEvaluees === $totalMatieres) && empty($anomalies);

        return [
            'is_complet' => $isComplet,
            'total_matieres' => $totalMatieres,
            'matieres_evaluees' => $matieresEvaluees,
            'matieres_manquantes' => $matieresManquantes,
            'anomalies' => $anomalies,
        ];
    }

    /**
     * Calcule la moyenne générale pondérée selon les coefficients de `enseignement_classe`.
     *
     * Formule : somme(moyenne de l'enseignement * coefficient) / somme des coefficients.
     * Si incomplete : calcule la moyenne sur les matières disponibles si spécifié, sinon null.
     */
    public function calculerMoyenneGenerale(
        Collection $enseignements,
        $moyennesByEnseignement,
        bool $isComplet
    ): ?float {
        if ($enseignements->isEmpty()) {
            return null;
        }

        $totalPoints = 0.0;
        $totalCoefficients = 0.0;

        foreach ($enseignements as $enseignement) {
            $coefficient = (float) ($enseignement->pivot->coefficient ?? 1);
            if ($coefficient <= 0) {
                $coefficient = 1.0;
            }

            $moyenne = $moyennesByEnseignement->get($enseignement->id);

            if ($moyenne !== null && $moyenne->valeur !== null) {
                $valeur = (float) $moyenne->valeur;
                $totalPoints += $valeur * $coefficient;
                $totalCoefficients += $coefficient;
            }
        }

        if ($totalCoefficients <= 0) {
            return null;
        }

        return round($totalPoints / $totalCoefficients, 2);
    }

    /**
     * Détermine la mention selon les règles académiques validées.
     */
    public function determinerMention(?float $moyenne): string
    {
        if ($moyenne === null) {
            return 'Non évalué';
        }

        return match (true) {
            $moyenne >= 16.0 => 'Très Bien',
            $moyenne >= 14.0 => 'Bien',
            $moyenne >= 12.0 => 'Assez Bien',
            $moyenne >= 10.0 => 'Passable',
            $moyenne >= 8.0  => 'Insuffisant',
            default          => 'Médiocre',
        };
    }

    /**
     * Détermine la décision de jury académique.
     */
    public function determinerDecisionJury(?float $moyenne, bool $isComplet): string
    {
        if ($moyenne === null || !$isComplet) {
            return 'En attente';
        }

        return $moyenne >= 10.0 ? 'Admis' : 'Ajourné';
    }

    /**
     * Génère ou actualise le bulletin officiel d'une inscription pour une période donnée.
     */
    public function genererBulletinPourInscription(int $inscriptionId, int $periodeId): Bulletin
    {
        return DB::transaction(function () use ($inscriptionId, $periodeId) {
            $inscription = Inscription::with(['niveaux', 'etudiant'])->findOrFail($inscriptionId);
            $periode = PeriodeAcademique::findOrFail($periodeId);

            $classe = $inscription->niveaux->first();
            if (!$classe) {
                throw new Exception("L'inscription #{$inscriptionId} n'est rattachée à aucune classe/niveau.");
            }

            $bulletin = $this->bulletinRepository->findOrCreate($inscriptionId, $periodeId);

            // Protection des documents officiels publiés
            if ($bulletin->statut === 'PUBLIE') {
                throw new Exception("Le bulletin officiel est déjà publié et ne peut pas être modifié silencieusement.");
            }

            $enseignements = $this->getEnseignementsClasse($classe->id, $periode->annee_universitaire_id);

            $moyennes = Moyenne::where('inscription_id', $inscriptionId)
                ->where('periode_academique_id', $periodeId)
                ->get()
                ->keyBy('enseignement_id');

            $completude = $this->verifierCompletude($enseignements, $moyennes);
            $moyenneGenerale = $this->calculerMoyenneGenerale($enseignements, $moyennes, $completude['is_complet']);
            $mention = $this->determinerMention($moyenneGenerale);
            $decisionJury = $this->determinerDecisionJury($moyenneGenerale, $completude['is_complet']);

            $bulletin->update([
                'moyenne_generale' => $moyenneGenerale,
                'mention' => $mention,
                'decision_jury' => $decisionJury,
                'is_changed' => true,
            ]);

            // Actualise les rangs et effectifs pour l'ensemble de la classe
            $this->calculerRangsEtEffectif($classe->id, $periodeId);

            return $bulletin->fresh();
        });
    }

    /**
     * Génère ou actualise l'ensemble des bulletins d'une classe pour une période académique.
     */
    public function genererBulletinsPourClasse(int $classeId, int $periodeId): array
    {
        return DB::transaction(function () use ($classeId, $periodeId) {
            $classe = Niveau::findOrFail($classeId);
            $periode = PeriodeAcademique::findOrFail($periodeId);

            // Inscriptions valides de la classe pour l'année universitaire de la période
            $inscriptions = Inscription::whereHas('niveaux', function ($q) use ($classeId) {
                $q->where('niveaux.id', $classeId);
            })
            ->where('annee_universitaire_id', $periode->annee_universitaire_id)
            ->with('etudiant')
            ->get();

            if ($inscriptions->isEmpty()) {
                throw new Exception("Aucune inscription trouvée pour cette classe pour l'année académique sélectionnée.");
            }

            $enseignements = $this->getEnseignementsClasse($classeId, $periode->annee_universitaire_id);

            $inscriptionIds = $inscriptions->pluck('id')->toArray();

            // Chargement groupé des moyennes pour éviter le problème N+1
            $allMoyennes = Moyenne::whereIn('inscription_id', $inscriptionIds)
                ->where('periode_academique_id', $periodeId)
                ->get()
                ->groupBy('inscription_id');

            // Chargement groupé des bulletins existants
            $existingBulletins = Bulletin::whereIn('inscription_id', $inscriptionIds)
                ->where('periode_academique_id', $periodeId)
                ->get()
                ->keyBy('inscription_id');

            foreach ($inscriptions as $inscrit) {
                $bulletin = $existingBulletins->get($inscrit->id);

                if ($bulletin && $bulletin->statut === 'PUBLIE') {
                    // Document officiel publié verrouillé : conservation de l'état officiel
                    continue;
                }

                if (!$bulletin) {
                    $bulletin = Bulletin::create([
                        'inscription_id' => $inscrit->id,
                        'periode_academique_id' => $periodeId,
                        'statut' => 'BROUILLON',
                        'is_changed' => true,
                    ]);
                }

                $studentMoyennes = ($allMoyennes->get($inscrit->id) ?? collect())->keyBy('enseignement_id');
                $completude = $this->verifierCompletude($enseignements, $studentMoyennes);
                $moyenneGenerale = $this->calculerMoyenneGenerale($enseignements, $studentMoyennes, $completude['is_complet']);
                $mention = $this->determinerMention($moyenneGenerale);
                $decisionJury = $this->determinerDecisionJury($moyenneGenerale, $completude['is_complet']);

                $bulletin->update([
                    'moyenne_generale' => $moyenneGenerale,
                    'mention' => $mention,
                    'decision_jury' => $decisionJury,
                    'is_changed' => true,
                ]);
            }

            // Calcul du rang et de l'effectif
            $this->calculerRangsEtEffectif($classeId, $periodeId);

            return $this->getBulletinsData($classeId, $periodeId);
        });
    }

    /**
     * Calcule les rangs et effectifs parmi les étudiants éligibles de la classe.
     *
     * Règle de compétition pour ex æquo :
     * Si deux étudiants ont la même moyenne, ils ont le même rang (ex: 1er, 1er ex æquo, puis 3e).
     * Les étudiants sans moyenne générale restent avec un rang null (non classés).
     */
    public function calculerRangsEtEffectif(int $classeId, int $periodeId): void
    {
        $periode = PeriodeAcademique::findOrFail($periodeId);

        $inscriptions = Inscription::whereHas('niveaux', function ($q) use ($classeId) {
            $q->where('niveaux.id', $classeId);
        })
        ->where('annee_universitaire_id', $periode->annee_universitaire_id)
        ->pluck('id');

        $effectif = $inscriptions->count();

        $bulletins = Bulletin::whereIn('inscription_id', $inscriptions)
            ->where('periode_academique_id', $periodeId)
            ->get();

        // Séparation des bulletins avec moyenne calculée et sans moyenne
        $bulletinsAvecMoyenne = $bulletins->filter(fn($b) => $b->moyenne_generale !== null)
            ->sortByDesc('moyenne_generale')
            ->values();

        $bulletinsSansMoyenne = $bulletins->filter(fn($b) => $b->moyenne_generale === null);

        // Attribution du rang selon la règle de compétition
        $rangActuel = 1;
        $precedenteMoyenne = null;

        foreach ($bulletinsAvecMoyenne as $index => $bulletin) {
            if ($precedenteMoyenne !== null && (float) $bulletin->moyenne_generale < (float) $precedenteMoyenne) {
                $rangActuel = $index + 1;
            }

            $bulletin->update([
                'rang' => $rangActuel,
                'effectif_classe' => $effectif,
            ]);

            $precedenteMoyenne = $bulletin->moyenne_generale;
        }

        // Pour les bulletins sans moyenne
        foreach ($bulletinsSansMoyenne as $bulletin) {
            $bulletin->update([
                'rang' => null,
                'effectif_classe' => $effectif,
            ]);
        }
    }

    /**
     * Récupération purement en lecture des données des bulletins d'une classe pour l'API / UI.
     * Aucune écriture n'est effectuée ici.
     */
    public function getBulletinsData(int $classeId, int $periodeId): array
    {
        $classe = Niveau::findOrFail($classeId);
        $periode = PeriodeAcademique::findOrFail($periodeId);

        $inscriptions = Inscription::whereHas('niveaux', function ($q) use ($classeId) {
            $q->where('niveaux.id', $classeId);
        })
        ->where('annee_universitaire_id', $periode->annee_universitaire_id)
        ->with(['etudiant', 'niveaux'])
        ->get();

        if ($inscriptions->isEmpty()) {
            return [
                'stats' => [
                    'total_etudiants' => 0,
                    'total_admis' => 0,
                    'total_ajourne' => 0,
                    'moyenne_classe' => 0,
                ],
                'data' => [],
            ];
        }

        $enseignements = $this->getEnseignementsClasse($classeId, $periode->annee_universitaire_id);
        $inscriptionIds = $inscriptions->pluck('id')->toArray();

        // Récupération en bloc des moyennes et bulletins
        $moyennesParInscription = Moyenne::whereIn('inscription_id', $inscriptionIds)
            ->where('periode_academique_id', $periodeId)
            ->get()
            ->groupBy('inscription_id');

        $bulletinsParInscription = Bulletin::whereIn('inscription_id', $inscriptionIds)
            ->where('periode_academique_id', $periodeId)
            ->get()
            ->keyBy('inscription_id');

        $data = [];

        foreach ($inscriptions as $inscrit) {
            $bulletin = $bulletinsParInscription->get($inscrit->id);
            $etudiant = $inscrit->etudiant;

            $studentMoyennes = ($moyennesParInscription->get($inscrit->id) ?? collect())->keyBy('enseignement_id');
            $completude = $this->verifierCompletude($enseignements, $studentMoyennes);

            // Construction des lignes d'enseignement virtuelles à partir de `moyennes`
            $lignesEnseignement = $enseignements->map(function ($ens) use ($studentMoyennes, $classeId) {
                $moyenne = $studentMoyennes->get($ens->id);
                $coef = (float) ($ens->pivot->coefficient ?? 1);

                return [
                    'id' => $ens->id,
                    'cours_id' => $ens->cours_id,
                    'cours_nom' => $ens->cours?->nom,
                    'code' => $ens->cours?->code,
                    'type_enseignement' => $ens->cours?->type_enseignement,
                    'professeur_nom' => $ens->professeur?->nom_prenom ?? $ens->professeur?->nom,
                    'coefficient' => $coef,
                    'moyenne' => $moyenne?->valeur !== null ? (float) $moyenne->valeur : null,
                    'appreciation' => $moyenne?->appreciation ?? '',
                    'rang' => $moyenne?->rang,
                    'pivot' => [
                        'moyenne_generale_matiere' => $moyenne?->valeur,
                        'coefficient' => $coef,
                        'appreciation_professeur' => $moyenne?->appreciation ?? '',
                    ],
                ];
            });

            $data[] = [
                'id' => $bulletin?->id,
                'inscription_id' => $inscrit->id,
                'etudiant_ip' => $etudiant->ip,
                'nom' => $etudiant->nom,
                'prenom' => $etudiant->prenom,
                'moyenne_generale' => $bulletin?->moyenne_generale,
                'rang' => $bulletin?->rang ?? 'N/A',
                'mention' => $bulletin?->mention ?? 'Non évalué',
                'decision_jury' => $bulletin?->decision_jury ?? 'En attente',
                'statut' => $bulletin?->statut ?? 'BROUILLON',
                'effectif_classe' => $bulletin?->effectif_classe ?? $inscriptions->count(),
                'is_complet' => $completude['is_complet'],
                'matieres_manquantes' => $completude['matieres_manquantes'],
                'enseignements' => $lignesEnseignement,
            ];
        }

        // Tri par ordre alphabétique (Nom, puis Prénom)
        usort($data, function ($a, $b) {
            $compareNom = strcasecmp($a['nom'], $b['nom']);
            if ($compareNom !== 0) {
                return $compareNom;
            }
            return strcasecmp($a['prenom'], $b['prenom']);
        });

        // Calcul des statistiques de classe
        $totalValides = array_filter($data, fn($item) => $item['moyenne_generale'] !== null);
        $totalAdmis = count(array_filter($totalValides, fn($item) => (float) $item['moyenne_generale'] >= 10.0));
        $totalAjourne = count(array_filter($totalValides, fn($item) => (float) $item['moyenne_generale'] < 10.0));

        $moyenneClasse = count($totalValides) > 0
            ? round(array_sum(array_column($totalValides, 'moyenne_generale')) / count($totalValides), 2)
            : 0;

        return [
            'stats' => [
                'total_etudiants' => count($data),
                'total_admis' => $totalAdmis,
                'total_ajourne' => $totalAjourne,
                'moyenne_classe' => $moyenneClasse,
            ],
            'data' => $data,
        ];
    }

    /**
     * Méthode de compatibilité avec l'ancien nom de méthode pour les lectures.
     */
    public function getBulletins(int $classeId, int $periodeId): array
    {
        return $this->getBulletinsData($classeId, $periodeId);
    }

    /**
     * Valide officiellement un bulletin.
     * Un bulletin incomplet ne peut pas être validé.
     */
    public function validerBulletin(int $bulletinId): Bulletin
    {
        $bulletin = Bulletin::with(['inscription.niveaux', 'periodeAcademique'])->findOrFail($bulletinId);

        if ($bulletin->statut === 'PUBLIE') {
            throw new Exception("Ce bulletin est déjà publié.");
        }

        $classe = $bulletin->inscription->niveaux->first();
        if (!$classe) {
            throw new Exception("Classe introuvable pour ce bulletin.");
        }

        $enseignements = $this->getEnseignementsClasse($classe->id, $bulletin->periodeAcademique->annee_universitaire_id);
        $moyennes = Moyenne::where('inscription_id', $bulletin->inscription_id)
            ->where('periode_academique_id', $bulletin->periode_academique_id)
            ->get()
            ->keyBy('enseignement_id');

        $completude = $this->verifierCompletude($enseignements, $moyennes);
        if (!$completude['is_complet']) {
            throw new Exception("Le bulletin est incomplet (matières manquantes ou invalides) et ne peut pas être validé.");
        }

        $bulletin->update([
            'statut' => 'VALIDE',
        ]);

        return $bulletin->fresh();
    }

    /**
     * Publie officiellement un bulletin.
     * Un bulletin incomplet ne peut pas être publié.
     */
    public function publierBulletin(int $bulletinId): Bulletin
    {
        $bulletin = Bulletin::with(['inscription.niveaux', 'periodeAcademique'])->findOrFail($bulletinId);

        $classe = $bulletin->inscription->niveaux->first();
        if (!$classe) {
            throw new Exception("Classe introuvable pour ce bulletin.");
        }

        $enseignements = $this->getEnseignementsClasse($classe->id, $bulletin->periodeAcademique->annee_universitaire_id);
        $moyennes = Moyenne::where('inscription_id', $bulletin->inscription_id)
            ->where('periode_academique_id', $bulletin->periode_academique_id)
            ->get()
            ->keyBy('enseignement_id');

        $completude = $this->verifierCompletude($enseignements, $moyennes);
        if (!$completude['is_complet']) {
            throw new Exception("Le bulletin est incomplet et ne peut pas être publié.");
        }

        $bulletin->update([
            'statut' => 'PUBLIE',
        ]);

        return $bulletin->fresh();
    }

    /**
     * Télécharge ou génère le PDF du bulletin pour une inscription.
     */
    public function telechargerBulletinPdf(int $bulletinId)
    {
        $bulletin = Bulletin::with(['inscription.etudiant', 'inscription.niveaux', 'periodeAcademique'])
            ->findOrFail($bulletinId);

        $etudiant = $bulletin->inscription->etudiant;
        $periode = $bulletin->periodeAcademique;

        $filename = "Bulletin_{$etudiant->nom}_{$etudiant->prenom}_{$periode->libelle}";

        // Si le bulletin existe, n'a pas changé et le fichier est présent
        if ($bulletin->pdf_path && !$bulletin->is_changed && Storage::exists($bulletin->pdf_path)) {
            return Storage::response($bulletin->pdf_path, $filename);
        }

        // Génération du PDF
        $pdf = Pdf::loadView("bulletin.bulletin", [
            "bulletin" => $bulletin
        ]);

        $anneeId = $periode->annee_universitaire_id;
        $path = "bulletins/{$periode->libelle}-annee {$anneeId}/bulletin_{$bulletin->inscription_id}.pdf";
        Storage::put($path, $pdf->output());

        $bulletin->update([
            "is_changed" => false,
            "pdf_path" => $path
        ]);

        return Storage::response($path, $filename, [
            "Content-Type" => "application/pdf",
            "Content-Disposition" => "inline"
        ]);
    }
}
