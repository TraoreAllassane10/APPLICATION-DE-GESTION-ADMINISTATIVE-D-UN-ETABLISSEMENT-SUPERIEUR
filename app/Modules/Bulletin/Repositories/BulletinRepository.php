<?php

namespace App\Modules\Bulletin\Repositories;

use App\Models\Bulletin;

class BulletinRepository
{
    public function find(int $inscriptionId, int $periodeAcademiqueId)
    {
        return Bulletin::where('periode_academique_id', $periodeAcademiqueId)
            ->where('inscription_id', $inscriptionId)
            ->first();
    }

    public function findById(int $bulletinId) {
        return Bulletin::find($bulletinId);
    }
}
