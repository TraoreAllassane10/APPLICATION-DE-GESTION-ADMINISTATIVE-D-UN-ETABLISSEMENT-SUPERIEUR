import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import useNotification from '@/features/notification/hooks/useNotification';
import { EtudiantCreeNotificationData } from '@/features/notification/types/notification.types';
import { Auth, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEchoModel } from '@laravel/echo-react';
import { User2, X } from 'lucide-react';
import { useEffect, type PropsWithChildren } from 'react';
import toast from 'react-hot-toast';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const {
        auth: { user },
    } = usePage<{ auth: Auth }>().props;

    const { channel } = useEchoModel(`App.Models.User`, user.id);

    useEffect(() => {
        const currentChannel = channel();
        if (!currentChannel) return;

        currentChannel.notification(
            (notification: EtudiantCreeNotificationData) => {
                toast.custom(
                    (t) => (
                        <div
                            className={`${
                                t.visible
                                    ? 'animate-in slide-in-from-top-5 fade-in'
                                    : 'animate-out slide-out-to-top-5 fade-out'
                            } pointer-events-auto w-full max-w-md rounded-xl border border-l-4 border-border border-l-primary bg-card p-4 shadow-lg transition-all duration-200`}
                        >
                            <div className="flex items-start gap-3">
                                {/* Icône enveloppée dans une pastille de couleur */}
                                <div className="mt-0.5 shrink-0 rounded-lg bg-primary/10 p-2 text-primary">
                                    <User2 className="h-5 w-5" />
                                </div>

                                {/* Contenu textuel */}
                                <div className="min-w-0 flex-1 pr-2">
                                    <h4 className="text-sm font-semibold tracking-tight text-foreground">
                                        {notification.titre}
                                    </h4>
                                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                        {notification.message}
                                    </p>
                                </div>

                                {/* Bouton pour fermer le toast manuellement */}
                                <button
                                    onClick={() => toast.dismiss(t.id)}
                                    className="shrink-0 rounded-lg p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ),
                    { duration: 5000 },
                );
            },
        );

        return () => {
            currentChannel.stopListening(
                '.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated',
            );
        };
    }, [channel]);

    const { derniereNotifications, getDernieresNotifications } =
        useNotification();

    useEffect(() => {
        async function loadNotifications() {
            await getDernieresNotifications();
        }

        loadNotifications();
    }, [channel]);

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent
                variant="sidebar"
                className="overflow-x-hidden bg-gray-50"
            >
                <AppSidebarHeader breadcrumbs={breadcrumbs} notifications={derniereNotifications} />
                {children}
            </AppContent>
        </AppShell>
    );
}
