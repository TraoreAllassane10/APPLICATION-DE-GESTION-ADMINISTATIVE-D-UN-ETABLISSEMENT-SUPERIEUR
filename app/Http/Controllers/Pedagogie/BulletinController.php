<?php

namespace App\Http\Controllers\Pedagogie;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BulletinController extends Controller
{
    public function index()
    {
        return Inertia::render("bulletin/Index");
    }
}
