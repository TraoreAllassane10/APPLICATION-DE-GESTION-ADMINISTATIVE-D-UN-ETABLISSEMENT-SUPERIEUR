<?php

namespace App\Modules\Moyenne\Listeners;

use App\Models\Bulletin;
use App\Models\Enseignement;
use App\Models\Niveau;
use App\Modules\Evaluation\Events\EvaluationNoteUpdated;
use App\Modules\Evaluation\Events\EvaluationUpdated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class UpdateMoyenneEnseignement
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(EvaluationUpdated|EvaluationNoteUpdated $event): void
    {

        // Recuperer Ids de l'enseignement et de l'evaluation
        $enseignementId = $event->evaluation->enseignement->id;
        $periodeAcademiqueId = $event->evaluation->periode_academique->id;

        // Recuperer les classes de l'enseignement
        $classes = $event->evaluation->enseignement->niveaux()->get();

        // Recupere les inscrits de chaque classe
        foreach ($classes as $classe) {
            $niveau = Niveau::where('id', $classe->id)->first();

            $inscriptions = $niveau->inscriptions()->get();

            // 
            foreach ($inscriptions as $inscrit) {
                // Recupere le bulletin de l'etudiant
                $bulletin = Bulletin::where("inscription_id", $inscrit->id)
                    ->where('periode_academique_id', $periodeAcademiqueId)
                    ->first();

                // Creer le bulletin s'il n'existe pas
                if (!$bulletin) {
                    $bulletin =  Bulletin::create([
                        "inscription_id" => $inscrit->id,
                        "periode_academique_id" => $periodeAcademiqueId
                    ]);
                }

                // Recupere l'enseignement
                $enseignement = Enseignement::find($enseignementId);

                // Recupere toutes les evaluations de l'enseignement
                $toutesEvaluationsEnseignement = $enseignement->evaluations()
                    ->where('periode_academique_id', $periodeAcademiqueId)
                    ->get();

                // Calcule de la note total de l'etudiant
                $totalGenerale = 0;
                $diviseur = 0;
                foreach ($toutesEvaluationsEnseignement as $evaluation) {
                    $noteEtudiant = $evaluation->notes()
                        ->where('inscription_id', $inscrit->id)
                        ->first();

                    $totalGenerale += $noteEtudiant->valeur ?? 0;

                    if ($noteEtudiant->valeur) {
                        // Calculer le diviseur
                        if ($evaluation->note_maximale === 10) {
                            // Si la note porte sur 10 , il faut ajouter 0.5 au diviseur car c'est la note qui porte sur 
                            // 20 qui est divisée par 1
                            if ($evaluation->coefficient === 1) {
                                $diviseur += 0.5;
                            } else {
                                $diviseur += 0.5 * $evaluation->coefficient;
                            }
                        } else {
                            $diviseur += $evaluation->coefficient;
                        }
                    }
                }

                // Calcule de la moyenne
                $moyenne = $diviseur > 0 ? $totalGenerale / $diviseur : null;

                // Enregistrement de la moyenne de l'etudiant pour l'enseignement
                $ancienneMoyenneExiste = $bulletin->enseignements()->where('enseignement_id', $enseignementId)->exists();

                if ($ancienneMoyenneExiste) {
                    $bulletin->enseignements()->detach($enseignementId);
                }

                $bulletin->enseignements()->attach($enseignementId, [
                    "moyenne_generale_matiere" => $moyenne ?? null,
                ]);
            }
        }
    }
}
