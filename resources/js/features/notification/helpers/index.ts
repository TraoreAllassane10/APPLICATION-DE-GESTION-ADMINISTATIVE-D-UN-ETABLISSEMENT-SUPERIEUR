import { UserPlus } from "lucide-react";
import { EtudiantCreeNotification } from "../types/notification.types";

export function formatRelativeDate(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60_000);
    const hours = Math.floor(diff / 3_600_000);
    const days = Math.floor(diff / 86_400_000);

    if (mins < 1) return "À l'instant";
    if (mins < 60) return `Il y a ${mins} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days === 1) return 'Hier';
    return `Il y a ${days} jours`;
}

export function groupByDay(
    notifs: EtudiantCreeNotification[],
): [string, EtudiantCreeNotification[]][] {
    const groups: Record<string, EtudiantCreeNotification[]> = {};

    notifs.forEach((n) => {
        const diff = Math.floor(
            (Date.now() - new Date(n.created_at).getTime()) / 86_400_000,
        );
        const label =
            diff === 0
                ? "Aujourd'hui"
                : diff === 1
                  ? 'Hier'
                  : `Il y a ${diff} jours`;
        if (!groups[label]) groups[label] = [];
        groups[label].push(n);
    });

    return Object.entries(groups);
}

export const typeConfig: Record<
    string,
    {
        icon: React.ComponentType<{ className?: string }>;
        bg: string;
        color: string;
    }
> = {
    'App\\Notifications\\EtudiantCreatedNotification': {
        icon: UserPlus,
        bg: 'bg-blue-50',
        color: 'text-blue-600',
    },
};