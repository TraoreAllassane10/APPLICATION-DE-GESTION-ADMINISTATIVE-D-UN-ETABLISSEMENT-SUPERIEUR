<?php

namespace App\Http\Controllers\Entreprise;

use App\Http\Controllers\Controller;
use App\Models\Entreprise\Personnel;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PersonnelController extends Controller
{
    public function index() {
        return Inertia::render('Entreprise/personnel/Index');
    }
    public function show(Personnel $personnel) {}
    public function create() {
        return Inertia::render('Entreprise/personnel/Create');
    }
    public function store(Request $request) {}
    public function edit(Personnel $personnel) {}
    public function update(Personnel $personnel, Request $request) {}
    public function delete(Personnel $personnel) {}
}
