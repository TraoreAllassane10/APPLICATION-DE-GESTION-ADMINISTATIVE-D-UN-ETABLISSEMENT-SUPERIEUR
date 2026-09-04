<?php

namespace App\Modules\Scolarite\Observers;

use App\Enums\TypeAction;
use App\Models\ActivityLog;
use App\Models\Scolarite;
use Illuminate\Support\Facades\Auth;

class ScolariteObserver
{
    /**
     * Handle the Scolarite "created" event.
     */
    public function created(Scolarite $scolarite): void
    {
        ActivityLog::create([
            "user_id" => Auth::user()->id,
               "user_name" => Auth::user()->name,
            "action" => TypeAction::CREATION->value,
            "entite_type" => "Scolarité",
            "entite_id" => (string) $scolarite->id,
            "nouvelle_valeur" => $scolarite->toArray()
        ]);
    }

    /**
     * Handle the Scolarite "updated" event.
     */
    public function updated(Scolarite $scolarite): void
    {
        ActivityLog::create([
            "user_id" => Auth::user()->id,
               "user_name" => Auth::user()->name,
            "action" => TypeAction::MODIFICATION->value,
            "entite_type" => "Scolarité",
            "entite_id" => (string) $scolarite->id,
            "ancienne_valeur" => $scolarite->getOriginal(),
            "nouvelle_valeur" => $scolarite->getChanges()
        ]);
    }

    /**
     * Handle the Scolarite "deleted" event.
     */
    public function deleted(Scolarite $scolarite): void
    {
        ActivityLog::create([
            "user_id" => Auth::user()->id,
               "user_name" => Auth::user()->name,
            "action" => TypeAction::SUPPRESSION->value,
            "entite_type" => "Scolarité",
            "entite_id" => (string) $scolarite->id,
            "ancienne_valeur" => $scolarite->getOriginal(),
        ]);
    }

    /**
     * Handle the Scolarite "restored" event.
     */
    public function restored(Scolarite $scolarite): void
    {
        //
    }

    /**
     * Handle the Scolarite "force deleted" event.
     */
    public function forceDeleted(Scolarite $scolarite): void
    {
        //
    }
}
