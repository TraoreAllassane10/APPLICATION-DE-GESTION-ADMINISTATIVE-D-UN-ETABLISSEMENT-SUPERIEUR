<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NiveauResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "nom" => $this->nom,
            "filiere" => $this->whenLoaded("filiere"),
            "nombre_etudiant" => $this->inscriptions_count,
            "scolarite_attendue" => (int) $this->inscriptions_sum_montant_total,
            "montant_total_paye" => (int) $this->paiements_sum_montant
        ];
    }
}
