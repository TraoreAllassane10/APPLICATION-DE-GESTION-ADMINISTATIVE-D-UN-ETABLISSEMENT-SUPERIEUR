<?php

namespace App\Services\Pedagogie;

use App\Models\Niveau;
use App\Models\PeriodeAcademique;
use App\Repositories\Pedagogie\BulletinRepository;
use Exception;

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

            // Calculer le total des moyennes
            $totalMoyenne = (float) $bulletin->enseignements()->sum('bulletin_lignes.moyenne_generale_matiere');

            // Calcul du denominateur
            $diviseur = $bulletin->enseignements()->sum("enseignements.coefficient");
            
            // Calcul de la moyenne
            $moyenne_generale = $diviseur > 0 ? round($totalMoyenne / $diviseur, 2) : null;

            // Mise à jour de la moyenne générale
            $bulletin->update([
                "moyenne_generale" => $moyenne_generale
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
                "enseignements" => $bulletin->enseignements()->get()
            ];
        }

        return $data;
    }
}
