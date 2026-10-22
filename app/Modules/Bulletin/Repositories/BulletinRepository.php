<?php

namespace App\Modules\Bulletin\Repositories;

use App\Models\Bulletin;
use Illuminate\Database\Eloquent\Collection;

class BulletinRepository
{
    public function find(int $inscriptionId, int $periodeAcademiqueId): ?Bulletin
    {
        return Bulletin::where('periode_academique_id', $periodeAcademiqueId)
            ->where('inscription_id', $inscriptionId)
            ->first();
    }

    public function findById(int $bulletinId): ?Bulletin
    {
        return Bulletin::find($bulletinId);
    }

    public function findOrCreate(int $inscriptionId, int $periodeAcademiqueId): Bulletin
    {
        return Bulletin::firstOrCreate(
            [
                'inscription_id' => $inscriptionId,
                'periode_academique_id' => $periodeAcademiqueId,
            ],
            [
                'statut' => 'BROUILLON',
                'is_changed' => true,
            ]
        );
    }

    public function getByInscriptionsAndPeriode(array $inscriptionIds, int $periodeAcademiqueId): Collection
    {
        return Bulletin::where('periode_academique_id', $periodeAcademiqueId)
            ->whereIn('inscription_id', $inscriptionIds)
            ->get();
    }
}
