import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    formatRelativeDate,
    groupByDay,
    typeConfig,
} from '@/features/notification/helpers';
import useNotification from '@/features/notification/hooks/useNotification';
import { EtudiantCreeNotification } from '@/features/notification/types/notification.types';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { BellOff, CheckCheck, Trash2, X } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Notifications', href: '/notifications' },
];

type Tab = 'toutes' | 'non_lues';

interface NotificationProps {
    total_notification: number;
    total_notification_non_lue: number;
    notifications: EtudiantCreeNotification[];
    [key: string]: unknown;
}

export default function Notifications() {
    const { notifications, total_notification, total_notification_non_lue } =
        usePage<NotificationProps>().props;

    const [tab, setTab] = useState<Tab>('toutes');
    const [confirmVider, setConfirmVider] = useState(false);

    const visible =
        tab === 'non_lues'
            ? notifications.filter((n) => !n.read_at)
            : notifications;
    const grouped = groupByDay(visible);

    const { marquerCommeLue, marquerToutCommeLue, deleteNotification, clearNotification, loading } = useNotification();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-5 p-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Notifications
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            {total_notification_non_lue > 0
                                ? `${total_notification_non_lue} non lue${total_notification_non_lue > 1 ? 's' : ''}`
                                : 'Tout est à jour'}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {total_notification_non_lue > 0 && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={marquerToutCommeLue}
                                className="gap-1.5 text-xs"
                            >
                                <CheckCheck className="h-3.5 w-3.5" />
                                Tout marquer comme lu
                            </Button>
                        )}
                        {notifications.length > 0 && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setConfirmVider(true)}
                                className="gap-1.5 text-xs text-destructive hover:text-destructive"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                                Vider
                            </Button>
                        )}
                    </div>
                </div>

                {/* Onglets */}
                <div className="flex w-fit gap-1 rounded-lg border bg-muted/40 p-1">
                    {(
                        [
                            {
                                id: 'toutes',
                                label: 'Toutes',
                                count: total_notification,
                            },
                            {
                                id: 'non_lues',
                                label: 'Non lues',
                                count: total_notification_non_lue,
                            },
                        ] as { id: Tab; label: string; count: number }[]
                    ).map(({ id, label, count }) => (
                        <button
                            key={id}
                            onClick={() => setTab(id)}
                            className={`flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-all ${
                                tab === id
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                            } `}
                        >
                            {label}
                            {count > 0 && (
                                <span
                                    className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${
                                        tab === id && id === 'non_lues'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted text-muted-foreground'
                                    } `}
                                >
                                    {count}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Liste */}
                {visible.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center gap-3 py-16 text-muted-foreground">
                            <BellOff className="h-10 w-10 opacity-20" />
                            <p className="text-sm">
                                {tab === 'non_lues'
                                    ? 'Aucune notification non lue.'
                                    : 'Aucune notification pour le moment.'}
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {grouped.map(([label, items]) => (
                            <div key={label}>
                                {/* Séparateur de groupe */}
                                <div className="mb-3 flex items-center gap-3">
                                    <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                        {label}
                                    </span>
                                    <Separator className="flex-1" />
                                </div>

                                <div className="space-y-1.5">
                                    {items.map((notif) => {
                                        const {
                                            icon: Icon,
                                            bg,
                                            color,
                                        } = typeConfig[notif.type];

                                        return (
                                            <div
                                                key={notif.id}
                                                className={`group relative flex gap-3.5 rounded-xl border p-4 transition-all ${
                                                    notif.read_at
                                                        ? 'bg-background hover:bg-muted/30'
                                                        : 'border-primary/10 bg-primary/[0.03] hover:bg-primary/[0.06]'
                                                } `}
                                            >
                                                {/* Point non lu */}
                                                {!notif.read_at && (
                                                    <span className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary" />
                                                )}

                                                {/* Icône */}
                                                <div
                                                    className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${bg}`}
                                                >
                                                    <Icon
                                                        className={`h-4 w-4 ${color}`}
                                                    />
                                                </div>

                                                {/* Contenu */}
                                                <div className="min-w-0 flex-1 pr-6">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <p
                                                            className={`text-sm leading-snug ${notif.read_at ? 'font-medium' : 'font-semibold'}`}
                                                        >
                                                            {notif.data.titre}
                                                        </p>
                                                    </div>
                                                    <p className="mt-0.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                                                        {notif.data.message}
                                                    </p>
                                                    <div className="mt-2 flex items-center gap-3">
                                                        <span className="text-xs text-muted-foreground/70">
                                                            {formatRelativeDate(
                                                                notif.created_at,
                                                            )}
                                                        </span>
                                                        {!notif.read_at && (
                                                            <button
                                                                onClick={() =>
                                                                    marquerCommeLue(
                                                                        notif.id,
                                                                    )
                                                                }
                                                                disabled={loading}
                                                                className="text-xs text-primary hover:underline"
                                                            >
                                                                {loading ? "Traitement..." : "Marquer comme lu"}
                                                            </button>
                                                        )}
                                                        {notif.data.lien && (
                                                            <a
                                                                href={
                                                                    notif.data.lien
                                                                }
                                                                className="text-xs text-muted-foreground hover:text-foreground hover:underline"
                                                            >
                                                                Voir →
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Bouton supprimer (visible au hover) */}
                                                <button
                                                    onClick={() =>
                                                        deleteNotification(notif.id)
                                                    }
                                                    className="absolute top-3 right-3 hidden rounded-md p-1 text-muted-foreground group-hover:flex hover:bg-muted hover:text-foreground"
                                                    title="Supprimer"
                                                >
                                                    <X className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Dialog vider tout */}
            <AlertDialog open={confirmVider} onOpenChange={setConfirmVider}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Vider toutes les notifications ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Cette action supprimera définitivement toutes vos
                            notifications. Elle est irréversible.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={clearNotification}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Vider
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}
