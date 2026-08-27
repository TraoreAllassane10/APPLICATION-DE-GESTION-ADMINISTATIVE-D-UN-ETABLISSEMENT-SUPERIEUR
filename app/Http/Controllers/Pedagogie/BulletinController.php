<?php

namespace App\Http\Controllers\Pedagogie;

use App\Http\Controllers\Controller;
use App\Services\Pedagogie\BulletinService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BulletinController extends Controller
{
    public function __construct(
        protected BulletinService $bulletinService
    ) {}
    public function index()
    {
        $bulletins = $this->bulletinService->getBulletins();
        return Inertia::render("bulletin/Index", [
            "bulletins" => $bulletins
        ]);
    }
}
