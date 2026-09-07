<?php

namespace App\Notifications;

use App\Models\Etudiant;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EtudiantCreatedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        protected Etudiant $etudiant
    ) {}

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => "Etudiant",
            'etudiant_ip' => $this->etudiant->ip,
            'titre' => "Nouvel étudiant enregistré",
            'message' => "{$this->etudiant->nom} {$this->etudiant->prenom} a été enregistré par le secrétaire de scolarité.",
            'lien' => "/etudiants/{$this->etudiant->ip}/show"
        ];
    }

    /**
     * Get the broadcastable representation of the notification.
     */
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
