import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { EtudiantCreeNotification } from '@/features/notification/types/notification.types';
import { Auth, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEchoModel } from '@laravel/echo-react';
import { User2, User2Icon } from 'lucide-react';
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

        currentChannel.notification((notifcation: EtudiantCreeNotification) => {
            console.log(notifcation);

            toast((t) => (
                <Alert>
                    <User2/>

                    <AlertTitle className="font-medium text-primary">
                        {notifcation.titre}
                    </AlertTitle>
                    <AlertDescription className="tracking-wide">
                        {notifcation.message}
                    </AlertDescription>
                </Alert>
            ));
        });
    }, [channel]);

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent
                variant="sidebar"
                className="overflow-x-hidden bg-gray-50"
            >
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
