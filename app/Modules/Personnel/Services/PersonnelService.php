<?php

namespace App\Modules\Personnel\Services;

use App\Models\Entreprise\Personnel;
use App\Modules\Personnel\Repositories\PersonnelRepository;


class PersonnelService
{

    public function __construct(
        protected PersonnelRepository $personnelRepository
    ) {}

    public function getPersonnels() {
        return $this->personnelRepository->all();
    }

    public function getPersonnel(Personnel $personnel) {
        return $this->personnelRepository->find($personnel);
    }

    public function createPersonnel(array $data) {
        return $this->personnelRepository->create($data);
    }

    public function updatePersonnel(Personnel $personnel, array $data) {
        return $this->personnelRepository->update($personnel, $data);
    }

    public function deletePersonnel(Personnel $personnel) {
          return $this->personnelRepository->delete($personnel);
    }
}
