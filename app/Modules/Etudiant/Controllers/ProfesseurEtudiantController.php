<?php

namespace App\Modules\Etudiant\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Etudiant\Services\ProfesseurEtudiantSerice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfesseurEtudiantController extends Controller
{

    public function __construct(
        protected ProfesseurEtudiantSerice $professeurEtudiantSerice
    ) {}
    public function index() {
       
    }
}
