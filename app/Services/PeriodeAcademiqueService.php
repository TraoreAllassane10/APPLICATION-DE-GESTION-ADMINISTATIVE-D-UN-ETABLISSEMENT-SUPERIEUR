<?php

namespace App\Services;

use App\Models\PeriodeAcademique;
use App\Repositories\PeriodeAcademiqueRepositories;

class PeriodeAcademiqueService
{
    public function __construct(
        protected PeriodeAcademiqueRepositories $periodeAcademiqueRepositories,
        protected AnneeAcademiqueService $anneeAcademiqueService
    ) {}

    public function all()
    {
        $anneActive = $this->anneeAcademiqueService->getAnneeActive();

        return $this->periodeAcademiqueRepositories->all($anneActive);
    }

    public function create(array $data)
    {
        $anneActive = $this->anneeAcademiqueService->getAnneeActive();

        $data['annee_universitaire_id'] = $anneActive->id;

        return $this->periodeAcademiqueRepositories->create($data);
    }

     public function update(PeriodeAcademique $periode, array $data)
    {
        return  $this->periodeAcademiqueRepositories->update($periode, $data);
    }

    public function delete(PeriodeAcademique $periode)
    {
        return $this->periodeAcademiqueRepositories->delete($periode);
    }
}
