<?php

namespace App\Modules\Filiere\Services;

use App\Models\Filiere;
use App\Modules\Filiere\Repositories\FiliereRepository;
use Illuminate\Support\Facades\Cache;

class FiliereService
{
    public function __construct(
        protected FiliereRepository $filiereRepository
    ) {}

    public function getAllFilieres()
    {
        return Cache::remember(
            'filiere::all',
            3600,
            function () {
                return $this->filiereRepository->all();
            }
        );
    }

    public function createFiliere(array $data)
    {
        $filiere = $this->filiereRepository->create($data);

        Cache::forget('filiere::all');

        // Vider le cache de statistique
        Cache::forget('dashboard:stats');

        return $filiere;
    }

    public function updateFiliere(Filiere $filiere, array $data)
    {
        $filiereModifiee = $this->filiereRepository->update($filiere, $data);

        Cache::forget('filiere::all');

        return $filiereModifiee;
    }

    public function deleteFiliere(Filiere $filiere)
    {
        $filiereSupprimee = $this->filiereRepository->delete($filiere);

        Cache::forget('filiere::all');

        // Vider le cache de statistique
        Cache::forget('dashboard:stats');

        return $filiereSupprimee;
    }
}
