<?php

namespace App\Modules\Cours\Services;

use App\Models\Cours;
use App\Modules\Cours\Repositories\CoursRepository;

class CoursService
{

    public function __construct(
        protected CoursRepository $coursRepository
    ) {}

    public function getAllCours()
    {
        return $this->coursRepository->all();
    }

    public function createCours(array $data)
    {
        return $this->coursRepository->create($data);
    }

    public function updateCours(Cours $cours, array $data)
    {
        return $this->coursRepository->update($cours, $data);
    }

    public function deleteCours(Cours $cours) {
        return $this->coursRepository->delete($cours);
    }
}
