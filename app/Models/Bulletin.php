<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bulletin extends Model
{
    /** @use HasFactory<\Database\Factories\BulletinFactory> */
    use HasFactory;

    protected $guarded = [];

    protected $with = ["inscription", "periodeAcademique"];

    public function inscription()
    {
        return $this->belongsTo(Inscription::class);
    }

    public function periodeAcademique()
    {
        return $this->belongsTo(PeriodeAcademique::class);
    }

    public function moyennes()
    {
        return $this->hasMany(Moyenne::class, 'inscription_id', 'inscription_id');
    }

    public function getEnseignementsAttribute()
    {
        if ($this->relationLoaded('enseignements')) {
            return $this->getRelation('enseignements');
        }

        $niveau = $this->inscription?->niveaux?->first();
        if (!$niveau) {
            return collect();
        }

        $enseignements = $niveau->enseignements()
            ->with(['cours', 'professeur'])
            ->get();

        $moyennes = Moyenne::where('inscription_id', $this->inscription_id)
            ->where('periode_academique_id', $this->periode_academique_id)
            ->get()
            ->keyBy('enseignement_id');

        foreach ($enseignements as $enseignement) {
            $moyenne = $moyennes->get($enseignement->id);
            $enseignement->pivot = (object) [
                'moyenne_generale_matiere' => $moyenne?->valeur,
                'coefficient' => $enseignement->pivot->coefficient ?? 1,
                'appreciation_professeur' => $moyenne?->appreciation ?? '',
            ];
        }

        return $enseignements;
    }
}
