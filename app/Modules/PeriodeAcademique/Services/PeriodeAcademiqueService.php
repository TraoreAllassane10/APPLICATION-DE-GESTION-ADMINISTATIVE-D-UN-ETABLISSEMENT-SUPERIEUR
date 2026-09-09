<?php

namespace App\Modules\PeriodeAcademique\Services;

use App\Models\PeriodeAcademique;
use App\Modules\AnneeAcademique\Services\AnneeAcademiqueService;
use App\Modules\PeriodeAcademique\Repositories\PeriodeAcademiqueRepositories;
use Illuminate\Support\Facades\Cache;

class PeriodeAcademiqueService
{
    public function __construct(
        protected PeriodeAcademiqueRepositories $periodeAcademiqueRepositories,
        protected AnneeAcademiqueService $anneeAcademiqueService
    ) {}

    public function all()
    {
        $anneActive = $this->anneeAcademiqueService->getAnneeActive();

        $periodes = Cache::remember(
            'periodes_academiques:all',
            3600,
            function () use ($anneActive) {
                return $this->periodeAcademiqueRepositories->all($anneActive);
            }
        );

        return $periodes;
    }

    public function create(array $data)
    {
        $anneActive = $this->anneeAcademiqueService->getAnneeActive();

        $data['annee_universitaire_id'] = $anneActive->id;

        $periode = $this->periodeAcademiqueRepositories->create($data);

        Cache::forget('periodes_academiques:all');

        return $periode;
    }

    public function update(PeriodeAcademique $periodeModifiee, array $data)
    {
        $periodeModifiee = $this->periodeAcademiqueRepositories->update($periodeModifiee, $data);

        Cache::forget('periodes_academiques:all');

        return $periodeModifiee;
    }

    public function delete(PeriodeAcademique $periode)
    {
        $periodeSupprimee = $this->periodeAcademiqueRepositories->delete($periode);

        Cache::forget('periodes_academiques:all');

        return $periodeSupprimee;
    }
}
