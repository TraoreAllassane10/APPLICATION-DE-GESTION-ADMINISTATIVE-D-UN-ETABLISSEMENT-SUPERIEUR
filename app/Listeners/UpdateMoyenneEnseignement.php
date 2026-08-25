<?php

namespace App\Listeners;

use App\Events\EvaluationNoteUpdated;
use App\Models\Bulletin;
use App\Models\Enseignement;
use App\Models\Niveau;
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
    public function handle(EvaluationNoteUpdated $event): void
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
                foreach ($toutesEvaluationsEnseignement as $evaluation) {
                    $noteEtudiant = $evaluation->notes()
                        ->where('inscription_id', $inscrit->id)
                        ->first();

                    $totalGenerale += $noteEtudiant->valeur ?? 0;
                }

                // Total des coefficient des evaluations de l'enseignement
                $totalCoefficient = $toutesEvaluationsEnseignement->sum('coefficient');

                // Calcule de la moyenne
                $moyenne = $totalGenerale / $totalCoefficient;

                // Enregistrement de la moyenne de l'etudiant pour l'enseignement
                $ancienneMoyenneExiste = $bulletin->enseigenments()->where('enseignement_id', $enseignementId)->exists();

                if ($ancienneMoyenneExiste) {
                    $bulletin->enseigenments()->detach($enseignementId);
                }

                $bulletin->enseigenments()->attach($enseignementId, [
                    "moyenne_generale_matiere" => $moyenne,
                ]);

            }
        }
    }
}
