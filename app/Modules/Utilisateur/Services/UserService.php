<?php

namespace App\Modules\Utilisateur\Services;

use App\Models\User;
use Exception;

class UserService {
    public function getAdmins() {
        return User::role('Administrateur')->get();
    }
}
