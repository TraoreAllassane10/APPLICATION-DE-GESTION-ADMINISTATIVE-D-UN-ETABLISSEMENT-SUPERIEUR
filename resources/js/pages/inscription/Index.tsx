import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    Eye,
    GraduationCap,
    PlusCircle,
    Search,
    SlidersHorizontal,
    Trash2,
    X,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
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
import ProgressFinanciere from '@/components/inscription/ProgressFinancier';
import StatCardsInscription from '@/components/inscription/StatCardsInscription';
import PaginationLinks from '@/components/Pagination';
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
import useInscription from '@/hooks/useInscription';
import { Annee, Auth, DataNiveau, Inscription } from '@/types';

interface InscriptionProps {
    annees: Annee[];
    niveaux: DataNiveau[];
    inscriptions: {
        data: Inscription[];
        links: {
            active: boolean;
            label: string;
            page: number;
            url: string;
        }[];
    };
    stats: {
        total_inscription: number;
        total_inscription_annee: number;
    };
      filters: {
        search: string;
        statut: string;
        niveau: string;
    };
    auth: Auth;
    [key: string]: unknown;
}

export default function Index() {
    const { niveaux, inscriptions, stats, filters, auth } =
        usePage<InscriptionProps>().props;

    const [selectedId, setSelectedId] = useState<number | null>(null);

    const isAdmin = auth.user?.roles?.some(
        (role) => role.name == 'Administrateur',
    );

    const [search, setSearch] = useState(filters.search ?? '');
    const [filtreNiveau, setFiltreNiveau] = useState(filters.niveau ?? 'all');
    const [filtreStatut, setFiltreStatut] = useState(filters.statut ?? 'all');

    const hasFilters =
        search || filtreNiveau !== 'all' || filtreStatut !== 'all';

    // Réinitialisation des states de filtrage et recherche
    const reset = () => {
        setSearch('');
        setFiltreNiveau('all');
        setFiltreStatut('all');

        router.visit('/inscriptions');
    };

    const { deleteEtudiant, rechercheEtFiltrage } = useInscription();

    const handleDelete = () => {
        if (selectedId) {
            deleteEtudiant(selectedId);
            setSelectedId(null);
        }
    };

    // Recherche
    const handleSearch = () => {
        rechercheEtFiltrage(search, filtreStatut, filtreNiveau);
    };

    return (
        <AppLayout>
            <Head title="Inscriptions" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Gestion des inscriptions
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            Gérez les inscriptions des étudiants. ({stats.total_inscription_annee} inscrits)
                        </p>
                    </div>
                    <Link href="/inscriptions/create">
                        <Button className="gap-2 hover:bg-red-700 transition duration-300">
                            <PlusCircle className="h-4 w-4" />
                            Nouvelle inscription
                        </Button>
                    </Link>
                </div>

                {/* Filtres */}
                <Card className="shadow-sm">
                    <CardContent className="flex flex-wrap items-center gap-3 p-4">
                        <div className="relative min-w-[220px] flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Nom, prénom ou Identifiant permanent…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-9"
                            />
                        </div>

                        <Select
                            value={filtreNiveau}
                            onValueChange={setFiltreNiveau}
                        >
                            <SelectTrigger className="w-[130px]">
                                <SelectValue placeholder="Niveau" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Tous niveaux
                                </SelectItem>
                                {niveaux.map((n) => (
                                    <SelectItem key={n.id} value={n.id.toString()}>
                                        {n.nom}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={filtreStatut}
                            onValueChange={setFiltreStatut}
                        >
                            <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Statut" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Tous statuts
                                </SelectItem>
                                {['Solde', 'En cours'].map((s) => (
                                    <SelectItem key={s} value={s}>
                                        {s}
                                    </SelectItem>
                                ))}
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
                                    <Search className="h-3.5 w-3.5" />{' '}
                                    Rechercher
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
                            {inscriptions.data.length} résultat
                            {inscriptions.data.length !== 1 ? 's' : ''}
                        </span>
                    </CardContent>
                </Card>

                {/* Tableau */}
                <Card className="overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/40 hover:bg-muted/40">
                                <TableHead>Étudiant</TableHead>

                                <TableHead>Niveau</TableHead>
                                <TableHead>Type</TableHead>

                                {isAdmin && (
                                    <>
                                        <TableHead>Réduction</TableHead>
                                        <TableHead>
                                            Situation financière
                                        </TableHead>
                                    </>
                                )}
                                <TableHead className="w-[100px]" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {inscriptions.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="h-48 text-center"
                                    >
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                            <GraduationCap className="h-10 w-10 opacity-20" />
                                            <p className="text-sm">
                                                Aucune inscription trouvée.
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
                                inscriptions.data.map((ins) => (
                                    <TableRow key={ins.id} className="group">
                                        <TableCell>
                                            <div className="flex items-center gap-2.5">
                                                <Avatar
                                                photo={ins.etudiant.photo as string}
                                                    prenom={ins.etudiant.prenom}
                                                    nom={ins.etudiant.nom}
                                                    genre={ins.etudiant.genre}
                                                />
                                                <div>
                                                    <p className="text-sm leading-none font-medium">
                                                        {ins.etudiant.nom}{' '}
                                                        {ins.etudiant.prenom}
                                                    </p>
                                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                                        {ins.etudiant.ip} ·{' '}
                                                        {
                                                            ins.niveaux[0]
                                                                .filiere.nom
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="space-x-1">
                                            {ins.niveaux.map((niveau) => (
                                                <Badge
                                                    variant="secondary"
                                                    className="font-bold"
                                                >
                                                    {niveau.nom}
                                                </Badge>
                                            ))}
                                        </TableCell>

                                        <TableCell>
                                            <span className="text-xs text-muted-foreground">
                                                {ins.type_inscription}
                                            </span>
                                        </TableCell>

                                        {isAdmin && (
                                            <>
                                                <TableCell className="text-sm font-medium tabular-nums">
                                                    {ins.taux_reduction} %
                                                </TableCell>
                                                <TableCell>
                                                    <ProgressFinanciere
                                                        paye={Number(
                                                            ins.total_paiements,
                                                        )}
                                                        total={
                                                            ins.montant_total
                                                        }
                                                    />
                                                </TableCell>
                                            </>
                                        )}

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
                                                    className="w-48"
                                                >
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/inscriptions/${ins.id}`}
                                                            className="flex cursor-pointer items-center gap-2"
                                                        >
                                                            <Eye className="h-4 w-4" />{' '}
                                                            Voir les détails
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    {/* <DropdownMenuItem className="cursor-pointer gap-2">
                                                        <FileText className="h-4 w-4" />{' '}
                                                        Générer le bulletin
                                                    </DropdownMenuItem> */}
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setSelectedId(
                                                                ins.id,
                                                            );
                                                        }}
                                                        className="cursor-pointer gap-2 text-destructive focus:text-destructive"
                                                    >
                                                        <Trash2 className="h-4 w-4" />{' '}
                                                        Supprimer
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>

                        <PaginationLinks links={inscriptions.links} />
                    </Table>
                </Card>

                {/* Dialog confirmation suppression */}
                <AlertDialog
                    open={!!selectedId}
                    onOpenChange={(open) => {
                        if (!open) setSelectedId(null);
                    }}
                >
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Supprimer cette année academique ?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Cette action est irréversible. La suppression de
                                cette inscription peut entraîner une perte de
                                données liées (paiements, historique, etc).
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDelete}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                Supprimer
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </AppLayout>
    );
}
