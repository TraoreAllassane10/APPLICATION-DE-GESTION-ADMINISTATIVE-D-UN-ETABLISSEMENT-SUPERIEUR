<?php

namespace App\Modules\Etudiant\Observes;

use App\Enums\TypeAction;
use App\Models\ActivityLog;
use App\Models\Etudiant;
use Illuminate\Support\Facades\Auth;

class EtudiantObserver
{
    /**
     * Handle the Etudiant "created" event.
     */
    public function created(Etudiant $etudiant): void
    {
        ActivityLog::create([
            "user_id" => Auth::user()->id,
            "user_name" => Auth::user()->name,
            "action" => TypeAction::CREATION->value,
            "entite_type" => "Etudiant",
            "entite_id" => $etudiant->ip,
            "nouvelle_valeur" => $etudiant->toArray()
        ]);
    }

    /**
     * Handle the Etudiant "updated" event.
     */
    public function updated(Etudiant $etudiant): void
    {
         ActivityLog::create([
            "user_id" => Auth::user()->id,
               "user_name" => Auth::user()->name,
            "action" => TypeAction::MODIFICATION->value,
            "entite_type" => "Etudiant",
            "entite_id" => $etudiant->ip,
            "ancienne_valeur" => $etudiant->getOriginal(),
            "nouvelle_valeur" => $etudiant->getChanges()
        ]);
    }

    /**
     * Handle the Etudiant "deleted" event.
     */
    public function deleted(Etudiant $etudiant): void
    {
         ActivityLog::create([
            "user_id" => Auth::user()->id,
               "user_name" => Auth::user()->name,
            "action" => TypeAction::SUPPRESSION->value,
            "entite_type" => "Etudiant",
            "entite_id" => $etudiant->ip,
            "ancienne_valeur" => $etudiant->getOriginal(),
        ]);
    }

}
