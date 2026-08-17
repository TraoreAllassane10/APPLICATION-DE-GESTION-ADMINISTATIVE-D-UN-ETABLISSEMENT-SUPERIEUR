<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Niveau extends Model
{
    /** @use HasFactory<\Database\Factories\NiveauFactory> */
    use HasFactory;

    protected $fillable = ["nom", "filiere_id"];

    protected $with = ['filiere'];

    public function filiere()
    {
        return $this->belongsTo(Filiere::class);
    }

    public function scolarites() {
        return $this->hasMany(Scolarite::class);
    }

    public function inscriptions()
    {
        return $this->belongsToMany(Inscription::class, "inscription_niveau");
    }

    public function enseignements()
    {
        return $this->belongsToMany(Enseignement::class, "enseignement_classe");
    }
}
