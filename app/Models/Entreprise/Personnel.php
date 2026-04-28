<?php

namespace App\Models\Entreprise;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personnel extends Model
{
    /** @use HasFactory<\Database\Factories\Entreprise\PersonnelFactory> */
    use HasFactory;

    protected $guard = [];
}
