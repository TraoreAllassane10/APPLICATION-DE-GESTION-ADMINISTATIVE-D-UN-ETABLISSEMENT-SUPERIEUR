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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import {
    Bell,
    BellOff,
    BookOpen,
    CheckCheck,
    ClipboardList,
    GraduationCap,
    MoreHorizontal,
    Trash2,
    UserPlus,
    Wallet,
    X,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Notifications', href: '/notifications' },
];

// ── Types ─────────────────────────────────────────────────────────────────────

type NotifType =
    | 'etudiant'
    | 'inscription'
    | 'evaluation'
    | 'paiement'
    | 'cours'
    | 'autre';

interface Notification {
    id: number;
    type: NotifType;
    titre: string;
    message: string;
    date: string; // ISO string
    lue: boolean;
    lien?: string;
}

// ── Mock data ─────────────────────────────────────────────────────────────────

const NOTIFS_MOCK: Notification[] = [
    {
        id: 1,
        type: 'etudiant',
        titre: 'Nouvel étudiant enregistré',
        message:
            'Jean Kouassi a été enregistré par le secrétaire de scolarité.',
        date: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
        lue: false,
        lien: '/etudiants/1',
    },
    {
        id: 2,
        type: 'inscription',
        titre: 'Nouvelle inscription',
        message: 'Marie Yao a été inscrite en Licence 2 pour 2024-2025.',
        date: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
        lue: false,
        lien: '/inscriptions/2',
    },
    {
        id: 3,
        type: 'paiement',
        titre: 'Paiement reçu',
        message:
            'Un paiement de 50 000 XOF a été enregistré pour Aminata Konaté.',
        date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        lue: false,
        lien: '/inscriptions/1',
    },
    {
        id: 4,
        type: 'evaluation',
        titre: 'Évaluation créée',
        message:
            'Une nouvelle évaluation a été créée pour le cours de Base de données — L2 Informatique.',
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        lue: true,
    },
    {
        id: 5,
        type: 'cours',
        titre: 'Nouvelle séance ajoutée',
        message:
            'Une séance de Programmation Web a été programmée le Lundi à 08h00 en Salle A.',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        lue: true,
    },
    {
        id: 6,
        type: 'etudiant',
        titre: 'Profil mis à jour',
        message:
            "Les informations de Fatoumata Traoré ont été modifiées par l'administrateur.",
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        lue: true,
    },
    {
        id: 7,
        type: 'paiement',
        titre: 'Retard de paiement',
        message:
            'Mariam Bamba accuse un retard de paiement de 3 mois. Reste dû : 300 000 XOF.',
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        lue: true,
        lien: '/inscriptions/5',
    },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const typeConfig: Record<
    NotifType,
    { icon: React.ComponentType<{ className?: string }>; bg: string; color: string }
> = {
    etudiant:    { icon: UserPlus,      bg: 'bg-blue-50',    color: 'text-blue-600'    },
    inscription: { icon: GraduationCap, bg: 'bg-violet-50',  color: 'text-violet-600'  },
    evaluation:  { icon: ClipboardList, bg: 'bg-amber-50',   color: 'text-amber-600'   },
    paiement:    { icon: Wallet,        bg: 'bg-emerald-50', color: 'text-emerald-600' },
    cours:       { icon: BookOpen,      bg: 'bg-cyan-50',    color: 'text-cyan-600'    },
    autre:       { icon: Bell,          bg: 'bg-slate-100',  color: 'text-slate-500'   },
};

function formatRelativeDate(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const mins  = Math.floor(diff / 60_000);
    const hours = Math.floor(diff / 3_600_000);
    const days  = Math.floor(diff / 86_400_000);

    if (mins < 1)   return "À l'instant";
    if (mins < 60)  return `Il y a ${mins} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days === 1) return 'Hier';
    return `Il y a ${days} jours`;
}

function groupByDay(notifs: Notification[]): [string, Notification[]][] {
    const groups: Record<string, Notification[]> = {};

    notifs.forEach((n) => {
        const diff = Math.floor(
            (Date.now() - new Date(n.date).getTime()) / 86_400_000,
        );
        const label =
            diff === 0 ? "Aujourd'hui" : diff === 1 ? 'Hier' : `Il y a ${diff} jours`;
        if (!groups[label]) groups[label] = [];
        groups[label].push(n);
    });

    return Object.entries(groups);
}

type Tab = 'toutes' | 'non_lues';

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Notifications() {
    const [notifs, setNotifs] = useState<Notification[]>(NOTIFS_MOCK);
    const [tab, setTab] = useState<Tab>('toutes');
    const [confirmVider, setConfirmVider] = useState(false);

    const nonLuesCount = notifs.filter((n) => !n.lue).length;

    const visible = tab === 'non_lues' ? notifs.filter((n) => !n.lue) : notifs;
    const grouped = groupByDay(visible);

    const marquerLue = (id: number) =>
        setNotifs((prev) =>
            prev.map((n) => (n.id === id ? { ...n, lue: true } : n)),
        );

    const supprimerUne = (id: number) =>
        setNotifs((prev) => prev.filter((n) => n.id !== id));

    const toutMarquerLu = () =>
        setNotifs((prev) => prev.map((n) => ({ ...n, lue: true })));

    const toutVider = () => {
        setNotifs([]);
        setConfirmVider(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className=" space-y-5 p-6">

                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Notifications
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            {nonLuesCount > 0
                                ? `${nonLuesCount} non lue${nonLuesCount > 1 ? 's' : ''}`
                                : 'Tout est à jour'}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {nonLuesCount > 0 && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={toutMarquerLu}
                                className="gap-1.5 text-xs"
                            >
                                <CheckCheck className="h-3.5 w-3.5" />
                                Tout marquer comme lu
                            </Button>
                        )}
                        {notifs.length > 0 && (
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
                <div className="flex gap-1 rounded-lg border bg-muted/40 p-1 w-fit">
                    {([
                        { id: 'toutes',    label: 'Toutes',   count: notifs.length },
                        { id: 'non_lues',  label: 'Non lues', count: nonLuesCount  },
                    ] as { id: Tab; label: string; count: number }[]).map(({ id, label, count }) => (
                        <button
                            key={id}
                            onClick={() => setTab(id)}
                            className={`
                                flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-medium transition-all
                                ${tab === id
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'}
                            `}
                        >
                            {label}
                            {count > 0 && (
                                <span className={`
                                    flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold
                                    ${tab === id && id === 'non_lues'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted text-muted-foreground'}
                                `}>
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
                                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                        {label}
                                    </span>
                                    <Separator className="flex-1" />
                                </div>

                                <div className="space-y-1.5">
                                    {items.map((notif) => {
                                        const { icon: Icon, bg, color } =
                                            typeConfig[notif.type];

                                        return (
                                            <div
                                                key={notif.id}
                                                className={`
                                                    group relative flex gap-3.5 rounded-xl border p-4 transition-all
                                                    ${notif.lue
                                                        ? 'bg-background hover:bg-muted/30'
                                                        : 'bg-primary/[0.03] hover:bg-primary/[0.06] border-primary/10'}
                                                `}
                                            >
                                                {/* Point non lu */}
                                                {!notif.lue && (
                                                    <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-primary" />
                                                )}

                                                {/* Icône */}
                                                <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${bg}`}>
                                                    <Icon className={`h-4 w-4 ${color}`} />
                                                </div>

                                                {/* Contenu */}
                                                <div className="flex-1 min-w-0 pr-6">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <p className={`text-sm leading-snug ${notif.lue ? 'font-medium' : 'font-semibold'}`}>
                                                            {notif.titre}
                                                        </p>
                                                    </div>
                                                    <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                                                        {notif.message}
                                                    </p>
                                                    <div className="mt-2 flex items-center gap-3">
                                                        <span className="text-xs text-muted-foreground/70">
                                                            {formatRelativeDate(notif.date)}
                                                        </span>
                                                        {!notif.lue && (
                                                            <button
                                                                onClick={() => marquerLue(notif.id)}
                                                                className="text-xs text-primary hover:underline"
                                                            >
                                                                Marquer comme lu
                                                            </button>
                                                        )}
                                                        {notif.lien && (
                                                            <a
                                                                href={notif.lien}
                                                                className="text-xs text-muted-foreground hover:text-foreground hover:underline"
                                                            >
                                                                Voir →
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Bouton supprimer (visible au hover) */}
                                                <button
                                                    onClick={() => supprimerUne(notif.id)}
                                                    className="absolute right-3 top-3 hidden rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground group-hover:flex"
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
                            onClick={toutVider}
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