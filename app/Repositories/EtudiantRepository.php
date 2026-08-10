<?php

namespace App\Repositories;

use App\Models\Etudiant;
use Illuminate\Http\Request;

class EtudiantRepository
{
    public function all(Request $request)
    {
        $query = Etudiant::query();

        $query->when($request->search, function ($q) use ($request) {
            $q->where(function ($q) use ($request) {
                $q->where('nom', 'like', '%' . $request->search . '%')
                    ->orWhere('prenom', 'like', '%' . $request->search . '%')
                    ->orWhere('ip', 'like', '%' . $request->search . '%');
            });
        });

        $query->when($request->genre, function ($q) use ($request) {
            if ($request->genre !== "all") {
                $q->where("genre", $request->genre);
            }
        });

        $query->when($request->statut, function ($q) use ($request) {
            if ($request->statut !== "all") {
                $q->where("statut", $request->statut);
            }
        });

        return $query->latest()->paginate(20)->withQueryString();
    }

    public function find(string $etudiant)
    {
        return Etudiant::find($etudiant);
    }

    public function findByIp(string $ip)
    {
        return Etudiant::where("ip", $ip)->first();
    }

    public function create(array $data)
    {
        return Etudiant::create([
            "ip" => $data['ip'],
            "civilite" => $data['civilite'],
            "genre" => $data['genre'],
            "nom" => $data['nom'],
            "prenom" => $data['prenom'],
            "date_naissance" => $data['date_naissance'],
            "lieu_naissance" => $data['lieu_naissance'],
            "nationnalite" => $data['nationnalite'],
            "statut" => $data['statut'],
            "photo" => $data['photo'] ?? null,

            "email" => $data['email'] ?? null,
            "contacts" => $data['contacts'] ?? null,
            "pays_residence" => $data['pays_residence'] ?? null,
            "etablissement_origine" => $data['etablissement_origine'] ?? null,
            "annee_obtention_bac" => $data['annee_obtention_bac'] ?? null,
            "serie_bac" => $data['serie_bac'] ?? null,
            "numero_table_bac" => $data['numero_table_bac'] ?? null,
            "nature_piece" => $data['nature_piece'] ?? null,
            "numero_piece" => $data['numero_piece'] ?? null,
            "adresse_geographique" => $data['adresse_geographique'] ?? null,
            "matricule_secondaire" => $data['matricule_secondaire'] ?? null,
            "type_responsable" => $data['type_responsable'] ?? null,
            "nom_responsable" => $data['nom_responsable'] ?? null,
            "numero_responsable" => $data['numero_responsable'] ?? null,
            "profession_responsable" => $data['profession_responsable'] ?? null,


        ]);
    }

    public function update(Etudiant $etudiant, array $data)
    {
        return  $etudiant->update([
            "ip" => $data['ip'],
            "civilite" => $data['civilite'],
            "genre" => $data['genre'],
            "nom" => $data['nom'],
            "prenom" => $data['prenom'],
            "date_naissance" => $data['date_naissance'],
            "lieu_naissance" => $data['lieu_naissance'],
            "nationnalite" => $data['nationnalite'],
            "statut" => $data['statut'],
            "photo" => $data['photo'] ?? null,

            "email" => $data['email'] ?? null,
            "contacts" => $data['contacts'] ?? null,
            "pays_residence" => $data['pays_residence'] ?? null,
            "etablissement_origine" => $data['etablissement_origine'] ?? null,
            "annee_obtention_bac" => $data['annee_obtention_bac'] ?? null,
            "serie_bac" => $data['serie_bac'] ?? null,
            "numero_table_bac" => $data['numero_table_bac'] ?? null,
            "nature_piece" => $data['nature_piece'] ?? null,
            "numero_piece" => $data['numero_piece'] ?? null,
            "adresse_geographique" => $data['adresse_geographique'] ?? null,
            "matricule_secondaire" => $data['matricule_secondaire'] ?? null,
            "type_responsable" => $data['type_responsable'] ?? null,
            "nom_responsable" => $data['nom_responsable'] ?? null,
            "numero_responsable" => $data['numero_responsable'] ?? null,
            "profession_responsable" => $data['profession_responsable'] ?? null,
        ]);
    }

    public function delete(Etudiant $etudiant)
    {
        return $etudiant->delete();
    }

    public function totalEtudiant()
    {
        return Etudiant::count();
    }

    public function totalEtudiantParStatut(string $statut)
    {
        return Etudiant::where("statut", $statut)->count();
    }
}
