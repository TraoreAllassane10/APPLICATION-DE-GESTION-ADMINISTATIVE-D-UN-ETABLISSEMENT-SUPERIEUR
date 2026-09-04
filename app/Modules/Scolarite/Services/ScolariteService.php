<?php

namespace App\Modules\Scolarite\Services;

use App\Models\Scolarite;
use App\Modules\Scolarite\Repositories\ScolariteRepository;
use Exception;

class ScolariteService
{
    public function __construct(
        protected ScolariteRepository $scolariteRepository
    ) {}

    public function getAllScolarites()
    {
        return $this->scolariteRepository->all();
    }

    public function createScolarite(array $data)
    {
        try {
            $scolariteExiste = $this->scolariteRepository->scolariteExiste($data['niveau_id'], $data['type']);

            if ($scolariteExiste) {
                return response()->json([
                    "success" => false,
                    "message" => "La classe selectionnée à déjà une scolarité pour les ". $data['type']
                ]);
            }

            //Creation d'une scolarite
            $scolariteCreee = $this->scolariteRepository->create($data);

            if ($scolariteCreee) {
                return response()->json(["success" => true]);
            }
        } catch (Exception $e) {
            return response()->json(["message" => $e->getMessage()]);
        }
    }

    public function updateScolarite(Scolarite $scolarite, array $data)
    {
        return $this->scolariteRepository->update($scolarite, $data);
    }

    public function deleteScolarite(Scolarite $scolarite) {
        return $this->scolariteRepository->delete($scolarite);
    }
}
