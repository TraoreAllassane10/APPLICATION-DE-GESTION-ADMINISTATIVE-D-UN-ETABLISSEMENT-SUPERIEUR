import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
    Annee,
    Auth,
    type BreadcrumbItem as BreadcrumbItemType,
} from '@/types';
import { usePage } from '@inertiajs/react';
import { useEchoNotification } from '@laravel/echo-react';
import { Bell } from 'lucide-react';

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
}

const sampleNotifications: Notification[] = [
    {
        id: '1',
        title: 'Nouvelle inscription',
        message: 'Un nouvel étudiant a été inscrit.',
        time: 'Il y a 5 min',
        read: false,
    },
    {
        id: '2',
        title: 'Mise à jour système',
        message: 'L année académique a été mise à jour.',
        time: 'Il y a 1 heure',
        read: true,
    },
];

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const {
        anneeActive,
        auth: { user },
    } = usePage<{ anneeActive: Annee; auth: Auth }>().props;
    
    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            <div className="flex items-center gap-4">
                <span className="flex items-center rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-sm font-bold text-red-700 shadow">
                    Année Académique: {anneeActive.libelle ?? '-'}
                </span>

                {/* Popover de Notification */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative rounded-full"
                        >
                            <Bell className="h-5 w-5" />
                            {/* Pastille rouge s'il y a des notifications non lues */}
                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-600 ring-2 ring-white" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0" align="end">
                        <div className="border-b px-4 py-3 text-sm font-semibold">
                            Notifications
                        </div>
                        <div className="max-h-80 divide-y overflow-y-auto">
                            {sampleNotifications.length > 0 ? (
                                sampleNotifications.map((notification) => (
                                    <div
                                        key={notification.id}
                                        className={`p-4 text-sm transition-colors hover:bg-muted/50 ${
                                            !notification.read
                                                ? 'bg-muted/20'
                                                : ''
                                        }`}
                                    >
                                        <div className="flex items-center justify-between font-medium">
                                            <span>{notification.title}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {notification.time}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {notification.message}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="p-4 text-center text-sm text-muted-foreground">
                                    Aucune notification
                                </div>
                            )}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </header>
    );
}
