<?php

namespace App\Services\Pedagogie;

use App\Models\Niveau;
use App\Models\PeriodeAcademique;
use App\Repositories\Pedagogie\BulletinRepository;
use Exception;
use Illuminate\Support\Facades\Log;

class BulletinService
{

    public function __construct(
        protected BulletinRepository $bulletinRepository
    ) {}

    public function getBulletins(int $classeId, int $periodeId)
    {
        $data = [];

        $niveau = Niveau::with('inscriptions')
            ->where('id', $classeId)
            ->first();

        foreach ($niveau->inscriptions as $inscrit) {
            // Recuperation du bulletin de l'etudiant durant la periode academique selectionnée
            $bulletin = $this->bulletinRepository->find($inscrit->id, $periodeId);

            if (!$bulletin) {
                throw new Exception("Aucune evaluation enregistrée pour cette classe");
            }

            // Calculer le total des moyennes en multipliant la moyenne obtenue dans le cours et le coefficient du cours
            $totalMoyenne = 0;
            foreach($bulletin->enseignements as $enseignement) {
                $moyenneMatiere = (float) $enseignement->pivot->moyenne_generale_matiere;
                $coefficient = (float) $enseignement->coefficient;

                $totalMoyenne += $moyenneMatiere * $coefficient;
            }

            // Calcul du denominateur
            $diviseur = $bulletin->enseignements()->sum("enseignements.coefficient");

            // Calcul de la moyenne
            $moyenne_generale = $diviseur > 0 ? round($totalMoyenne / $diviseur, 2) : null;

            // Détermination de la mention et de la décision
            $mention = $this->determinerMention($moyenne_generale);
            $decisionJury = $moyenne_generale !== null ? ($moyenne_generale >= 10 ? 'Admis' : 'Ajourné') : 'N/A';

            // Mise à jour de la moyenne générale
            $bulletin->update([
                "moyenne_generale" => $moyenne_generale,
                "mention"          => $mention,
                "decision_jury"    => $decisionJury,
            ]);

            $data[] = [
                "id" => $bulletin->id,
                "etudiant_ip" => $bulletin->inscription->etudiant->ip,
                "nom" => $bulletin->inscription->etudiant->nom,
                "prenom" => $bulletin->inscription->etudiant->prenom,
                "moyenne_generale" => $bulletin->moyenne_generale,
                "rang" => $bulletin->rang,
                "mention" => $bulletin->mention,
                "decision_jury" => $bulletin->decision_jury,
                "enseignements" => $bulletin->enseignements()->get(),
            ];
        }

        // Trier les étudiants par moyenne DESC
        usort($data, function ($a, $b) {
            if ($a['moyenne_generale'] === $b['moyenne_generale']) {
                return 0;
            }

            if ($a['moyenne_generale'] === null) return 1;
            if ($b['moyenne_generale'] === null) return -1;

            return ($a['moyenne_generale'] > $b['moyenne_generale']) ? -1 : 1;
        });

        // Calculer les rangs
        $rangActuel = 1;
        $precedentMoyenne = null;

        foreach ($data as $index => &$etudiant) {
            if ($etudiant['moyenne_generale'] === null) {
                $etudiant['rang'] = 'N/A';
                continue;
            }

            if ($precedentMoyenne !== null && $etudiant['moyenne_generale'] < $precedentMoyenne) {
                $rangActuel = $index + 1;
            }


            $bulletinEtudiant = $this->bulletinRepository->findById($etudiant['id']);

            if (!$bulletinEtudiant) {
                throw new Exception("Bulletin introuvable");
            }

            $bulletinEtudiant->update([
                "rang" => $rangActuel,
                "effectif_classe" => $niveau->inscriptions()->count()
            ]);

            $etudiant['rang'] = $rangActuel;
            $precedentMoyenne = $etudiant['moyenne_generale'];
        }

        unset($etudiant);

        // Tri final de la liste par Ordre Alphabétique (Nom, puis Prénom)
        usort($data, function ($a, $b) {
            // Comparaison des noms sans tenir compte de la casse
            $compareNom = strcasecmp($a['nom'], $b['nom']);
            if ($compareNom !== 0) {
                return $compareNom;
            }

            // Si les noms sont identiques, on compare les prénoms
            return strcasecmp($a['prenom'], $b['prenom']);
        });

        // Calcul des statistiques
        $tableau_admis = array_filter($data, fn($item) => $item['moyenne_generale'] !== null && $item['moyenne_generale'] >= 10);
        $tableau_ajourne = array_filter($data, fn($item) => $item['moyenne_generale'] !== null && $item['moyenne_generale'] < 10);

        $totalValide = count(array_filter($data, fn($item) => $item['moyenne_generale'] !== null));
        $moyenne_classe = $totalValide > 0 
            ? round(array_sum(array_column($data, 'moyenne_generale')) / $totalValide, 2) 
            : 0;

        return [
            "stats" => [
                "total_etudiants" => count($data),
                "total_admis" => count($tableau_admis),
                "total_ajourne" => count($tableau_ajourne),
                "moyenne_classe" => $moyenne_classe
            ],
            "data" => $data
        ];
    }

    private function determinerMention(?float $moyenne): string
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
}
