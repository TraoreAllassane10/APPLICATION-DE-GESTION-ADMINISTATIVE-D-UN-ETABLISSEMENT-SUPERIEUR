<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Professeur extends Model
{
    /** @use HasFactory<\Database\Factories\ProfesseurFactory> */
    use HasFactory;

    protected $fillable = ["matricule", "nom_prenom", "sexe", "date_naissance", "pays", "specialite", "telephone"];

    public function anneeAcademiques()
    {
        return $this->belongsToMany(AnneeUniversitaire::class, "annee_professeurs")
            ->withPivot("diplome", "grade", "statut", "annee_prise_fonction", "formation_continue", "nombre_heure_cours_prevue", "nombre_heure_cours_realise");
    }

    public function enseignements()
    {
        return $this->hasMany(Enseignement::class);
    }
}
