<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bulletin extends Model
{
    /** @use HasFactory<\Database\Factories\BulletinFactory> */
    use HasFactory;

    protected $guarded = [];

    protected $with = ["inscription", "periodeAcademique", "enseignements"];

    public function inscription()
    {
        return $this->belongsTo(Inscription::class);
    }

    public function periodeAcademique()
    {
        return $this->belongsTo(PeriodeAcademique::class);
    }

    public function enseignements()
    {
        return $this->belongsToMany(Enseignement::class, 'bulletin_lignes')
            ->withPivot(["moyenne_generale_matiere", "coefficient", "appreciation_professeur"]);
    }
}
