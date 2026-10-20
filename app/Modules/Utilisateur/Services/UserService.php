<?php

namespace App\Modules\Utilisateur\Services;

use App\Models\User;
use Exception;

class UserService {
    public function getAdmins() {
        return User::role('Administrateur')->get();
    }

    public function getInspecteursPedagogique() {
        return User::role('Inspecteur pedagogique')->get();
    }
}
