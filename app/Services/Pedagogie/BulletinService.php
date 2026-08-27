<?php

namespace App\Services\Pedagogie;

use App\Models\PeriodeAcademique;
use App\Repositories\Pedagogie\BulletinRepository;

class BulletinService
{

    public function __construct(
        protected BulletinRepository $bulletinRepository
    )
    {}

    public function getBulletins() {
        $periode = PeriodeAcademique::latest()->first();
        return $this->bulletinRepository->all($periode->id);
    }
}
