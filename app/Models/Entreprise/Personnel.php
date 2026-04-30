<?php

namespace App\Models\Entreprise;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personnel extends Model
{
    /** @use HasFactory<\Database\Factories\Entreprise\PersonnelFactory> */
    use HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'date_naissance',
        'lieu_naissance',
        'genre',
        'nationalite',
        'matricule',
        'fonction',
        'situation_matrimoniale',
        'nombre_enfant',
        'nombre_enfant_charge',
        'telephone',
        'email',
        'bp',
        'rib',
        'nom_entreprise',
        'proprietaire',
        'numero_registre_commerce'
    ];

    protected $with = ['formations', 'experiences'];

    public function formations() {
        return $this->hasMany(Formation::class);
    }

    public function experiences() {
        return $this->hasMany(Experience::class);
    }
}
