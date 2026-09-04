<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enseignement extends Model
{
    /** @use HasFactory<\Database\Factories\EnseignementFactory> */
    use HasFactory;

    protected $guarded = [];
    protected $with = ["cours", "niveaux", "professeur"];

    public function professeur()
    {
        return $this->belongsTo(Professeur::class);
    }

    public function cours()
    {
        return $this->belongsTo(Cours::class);
    }

    public function annee_universitaire()
    {
        return $this->belongsTo(AnneeUniversitaire::class);
    }

    public function niveaux()
    {
        return $this->belongsToMany(Niveau::class, "enseignement_classe")
            ->withPivot('coefficient');
    }

    public function evaluations()
    {
        return $this->hasMany(Evaluation::class);
    }

    public function bulletins()
    {
        return $this->belongsToMany(Bulletin::class, 'bulletin_lignes')
            ->withPivot(["moyenne_generale_matiere", "coefficient", "appreciation_professeur"]);
    }
}
