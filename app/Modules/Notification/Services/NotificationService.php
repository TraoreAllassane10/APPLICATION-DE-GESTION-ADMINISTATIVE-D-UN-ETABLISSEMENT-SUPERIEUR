<?php

namespace App\Modules\Notification\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class NotificationService
{
    protected User $user;
    public function __construct()
    {
        $userId = Auth::user()->id;
        $this->user = User::find($userId);
    }

    public function getNotifications()
    {
        $notifications = $this->user->notifications()->get();
        $total_notification = $notifications->count();
        $total_notification_non_lue = $this->user->unreadNotifications()->count();

        return [
            "total_notification" => $total_notification,
            "total_notification_non_lue" => $total_notification_non_lue,
            "notifications" => $notifications
        ];
    }

    public function nouvellesNotifications()
    {
        return $this->user->unreadNotifications()->get();
    }

    public function marquerCommeLue(string $id)
    {
        return $this
            ->user
            ->notifications()
            ->where('id', $id)
            ->update(['read_at' => now()]);
    }

    public function marquerToutCommeLue()
    {
        return $this
            ->user
            ->unreadNotifications
            ->markAsRead();
    }

    public function deleteNotification(string $id)
    {
        return $this
            ->user
            ->notifications()
            ->where('id', $id)
            ->delete();
    }

    public function clearNotification()
    {
        return $this
            ->user
            ->notifications()
            ->delete();
    }
}
