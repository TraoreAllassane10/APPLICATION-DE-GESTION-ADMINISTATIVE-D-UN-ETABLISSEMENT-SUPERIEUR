<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Moyenne extends Model
{
    /** @use HasFactory<\Database\Factories\MoyenneFactory> */
    use HasFactory;

    protected $guarded = [];

    public function inscription()
    {
        return $this->belongsTo(Inscription::class);
    }

    public function enseignement()
    {
        return $this->belongsTo(Enseignement::class);
    }

    public function periodeAcademique()
    {
        return $this->belongsTo(PeriodeAcademique::class);
    }
}
