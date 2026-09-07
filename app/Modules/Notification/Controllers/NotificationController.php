<?php

namespace App\Modules\Notification\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Notification\Services\NotificationService;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function __construct(protected NotificationService $notificationService) {}

    public function index()
    {
        $data = $this->notificationService->getNotifications();

        return Inertia::render('notification/Index', [
            "total_notification" => $data['total_notification'],
            "total_notification_non_lue" => $data['total_notification_non_lue'],
            "notifications" => $data['notifications']
        ]);
    }

    public function dernieresNotifications()
    {
        $notifications = $this->notificationService->nouvellesNotifications();
        return response()->json(["success" => true, "data" => $notifications]);
    }

    public function marquerNotificationCommeLue(string $id)
    {
        $notification = $this->notificationService->marquerCommeLue($id);
        return response()->json(["success" => true, "data" => $notification]);
    }

    public function marquerTouteNotificationCommeLue()
    {
        $notification = $this->notificationService->marquerToutCommeLue();
        return response()->json(["success" => true, "data" => $notification]);
    }

    public function delete(string $id)
    {
        $notification = $this->notificationService->deleteNotification($id);
        return response()->json(["success" => true, "message" => "Une notification supprimée !", "data" => $notification]);
    }

    public function clear() {
        $this->notificationService->clearNotification();
        return response()->json(["success" => true, "message" => "Toutes les notifications supprimées !",]);
    }
}
