<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cours extends Model
{
    /** @use HasFactory<\Database\Factories\CoursFactory> */
    use HasFactory;

    protected $fillable = ["nom", "type_enseignement", "professeur_id"];

    public function professeur() 
    {
        return $this->belongsTo(Professeur::class);
    }


}
