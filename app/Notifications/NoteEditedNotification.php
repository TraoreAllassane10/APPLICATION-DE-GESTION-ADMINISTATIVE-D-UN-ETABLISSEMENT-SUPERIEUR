<?php

namespace App\Notifications;

use App\Models\Evaluation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class NoteEditedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(protected Evaluation $evaluation) {}

    public function via(object $notifiable): array
    {
        return ['database', "broadcast"];
    }

    public function toArray(object $notifiable): array
    {
        return [
            "type" => "Evaluation",
            "evaluation_id" => $this->evaluation->id,
            "titre" => "Mise à jour des notes",
            "message" => "L'enseignant {$this->evaluation->enseignement->professeur->nom_prenom} a mis à jour les notes de l'évaluation {$this->evaluation->titre}",
            'lien' => "/notes/{$this->evaluation->id}/create-note"
        ];
    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            "type" => "Evaluation",
            "evaluation_id" => $this->evaluation->id,
            "titre" => "Mise à jour des notes",
            "message" => "L'enseignant {$this->evaluation->enseignement->professeur->nom_prenom} a mis à jour les notes de l'évaluation {$this->evaluation->titre}",
        ]);
    }
}
