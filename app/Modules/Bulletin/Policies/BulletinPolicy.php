<?php

namespace App\Modules\Bulletin\Policies;

use App\Enums\RoleUser;
use App\Models\Bulletin;
use App\Models\User;

class BulletinPolicy
{
    /**
     * Determine whether the user can view any bulletins.
     */
    public function viewAny(User $user): bool
    {
        return $user->hasRole([
            RoleUser::ADMINISTRATEUR->value,
            RoleUser::INSPECTEUR_PEDAGOGIQUE->value,
        ]);
    }

    /**
     * Determine whether the user can view the bulletin.
     */
    public function view(User $user, Bulletin $bulletin): bool
    {
        return $user->hasRole([
            RoleUser::ADMINISTRATEUR->value,
            RoleUser::INSPECTEUR_PEDAGOGIQUE->value,
        ]);
    }

    /**
     * Determine whether the user can generate bulletins.
     */
    public function generate(User $user): bool
    {
        return $user->hasRole([
            RoleUser::ADMINISTRATEUR->value,
            RoleUser::INSPECTEUR_PEDAGOGIQUE->value,
        ]);
    }

    /**
     * Determine whether the user can validate a bulletin.
     */
    public function validate(User $user, Bulletin $bulletin): bool
    {
        // Un bulletin déjà publié ne peut plus être validé/modifié
        if ($bulletin->statut === 'PUBLIE') {
            return false;
        }

        return $user->hasRole([
            RoleUser::ADMINISTRATEUR->value,
            RoleUser::INSPECTEUR_PEDAGOGIQUE->value,
        ]);
    }

    /**
     * Determine whether the user can publish a bulletin.
     */
    public function publish(User $user, Bulletin $bulletin): bool
    {
        return $user->hasRole([
            RoleUser::ADMINISTRATEUR->value,
            RoleUser::INSPECTEUR_PEDAGOGIQUE->value,
        ]);
    }

    /**
     * Determine whether the user can download bulletin PDF.
     */
    public function downloadPdf(User $user, Bulletin $bulletin): bool
    {
        return $user->hasRole([
            RoleUser::ADMINISTRATEUR->value,
            RoleUser::INSPECTEUR_PEDAGOGIQUE->value,
        ]);
    }
}
