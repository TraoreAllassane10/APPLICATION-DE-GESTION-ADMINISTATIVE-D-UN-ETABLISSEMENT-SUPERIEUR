import ActionBadgeHistorique from '@/components/historique/ActionBadgeHistorique';
import StatCardsHistoriques from '@/components/historique/StatCardsHistoriques';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Activite, BreadcrumbItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    Activity,
    ChevronDown,
    Eye,
    History,
    PenLine,
    PlusCircle,
    Search,
    SlidersHorizontal,
    Trash2,
    X,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Historique', href: '/historique' },
];

interface ActionProps {
    activites: Activite[];
    [key: string]: unknown;
}

// ── Config actions ────────────────────────────────────────────────────────────

const actionConfig: Record<
    string,
    {
        icon: React.ComponentType<{ className?: string }>;
        className: string;
        dotClass: string;
    }
> = {
    Création: {
        icon: PlusCircle,
        className: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        dotClass: 'bg-emerald-500',
    },
    Modification: {
        icon: PenLine,
        className: 'bg-amber-50 text-amber-700 border border-amber-200',
        dotClass: 'bg-amber-500',
    },
    Suppression: {
        icon: Trash2,
        className: 'bg-rose-50 text-rose-700 border border-rose-200',
        dotClass: 'bg-rose-500',
    },
};

const getActionConfig = (action: string) =>
    actionConfig[action] ?? {
        icon: Activity,
        className: 'bg-blue-50 text-blue-700 border border-blue-200',
        dotClass: 'bg-blue-500',
    };

const Index = () => {
    const { activites } = usePage<ActionProps>().props;

    const [search, setSearch] = useState('');
    const [filtreAction, setFiltreAction] = useState('all');
    const [filtreEntite, setFiltreEntite] = useState('all');
    const [filtreDate, setFiltreDate] = useState('');

    // Valeurs uniques pour les selects
    const entitesUniques = [
        ...new Set(activites.map((a) => a.entite_type).filter(Boolean)),
    ].sort();

    const filtered = activites.filter((a) => {
        const q = search.toLowerCase();
        const matchSearch =
            !q ||
            a.user.name.toLowerCase().includes(q) ||
            a.entite_type?.toLowerCase().includes(q) ||
            (a.entite_id ?? '').toLowerCase().includes(q);

        const matchAction =
            filtreAction === 'all' || a.action === filtreAction;

        const matchEntite =
            filtreEntite === 'all' || a.entite_type === filtreEntite;

        const matchDate =
            !filtreDate ||
            new Date(a.created_at).toLocaleDateString('fr-CA') === filtreDate;

        return matchSearch && matchAction && matchEntite && matchDate;
    });

    const hasFilters =
        search ||
        filtreAction !== 'all' ||
        filtreEntite !== 'all' ||
        filtreDate;

    const reset = () => {
        setSearch('');
        setFiltreAction('all');
        setFiltreEntite('all');
        setFiltreDate('');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-5 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Historique des activités
                    </h1>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                        Consultez l'ensemble des actions effectuées sur le
                        système.
                    </p>
                </div>

                {/* Stats */}
                <StatCardsHistoriques activites={activites} />

                {/* Filtres */}
                <Card className="shadow-sm">
                    <CardContent className="flex flex-wrap items-center gap-3 p-4">
                        {/* Recherche */}
                        <div className="relative min-w-[220px] flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Utilisateur, entité, identifiant…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>

                        {/* Action */}
                        <Select
                            value={filtreAction}
                            onValueChange={setFiltreAction}
                        >
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Action" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Toutes actions
                                </SelectItem>
                                {['Création', 'Modification', 'Suppression'].map(
                                    (a) => (
                                        <SelectItem key={a} value={a}>
                                            {a}
                                        </SelectItem>
                                    ),
                                )}
                            </SelectContent>
                        </Select>

                        {/* Entité */}
                        <Select
                            value={filtreEntite}
                            onValueChange={setFiltreEntite}
                        >
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Entité" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Toutes entités
                                </SelectItem>
                                {entitesUniques.map((e) => (
                                    <SelectItem key={e} value={e}>
                                        {e}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Date */}
                        <Input
                            type="date"
                            value={filtreDate}
                            onChange={(e) => setFiltreDate(e.target.value)}
                            className="w-[160px]"
                        />

                        {/* Reset */}
                        {hasFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={reset}
                                className="gap-1.5 text-muted-foreground"
                            >
                                <X className="h-3.5 w-3.5" /> Réinitialiser
                            </Button>
                        )}

                        <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                            <SlidersHorizontal className="h-3.5 w-3.5" />
                            {filtered.length} résultat
                            {filtered.length !== 1 ? 's' : ''}
                        </span>
                    </CardContent>
                </Card>

                {/* Tableau */}
                <Card className="overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/40 hover:bg-muted/40">
                                <TableHead>Utilisateur</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>Entité</TableHead>
                                <TableHead>Identifiant</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="w-[80px]" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="h-48 text-center"
                                    >
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                            <History className="h-10 w-10 opacity-20" />
                                            <p className="text-sm">
                                                Aucune activité trouvée.
                                            </p>
                                            {hasFilters && (
                                                <Button
                                                    variant="link"
                                                    size="sm"
                                                    onClick={reset}
                                                >
                                                    Effacer les filtres
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filtered.map((activite) => {
                                    const { icon: Icon } = getActionConfig(
                                        activite.action,
                                    );
                                    const date = new Date(activite.created_at);
                                    return (
                                        <TableRow
                                            key={activite.id}
                                            className="group"
                                        >
                                            {/* Utilisateur */}
                                            <TableCell>
                                                <div className="flex items-center gap-2.5">
                                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                                        {activite.user ? activite.user?.name[0].toUpperCase() : (<span>US</span>)}
                                                    </div>
                                                    <span className="text-sm font-medium">
                                                        {activite.user_name}
                                                    </span>
                                                </div>
                                            </TableCell>

                                            {/* Action */}
                                            <TableCell>
                                                <ActionBadgeHistorique getActionConfig={getActionConfig}
                                                    action={activite.action}
                                                />
                                            </TableCell>

                                            {/* Entité */}
                                            <TableCell>
                                                <Badge
                                                    variant="secondary"
                                                    className="font-medium"
                                                >
                                                    {activite.entite_type}
                                                </Badge>
                                            </TableCell>

                                            {/* Identifiant */}
                                            <TableCell>
                                                {activite.entite_id ? (
                                                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                                                        {activite.entite_id}
                                                    </code>
                                                ) : (
                                                    <span className="text-xs text-muted-foreground">
                                                        —
                                                    </span>
                                                )}
                                            </TableCell>

                                            {/* Date */}
                                            <TableCell className="text-sm tabular-nums text-muted-foreground">
                                                <span>
                                                    {date.toLocaleDateString(
                                                        'fr-FR',
                                                        {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        },
                                                    )}
                                                </span>
                                                <span className="ml-1.5 text-xs opacity-60">
                                                    {date.toLocaleTimeString(
                                                        'fr-FR',
                                                        {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        },
                                                    )}
                                                </span>
                                            </TableCell>

                                            {/* Actions */}
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 gap-1 opacity-0 transition-opacity group-hover:opacity-100"
                                                        >
                                                            Actions{' '}
                                                            <ChevronDown className="h-3 w-3" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        align="end"
                                                        className="w-44"
                                                    >
                                                        <DropdownMenuItem
                                                            asChild
                                                        >
                                                            <Link
                                                                href={`/historiques/${activite.id}`}
                                                                className="flex cursor-pointer items-center gap-2"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                                Voir le détail
                                                            </Link>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Index;