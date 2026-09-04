<?php

namespace App\Modules\Niveau\Observers;

use App\Enums\TypeAction;
use App\Models\ActivityLog;
use App\Models\Niveau;
use Illuminate\Support\Facades\Auth;

class NiveauObserver
{
    /**
     * Handle the Niveau "created" event.
     */
    public function created(Niveau $niveau): void
    {
        ActivityLog::create([
            "user_id" => Auth::user()->id,
               "user_name" => Auth::user()->name,
            "action" => TypeAction::CREATION->value,
            "entite_type" => "Niveau",
            "entite_id" => (string) $niveau->id,
            "nouvelle_valeur" => $niveau->toArray()
        ]);
    }

    /**
     * Handle the Niveau "updated" event.
     */
    public function updated(Niveau $niveau): void
    {
        ActivityLog::create([
            "user_id" => Auth::user()->id,
               "user_name" => Auth::user()->name,
            "action" => TypeAction::MODIFICATION->value,
            "entite_type" => "Niveau",
            "entite_id" => (string) $niveau->id,
            "ancienne_valeur" => $niveau->getOriginal(),
            "nouvelle_valeur" => $niveau->getChanges()
        ]);
    }

    /**
     * Handle the Niveau "deleted" event.
     */
    public function deleted(Niveau $niveau): void
    {
        ActivityLog::create([
            "user_id" => Auth::user()->id,
               "user_name" => Auth::user()->name,
            "action" => TypeAction::SUPPRESSION->value,
            "entite_type" => "Niveau",
            "entite_id" => (string) $niveau->id,
            "ancienne_valeur" => $niveau->getOriginal(),
        ]);
    }

}
