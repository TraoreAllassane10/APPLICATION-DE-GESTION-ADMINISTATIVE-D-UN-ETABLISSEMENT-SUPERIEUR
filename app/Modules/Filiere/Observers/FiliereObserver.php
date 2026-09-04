<?php

namespace App\Modules\Filiere\Observers;

use App\Enums\TypeAction;
use App\Models\ActivityLog;
use App\Models\Filiere;
use Illuminate\Support\Facades\Auth;

class FiliereObserver
{
    /**
     * Handle the Filiere "created" event.
     */
    public function created(Filiere $filiere): void
    {
        ActivityLog::create([
            "user_id" => Auth::user()->id,
               "user_name" => Auth::user()->name,
            "action" => TypeAction::CREATION->value,
            "entite_type" => "Fillière",
            "entite_id" => (string) $filiere->id,
            "nouvelle_valeur" => $filiere->toArray()
        ]);
    }

    /**
     * Handle the Filiere "updated" event.
     */
    public function updated(Filiere $filiere): void
    {
        ActivityLog::create([
            "user_id" => Auth::user()->id,
               "user_name" => Auth::user()->name,
            "action" => TypeAction::MODIFICATION->value,
            "entite_type" => "Fillière",
            "entite_id" => (string) $filiere->id,
            "ancienne_valeur" => $filiere->getOriginal(),
            "nouvelle_valeur" => $filiere->getChanges()
        ]);
    }

    /**
     * Handle the Filiere "deleted" event.
     */
    public function deleted(Filiere $filiere): void
    {
        ActivityLog::create([
            "user_id" => Auth::user()->id,
               "user_name" => Auth::user()->name,
            "action" => TypeAction::SUPPRESSION->value,
            "entite_type" => "Fillière",
            "entite_id" => (string) $filiere->id,
            "ancienne_valeur" => $filiere->getOriginal(),
        ]);
    }

    /**
     * Handle the Filiere "restored" event.
     */
    public function restored(Filiere $filiere): void
    {
        //
    }

    /**
     * Handle the Filiere "force deleted" event.
     */
    public function forceDeleted(Filiere $filiere): void
    {
        //
    }
}
