<?php

namespace App\Http\Controllers\Pedagogie;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EvaluationController extends Controller
{
    public function index() {
        return Inertia::render('evaluation/Index');
    }

    public function create() {
          return Inertia::render('evaluation/Create'); 
    }
}
