<?php

namespace App\Modules\Inscription\Observers;

use App\Enums\TypeAction;
use App\Models\ActivityLog;
use App\Models\Inscription;
use Illuminate\Support\Facades\Auth;

class InscriptionObserver
{
    /**
     * Handle the Inscription "created" event.
     */
    public function created(Inscription $inscription): void
    {
        $nouvelle_valeur = [
            ...$inscription->toArray(),
            "nom" => $inscription->etudiant->nom,
            "prenom" => $inscription->etudiant->prenom
        ];

        ActivityLog::create([
            "user_id" => Auth::user()->id,
            "user_name" => Auth::user()->name,
            "action" => TypeAction::CREATION->value,
            "entite_type" => "Inscription",
            "entite_id" => (string) $inscription->id,
            "nouvelle_valeur" => $nouvelle_valeur
        ]);
    }

    /**
     * Handle the Inscription "updated" event.
     */
    public function updated(Inscription $inscription): void
    {
        ActivityLog::create([
            "user_id" => Auth::user()->id,
            "user_name" => Auth::user()->name,
            "action" => TypeAction::MODIFICATION->value,
            "entite_type" => "Inscription",
            "entite_id" => (string) $inscription->id,
            "ancienne_valeur" => $inscription->getOriginal(),
            "nouvelle_valeur" => $inscription->getChanges()
        ]);
    }

    /**
     * Handle the Inscription "deleted" event.
     */
    public function deleted(Inscription $inscription): void
    {
        $ancienne_valeur = [
            ...$inscription->getOriginal(),
            "nom" => $inscription->etudiant->nom,
            "prenom" => $inscription->etudiant->prenom
        ];

        ActivityLog::create([
            "user_id" => Auth::user()->id,
            "user_name" => Auth::user()->name,
            "action" => TypeAction::SUPPRESSION->value,
            "entite_type" => "Inscription",
            "entite_id" => (string) $inscription->id,
            "ancienne_valeur" => $ancienne_valeur,
        ]);
    }
}
