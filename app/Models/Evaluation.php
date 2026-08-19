<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    /** @use HasFactory<\Database\Factories\EvaluationFactory> */
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'date' => 'date:Y-m-d'
    ];

    public function enseignement()
    {
        return $this->belongsTo(Enseignement::class);
    }

    public function periode_academique()
    {
        return $this->belongsTo(PeriodeAcademique::class);
    }
}
