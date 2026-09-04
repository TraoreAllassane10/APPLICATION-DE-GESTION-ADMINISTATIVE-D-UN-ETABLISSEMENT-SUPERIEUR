<?php

namespace App\Modules\Filiere\Services;

use App\Models\Filiere;
use App\Modules\Filiere\Repositories\FiliereRepository;

class FiliereService
{
    public function __construct(
        protected FiliereRepository $filiereRepository
    ) {}

    public function getAllFilieres()
    {
        return $this->filiereRepository->all();
    }

    public function createFiliere(array $data)
    {
        return $this->filiereRepository->create($data);
    }

    public function updateFiliere(Filiere $filiere, array $data)
    {
        return $this->filiereRepository->update($filiere, $data);
    }

    public function deleteFiliere(Filiere $filiere) {
        return $this->filiereRepository->delete($filiere);
    }
}
