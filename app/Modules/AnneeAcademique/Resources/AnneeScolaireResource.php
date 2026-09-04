<?php

namespace App\Modules\AnneeAcademique\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AnneeScolaireResource extends JsonResource
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
            "libelle" => $this->libelle,
            "date_debut" => $this->date_debut->format("d-m-Y"),
            "date_fin" => $this->date_fin->format("d-m-Y"),
        ];
    }
}
