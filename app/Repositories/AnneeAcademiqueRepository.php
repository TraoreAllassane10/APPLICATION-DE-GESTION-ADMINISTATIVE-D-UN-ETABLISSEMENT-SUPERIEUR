<?php

namespace App\Repositories;

use App\Models\AnneeUniversitaire;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class AnneeAcademiqueRepository
{
    public function all()
    {
        return AnneeUniversitaire::orderByDesc("date_fin")->get();
    }

    public function create(array $data)
    {
        return AnneeUniversitaire::create([
            "libelle" => $data["libelle"],
            "date_debut" => Carbon::parse($data["date_debut"])->format('Y-m-d'),
            "date_fin" => Carbon::parse($data["date_fin"])->format('Y-m-d'),
        ]);
    }

    public function update(AnneeUniversitaire $annee, array $data)
    {
        return  $annee->update([
            "libelle" => $data["libelle"],
            "date_debut" => Carbon::parse($data["date_debut"])->format('Y-m-d'),
            "date_fin" => Carbon::parse($data["date_fin"])->format('Y-m-d'),
        ]);
    }

    public function delete(AnneeUniversitaire $annee)
    {
        return $annee->delete();
    }

    public function anneeActive()
    {
        $user = Auth::user();
        $derniereAnneeId = AnneeUniversitaire::latest()->first()->id;

        if($user->annee_active === null)
        {
            $user->update([
                "annee_active" => $derniereAnneeId ?? null
            ]);
        }

        return AnneeUniversitaire::where("id", $user->annee_active)->first();
    }
}
