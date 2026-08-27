<?php

namespace App\Repositories\Pedagogie;

use App\Models\Bulletin;

class BulletinRepository
{

    public function all(int $periodeAcademiqueId)
    {
        return Bulletin::where('periode_academique_id', $periodeAcademiqueId)->get();
    }
}
