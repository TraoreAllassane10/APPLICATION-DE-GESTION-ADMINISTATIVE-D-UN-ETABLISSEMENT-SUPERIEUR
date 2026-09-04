<?php

namespace App\Modules\Niveau\Repositories;

use App\Models\Etudiant;
use App\Models\Niveau;
use App\Models\Paiement;
use App\Modules\AnneeAcademique\Repositories\AnneeAcademiqueRepository;

class NiveauRepository
{
    public function __construct(protected AnneeAcademiqueRepository $anneeAcademiqueRepository) {}

    public function all()
    {
        $anneeActive = $this->anneeAcademiqueRepository->anneeActive();

        $niveaux = Niveau::withCount(['inscriptions' => function ($query) use ($anneeActive) {
            $query->where('annee_universitaire_id', $anneeActive->id);
        }])
            ->withSum(['inscriptions' => function ($query) use ($anneeActive) {
                $query->where('annee_universitaire_id', $anneeActive->id);
            }], 'montant_total')
            ->addSelect([
                'paiements_sum_montant' => Paiement::selectRaw('coalesce(sum(paiements.montant), 0)')
                    ->whereIn('paiements.inscription_id', function ($query) use ($anneeActive) {
                        $query->select('inscription_id')
                            ->from('inscription_niveau')
                            ->whereColumn('inscription_niveau.niveau_id', 'niveaux.id')
                            ->whereIn('inscription_id', function ($subQuery) use ($anneeActive) {
                                $subQuery->select('id')
                                    ->from('inscriptions')
                                    ->where('annee_universitaire_id', $anneeActive->id);
                            });
                    })
            ])
            ->latest()->get();

        return $niveaux;
    }

    public function find(string $niveauId)
    {
        return Niveau::find($niveauId);
    }

    public function create(array $data)
    {
        return Niveau::create($data);
    }

    public function update(Niveau $niveau, array $data)
    {
        return $niveau->update($data);
    }

    public function delete(Niveau $niveau)
    {
        return $niveau->delete();
    }

    public function ListeDeClasse(string $anneeId, string $niveauId)
    {
        return Etudiant::whereHas("inscriptions", function ($query) use ($niveauId, $anneeId) {
            return $query->where("annee_universitaire_id", $anneeId)->whereHas("niveaux", function ($query) use ($niveauId) {
                return $query->whereIn("niveau_id", [$niveauId]);
            });
        })
            ->orderBy("nom")
            ->orderBy("prenom")
            ->get();
    }
}
