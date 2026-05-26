import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    Eye,
    Pencil,
    PlusCircle,
    Search,
    SlidersHorizontal,
    Trash2,
    Users,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
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

import Avatar from '@/components/etudiant/Avatar';
import EtudiantStats from '@/components/etudiant/EtudiantStats';
import StatutBadge from '@/components/etudiant/StatutBadge';
import PaginationLinks from '@/components/Pagination';
import useEtudiant from '@/hooks/useEtudiant';
import { Etudiant, Meta, StatsEtudiant } from '@/types';

interface EtudiantData {
    data: Etudiant[];
    meta: Meta;
}

interface EtudiantProps {
    stats: StatsEtudiant;
    etudiants: EtudiantData;
    filters: {
        search: string;
        statut: string;
        genre: string;
    };
    [key: string]: unknown;
}

export default function Index() {
    const { etudiants, stats, filters } = usePage<EtudiantProps>().props;

    const [search, setSearch] = useState(filters.search ?? '');
    const [filtreStatut, setFiltreStatut] = useState(filters.statut ?? 'all');
    const [filtreGenre, setFiltreGenre] = useState(filters.genre ?? 'all');

    const hasFilters =
        search || filtreStatut !== 'all' || filtreGenre !== 'all';

    const reset = () => {
        setSearch('');
        setFiltreStatut('all');
        setFiltreGenre('all');

        router.visit("/etudiants")
    };

    const { deleteEtudiant, rechercheEtFiltrage } = useEtudiant();

    const handleDelete = (ip: string) => {
        if (ip) {
            deleteEtudiant(ip);
        }
    };

    // Synchronisation des states
    useEffect(() => {
        setSearch(filters.search ?? '');
        setFiltreStatut(filters.statut ?? 'all');
        setFiltreGenre(filters.genre ?? 'all');
    }, [filters]);

    const handleSearch = () => {
        rechercheEtFiltrage(search, filtreStatut, filtreGenre)
    }

    return (
        <AppLayout>
            <Head title="Étudiants" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Étudiants
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            Gérez le fichier des étudiants enregistrés.
                        </p>
                    </div>
                    <Link href="/etudiants/create">
                        <Button className="gap-2 hover:bg-red-700 transition duration-300">
                            <PlusCircle className="h-4 w-4" />
                            Nouvel étudiant
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <EtudiantStats stats={stats} />

                {/* Filtres */}
                <Card className="shadow-sm">
                    <CardContent className="flex flex-wrap items-center gap-3 p-4">
                        <div className="relative min-w-[220px] flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Nom, Identifiant permanent..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>

                        <Select
                            value={filtreStatut}
                            onValueChange={setFiltreStatut}
                        >
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Statut" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Tous statuts
                                </SelectItem>
                                <SelectItem value="Affecté">Affecté</SelectItem>
                                <SelectItem value="Naff">Naff</SelectItem>
                                <SelectItem value="Réaffecté">
                                    Réaffecté
                                </SelectItem>
                                <SelectItem value="Transfert">
                                    Transfert
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            value={filtreGenre}
                            onValueChange={setFiltreGenre}
                        >
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Genre" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous genres</SelectItem>
                                <SelectItem value="Masculin">
                                    Masculin
                                </SelectItem>
                                <SelectItem value="Féminin">Féminin</SelectItem>
                            </SelectContent>
                        </Select>

                        {hasFilters && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleSearch}
                                    className="gap-1.5 text-muted-foreground"
                                >
                                    <Search className="h-3.5 w-3.5" /> Rechercher
                                </Button>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={reset}
                                    className="gap-1.5 text-muted-foreground"
                                >
                                    <X className="h-3.5 w-3.5" /> Réinitialiser
                                </Button>
                            </>
                        )}

                        <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                            <SlidersHorizontal className="h-3.5 w-3.5" />
                            {etudiants.data.length} résultat
                            {etudiants.data.length !== 1 ? 's' : ''}
                        </span>
                    </CardContent>
                </Card>

                {/* Tableau */}
                <Card className="overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/40 hover:bg-muted/40">
                                <TableHead>Étudiant</TableHead>
                                <TableHead>IP</TableHead>
                                <TableHead>Date de naissance</TableHead>
                                <TableHead>Lieu de naissance</TableHead>
                                <TableHead>Nationalité</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead className="w-[80px]" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {etudiants.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="h-48 text-center"
                                    >
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                            <Users className="h-10 w-10 opacity-20" />
                                            <p className="text-sm">
                                                Aucun étudiant ne correspond à
                                                vos critères.
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
                                etudiants.data.map((e) => (
                                    <TableRow key={e.ip} className="group">
                                        <TableCell>
                                            <div className="flex items-center gap-2.5">
                                                <Avatar
                                                    prenom={e.prenom}
                                                    nom={e.nom}
                                                    genre={e.genre}
                                                />
                                                <div>
                                                    <p className="text-sm leading-none font-semibold">
                                                        {e.civilite} {e.nom}{' '}
                                                        {e.prenom}
                                                    </p>
                                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                                        {e.email ?? (
                                                            <span className="italic">
                                                                Pas d'email
                                                            </span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                                                {e.ip}
                                            </code>
                                        </TableCell>

                                        <TableCell className="text-sm text-muted-foreground tabular-nums">
                                            {new Date(
                                                e.date_naissance,
                                            ).toLocaleDateString('fr-FR')}
                                        </TableCell>

                                        <TableCell className="text-sm">
                                            {e.lieu_naissance}
                                        </TableCell>

                                        <TableCell className="text-sm">
                                            {e.nationnalite}
                                        </TableCell>

                                        <TableCell>
                                            <StatutBadge statut={e.statut} />
                                        </TableCell>

                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
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
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/etudiants/${e.ip}/show`}
                                                            className="flex cursor-pointer items-center gap-2"
                                                        >
                                                            <Eye className="h-4 w-4" />{' '}
                                                            Voir le profil
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/etudiants/${e.ip}/edit`}
                                                            className="flex cursor-pointer items-center gap-2"
                                                        >
                                                            <Pencil className="h-4 w-4" />{' '}
                                                            Modifier
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="cursor-pointer gap-2 text-destructive focus:text-destructive">
                                                        <Link
                                                            onClick={() =>
                                                                handleDelete(
                                                                    e.ip,
                                                                )
                                                            }
                                                            className="flex cursor-pointer items-center gap-2"
                                                        >
                                                            <Trash2 className="h-4 w-4" />{' '}
                                                            Supprimer
                                                        </Link>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>

                        <PaginationLinks links={etudiants.meta.links} />
                    </Table>
                </Card>
            </div>
        </AppLayout>
    );
}
