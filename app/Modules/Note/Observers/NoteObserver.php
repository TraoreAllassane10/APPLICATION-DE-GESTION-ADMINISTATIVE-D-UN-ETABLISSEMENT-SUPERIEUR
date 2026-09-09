<?php

namespace App\Modules\Note\Observers;

use App\Models\Bulletin;
use App\Models\Note;

class NoteObserver
{
    /**
     * Handle the Note "created" event.
     */
    public function created(Note $note): void
    {
        Bulletin::where('inscription_id', $note->inscription_id)
            ->where('periode_academique_id', $note->evaluation->periode_academique_id)
            ->update(["is_changed" => true]);
    }

    /**
     * Handle the Note "updated" event.
     */
    public function updated(Note $note): void
    {
        Bulletin::where('inscription_id', $note->inscription_id)
            ->where('periode_academique_id', $note->evaluation->periode_academique_id)
            ->update(["is_changed" => true]);
    }

    /**
     * Handle the Note "deleted" event.
     */
    public function deleted(Note $note): void
    {
        //
    }
}
