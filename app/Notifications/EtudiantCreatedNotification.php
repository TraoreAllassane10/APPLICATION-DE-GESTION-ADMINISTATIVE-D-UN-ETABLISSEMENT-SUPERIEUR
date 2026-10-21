<?php

namespace App\Notifications;

use App\Models\Etudiant;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class EtudiantCreatedNotification extends Notification implements ShouldQueue
{
    use Queueable;


    public function __construct(
        protected Etudiant $etudiant
    ) {}

    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => "Etudiant",
            'etudiant_ip' => $this->etudiant->ip,
            'titre' => "Nouvel étudiant enregistré",
            'message' => "{$this->etudiant->nom} {$this->etudiant->prenom} a été enregistré par le secrétaire de scolarité.",
            'lien' => "/etudiants/{$this->etudiant->id}/show"
        ];
    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'type' => "Etudiant",
            'etudiant_ip' => $this->etudiant->ip,
            'titre' => "Nouvel étudiant enregistré",
            'message' => "{$this->etudiant->nom} {$this->etudiant->prenom} a été enregistré par le secrétaire de scolarité."
        ]);
    }
}
