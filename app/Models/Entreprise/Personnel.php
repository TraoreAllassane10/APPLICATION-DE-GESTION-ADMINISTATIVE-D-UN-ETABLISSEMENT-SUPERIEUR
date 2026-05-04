<?php

namespace App\Models\Entreprise;

use Illuminate\Database\Eloquent\Casts\Attribute;
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

    protected $casts = [
        'proprietaire' => 'boolean',
    ];

    protected $with = ['formations', 'experiences', 'documents'];

    protected function proprietaire(): Attribute
    {
        return Attribute::make(
            set: fn($value) => filter_var($value, FILTER_VALIDATE_BOOLEAN)
        );
    }

    public function formations()
    {
        return $this->hasMany(Formation::class);
    }

    public function experiences()
    {
        return $this->hasMany(Experience::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}
