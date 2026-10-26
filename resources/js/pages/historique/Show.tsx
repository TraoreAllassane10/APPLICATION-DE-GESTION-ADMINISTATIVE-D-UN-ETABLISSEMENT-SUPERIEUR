import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { Activite, BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import {
    Activity,
    Calendar,
    Clock,
    FileText,
    Hash,
    Trash2,
    PenLine,
    PlusCircle,
    User,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Historiques', href: '/historiques' },
    { title: 'Détail', href: '/historique' },
];

interface ActiviteProps {
    activite: Activite;
    [key: string]: unknown;
}

// ── Config actions ────────────────────────────────────────────────────────────

const actionConfig: Record<
    string,
    { icon: React.ComponentType<{ className?: string }>; className: string; dotClass: string }
> = {
    Suppression: {
        icon: Trash2,
        className: 'bg-rose-50 text-rose-700 border border-rose-200',
        dotClass: 'bg-rose-500',
    },
    Modification: {
        icon: PenLine,
        className: 'bg-amber-50 text-amber-700 border border-amber-200',
        dotClass: 'bg-amber-500',
    },
    Création: {
        icon: PlusCircle,
        className: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        dotClass: 'bg-emerald-500',
    },
};

const getActionConfig = (action: string) =>
    actionConfig[action] ?? {
        icon: Activity,
        className: 'bg-blue-50 text-blue-700 border border-blue-200',
        dotClass: 'bg-blue-500',
    };

// ── Affichage d'un objet JSON en tableau lisible ──────────────────────────────

function ObjectTable({ data }: { data: Record<string, any> }) {
    const entries = Object.entries(data).filter(([, v]) => v !== null && v !== undefined && v !== '');

    if (entries.length === 0) return <p className="text-sm text-muted-foreground italic">Aucune donnée</p>;

    return (
        <div className="rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
                <tbody className="divide-y">
                    {entries.map(([key, value]) => (
                        <tr key={key} className="hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-2.5 font-medium text-muted-foreground bg-muted/20 w-2/5 capitalize">
                                {key.replace(/_/g, ' ')}
                            </td>
                            <td className="px-4 py-2.5 text-foreground break-all">
                                {typeof value === 'object'
                                    ? <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">{JSON.stringify(value)}</span>
                                    : String(value)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ── Comparaison ancienne / nouvelle valeur ────────────────────────────────────

function DiffTable({
    ancienne,
    nouvelle,
}: {
    ancienne: Record<string, any>;
    nouvelle: Record<string, any>;
}) {
    const keys = [...new Set([...Object.keys(ancienne), ...Object.keys(nouvelle)])];

    const changed = keys.filter((k) => JSON.stringify(ancienne[k]) !== JSON.stringify(nouvelle[k]));
    const unchanged = keys.filter((k) => JSON.stringify(ancienne[k]) === JSON.stringify(nouvelle[k]));

    return (
        <div className="rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                        <th className="px-4 py-2.5 text-left font-semibold w-1/4">Champ</th>
                        <th className="px-4 py-2.5 text-left font-semibold w-[37.5%]">Ancienne valeur</th>
                        <th className="px-4 py-2.5 text-left font-semibold w-[37.5%]">Nouvelle valeur</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {/* Champs modifiés en premier */}
                    {changed.map((key) => (
                        <tr key={key} className="bg-amber-50/60">
                            <td className="px-4 py-2.5 font-medium capitalize">
                                <span className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                                    {key.replace(/_/g, ' ')}
                                </span>
                            </td>
                            <td className="px-4 py-2.5 text-rose-600 line-through opacity-70 break-all">
                                {ancienne[key] != null ? String(ancienne[key]) : <span className="italic text-muted-foreground no-underline">—</span>}
                            </td>
                            <td className="px-4 py-2.5 text-emerald-700 font-medium break-all">
                                {nouvelle[key] != null ? String(nouvelle[key]) : <span className="italic text-muted-foreground">—</span>}
                            </td>
                        </tr>
                    ))}
                    {/* Champs inchangés */}
                    {unchanged.map((key) => (
                        <tr key={key} className="text-muted-foreground">
                            <td className="px-4 py-2.5 capitalize">{key.replace(/_/g, ' ')}</td>
                            <td className="px-4 py-2.5 break-all">{ancienne[key] != null ? String(ancienne[key]) : '—'}</td>
                            <td className="px-4 py-2.5 break-all">{nouvelle[key] != null ? String(nouvelle[key]) : '—'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


const Show = () => {
    const { activite } = usePage<ActiviteProps>().props;

    console.log(activite);
    

    const { icon: ActionIcon, className: actionClass } = getActionConfig(activite.action);

    const isModification =
        activite.action === 'Modification' &&
        activite.ancienne_valeur &&
        activite.nouvelle_valeur;

    const date = new Date(activite.created_at);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-6  space-y-5">

                {/* ── Header ────────────────────────────────────────────── */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Détail de l'activité</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Consultation de l'historique d'une action effectuée sur le système.
                    </p>
                </div>

                {/* ── Carte résumé ──────────────────────────────────────── */}
                <Card className="shadow-sm overflow-hidden">
                    <div className={`h-1.5 ${
                        activite.action === 'Suppression' ? 'bg-rose-500' :
                        activite.action === 'Modification' ? 'bg-amber-500' :
                        activite.action === 'Création' ? 'bg-emerald-500' : 'bg-blue-500'
                    }`} />
                    <CardContent className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            {/* Icône action */}
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${actionClass}`}>
                                <ActionIcon className="w-5 h-5" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <h2 className="text-lg font-bold">{activite.action}</h2>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${actionClass}`}>
                                        {activite.action}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1.5">
                                        <FileText className="w-3.5 h-3.5" />
                                        {activite.entite_type}
                                    </span>
                                    {activite.entite_id && (
                                        <span className="flex items-center gap-1.5">
                                            <Hash className="w-3.5 h-3.5" />
                                            <code className="font-mono text-xs">{activite.entite_id}</code>
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Date */}
                            <div className="shrink-0 text-right">
                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground justify-end">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground justify-end mt-0.5">
                                    <Clock className="w-3 h-3" />
                                    {date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* ── Auteur ────────────────────────────────────────────── */}
                <Card className="shadow-sm">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            Auteur de l'action
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                                {activite.user?.name?.[0]?.toUpperCase() ?? 'U'}
                            </div>
                            <div>
                                <p className="text-sm font-semibold">{activite.user_name ?? '—'}</p>
                                <p className="text-xs text-muted-foreground">{activite.user?.email ?? '—'}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* ── Données : cas Modification (diff) ─────────────────── */}
                {isModification ? (
                    <Card className="shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Activity className="w-4 h-4 text-amber-500" />
                                Modifications apportées
                            </CardTitle>
                            {/* <p className="text-xs text-muted-foreground mt-0.5">
                                Les lignes <span className="text-amber-600 font-medium">surlignées</span> indiquent les champs modifiés.
                            </p> */}
                        </CardHeader>
                        <Separator />
                        <CardContent className="pt-4">
                            <DiffTable
                                ancienne={activite.ancienne_valeur}
                                nouvelle={activite.nouvelle_valeur}
                            />
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        {/* Ancienne valeur */}
                        {activite.ancienne_valeur && (
                            <Card className="shadow-sm">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                                        Données supprimées
                                    </CardTitle>
                                </CardHeader>
                                <Separator />
                                <CardContent className="pt-4">
                                    <ObjectTable data={activite.ancienne_valeur} />
                                </CardContent>
                            </Card>
                        )}

                        {/* Nouvelle valeur */}
                        {activite.nouvelle_valeur && (
                            <Card className="shadow-sm">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                        Données enregistrées
                                    </CardTitle>
                                </CardHeader>
                                <Separator />
                                <CardContent className="pt-4">
                                    <ObjectTable data={activite.nouvelle_valeur} />
                                </CardContent>
                            </Card>
                        )}

                        {/* Aucune donnée */}
                        {!activite.ancienne_valeur && !activite.nouvelle_valeur && (
                            <Card className="shadow-sm">
                                <CardContent className="py-10 text-center text-sm text-muted-foreground">
                                    Aucune donnée associée à cette activité.
                                </CardContent>
                            </Card>
                        )}
                    </>
                )}

            </div>
        </AppLayout>
    );
};

export default Show;