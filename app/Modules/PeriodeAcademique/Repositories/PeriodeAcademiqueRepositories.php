<?php

namespace App\Modules\PeriodeAcademique\Repositories;

use App\Models\PeriodeAcademique;
use Carbon\Carbon;

class PeriodeAcademiqueRepositories
{
    public function all(mixed $annee)
    {
        return PeriodeAcademique::where('annee_universitaire_id', $annee->id)
            ->orderByDesc("date_fin")
            ->get();
    }

    public function create(array $data)
    {
        return PeriodeAcademique::create([
            "libelle" => $data["libelle"],
            "date_debut" => Carbon::parse($data["date_debut"])->format('Y-m-d'),
            "date_fin" => Carbon::parse($data["date_fin"])->format('Y-m-d'),
            "annee_universitaire_id" => $data['annee_universitaire_id']
        ]);
    }

    public function update(PeriodeAcademique $periode, array $data)
    {
        return  $periode->update([
            "libelle" => $data["libelle"],
            "date_debut" => Carbon::parse($data["date_debut"])->format('Y-m-d'),
            "date_fin" => Carbon::parse($data["date_fin"])->format('Y-m-d'),
            "annee_universitaire_id" => $periode->annee_universitaire_id
        ]);
    }

    public function delete(PeriodeAcademique $periode)
    {
        return $periode->delete();
    }
}
