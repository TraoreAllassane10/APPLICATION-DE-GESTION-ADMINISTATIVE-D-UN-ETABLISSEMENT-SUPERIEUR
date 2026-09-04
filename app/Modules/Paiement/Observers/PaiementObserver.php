<?php

namespace App\Modules\Paiement\Observers;

use App\Enums\TypeAction;
use App\Models\ActivityLog;
use App\Models\Paiement;
use Illuminate\Support\Facades\Auth;

class PaiementObserver
{
    /**
     * Handle the Paiement "created" event.
     */
    public function created(Paiement $paiement): void
    {
        ActivityLog::create([
            "user_id" => Auth::user()->id,
            "user_name" => Auth::user()->name,
            "action" => TypeAction::CREATION->value,
            "entite_type" => "Paiement",
            "entite_id" => (string) $paiement->id,
            "nouvelle_valeur" => $paiement->toArray()
        ]);
    }

    /**
     * Handle the Paiement "updated" event.
     */
    public function updated(Paiement $paiement): void
    {
        ActivityLog::create([
            "user_id" => Auth::user()->id,
            "user_name" => Auth::user()->name,
            "action" => TypeAction::MODIFICATION->value,
            "entite_type" => "Paiement",
            "entite_id" => (string) $paiement->id,
            "ancienne_valeur" => $paiement->getOriginal(),
            "nouvelle_valeur" => $paiement->getChanges()
        ]);
    }

    /**
     * Handle the Paiement "deleted" event.
     */
    public function deleted(Paiement $paiement): void
    {
        ActivityLog::create([
            "user_id" => Auth::user()->id,
            "user_name" => Auth::user()->name,
            "action" => TypeAction::SUPPRESSION->value,
            "entite_type" => "Paiement",
            "entite_id" => (string) $paiement->id,
            "ancienne_valeur" => $paiement->getOriginal(),
        ]);
    }

}
