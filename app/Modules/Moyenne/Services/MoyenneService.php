<?php

namespace App\Modules\Moyenne\Services;

use App\Models\Moyenne;
use App\Models\Niveau;
use Exception;
use Illuminate\Support\Facades\Log;

class MoyenneService
{
    public function getMoyennes(int $classeId, int $enseignementId, int $periodeId)
    {
        $data = [];
        // Récupere l'enseignement sélectionné
        $niveau = Niveau::with('inscriptions')
            ->where('id', $classeId)
            ->first();

        // Récupere l'enseignement sélectionné
        $enseignement = $niveau->enseignements()
            ->where('enseignement_id', $enseignementId)
            ->with(['evaluations' => function ($q) use ($periodeId) {
                $q->with('notes')->where('periode_academique_id', $periodeId);
            }])
            ->first();

        if (!$enseignement) {
            throw new Exception('Aucun cours associé a cette classe !');
        }

        // Calcule la moyenne de chaque etudiant
        foreach ($niveau->inscriptions as $inscrit) {
            $evaluations = [];
            $totalNote = 0;
            $diviseur = 0;

            // Parcourir les evaluations de l'enseignement
            foreach ($enseignement->evaluations as $evaluation) {
                $noteObj = $evaluation->notes->firstWhere('inscription_id', $inscrit->id);
                $valeurNote = $noteObj?->valeur ?  $noteObj->valeur : null;

                $note = null;
                if ($valeurNote) {
                    if ($evaluation->coefficient > 0) {
                        $note = $valeurNote / $evaluation->coefficient;
                    }
                }

                $evaluations[] = [
                    "id" => $evaluation->id,
                    "note" => $note,
                    "note_maximale" => $evaluation->note_maximale,
                    "coefficient" => $evaluation->coefficient
                ];


                // Calculer le total des notes d'un etudiant (note x coefficient de l'evaluation)
                // La valeur enregistrée dans la bd est déjà multipliée par le coefficient
                $totalNote += $valeurNote ?? 0;

                if ($valeurNote) {
                    // Calculer le diviseur
                    if ($evaluation->note_maximale === 10) {
                        $diviseur += ($evaluation->coefficient === 1) ? 0.5 : 0.5 * $evaluation->coefficient;
                    } else {
                        $diviseur += $evaluation->coefficient;
                    }
                }
            }

            // Recupere la moyenne de l'etudiant dans la table moyennes
            $moyenne = Moyenne::where('inscription_id', $inscrit->id)
                ->where('enseignement_id', $enseignementId)
                ->where('periode_academique_id', $periodeId)
                ->first();

            $data[] = [
                "id" => $inscrit->etudiant->ip,
                "inscription_id" => $inscrit->id,
                "nom" => $inscrit->etudiant->nom,
                "prenom" => $inscrit->etudiant->prenom,
                "evaluations" => $evaluations,
                "total_notes" => $totalNote,
                "diviseur" => $diviseur,
                "moyenne_id" => $moyenne->id,
                "moyenne" => (float) $moyenne->valeur,
                "appreciation" => $moyenne->appreciation,
                "rang" => null,
            ];
        }


        // ==================CALCULE DES RANGS=========================

        // Trier les étudiants par moyenne DESC
        usort($data, function ($a, $b) {
            if ($a['moyenne'] === $b['moyenne']) {
                return 0;
            }

            if ($a['moyenne'] === null) return 1;
            if ($b['moyenne'] === null) return -1;

            return ($a['moyenne'] > $b['moyenne']) ? -1 : 1;
        });


        // Calculer le rang (gestion égalités)
        $rangActuel = 1;
        $precedentMoyenne = null;

        foreach ($data as $index => &$etudiant) {
            if ($etudiant['moyenne'] === null) {
                $etudiant['rang'] = 'N/A';
                continue;
            }

            if ($precedentMoyenne !== null && $etudiant['moyenne'] < $precedentMoyenne) {
                $rangActuel = $index + 1;
            }

            $etudiant['rang'] = $rangActuel;
            $precedentMoyenne = $etudiant['moyenne'];

            // Mise à jour du rang de l'etudiant
            $moyenne = Moyenne::where('inscription_id', $etudiant['inscription_id'])
                ->where('enseignement_id', $enseignementId)
                ->where('periode_academique_id', $periodeId)
                ->first();

            $moyenne->rang = $etudiant['rang'];
            $moyenne->save();
        }

        unset($etudiant); //Sécurité pour libérer la référence PHP


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


        // Coefficient de l'enseignement dans la classe selectionnée
        $coefficient = $enseignement->pivot->coefficient;

        return [
            "data" => $data,
            "coefficient" => $coefficient
        ];
    }
}
