import PaginationLinks from '@/components/Pagination';
import StatsCardsPaiements from '@/components/paiement/StatsCardsPaiements';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import usePaiement from '@/hooks/usePaiement';
import AppLayout from '@/layouts/app-layout';
import { Annee, BreadcrumbItem, Meta, Paiement } from '@/types';
import { fmt } from '@/utils/util';
import { router, usePage } from '@inertiajs/react';
import { History, Search, Sheet, X } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Historique', href: '/historique' },
];

interface paiementData {
    data: Paiement[];
    meta: Meta;
    links: any;
}

interface ActionProps {
    paiements: paiementData;
    anneeActive: Annee;
    total_recette_inscriptions: number;
    total_encaisse: number;
    total_reste: number;
    [key: string]: unknown;
}

const Index = () => {
    const {
        total_recette_inscriptions,
        total_encaisse,
        total_reste,
        paiements,
        anneeActive,
    } = usePage<ActionProps>().props;

    const [filtrePeriode, setFiltrePeriode] = useState('all');
    const hasFilters = filtrePeriode !== 'all';

    const { rechercheEtFiltrage } = usePaiement();

    const reset = () => {
        setFiltrePeriode('all');
        router.visit('/paiements');
    };

    const handleSearch = () => {
        rechercheEtFiltrage(filtrePeriode);
    };

    const handleExport = () => {
        window.location.href = `/paiements/export?periode=${filtrePeriode}`
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-5 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Gestion des paiements
                    </h1>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                        Consultez l'ensemble des paiements de scolarité
                        éffectué. ({anneeActive.libelle})
                    </p>
                </div>

                {/* Stats */}
                <StatsCardsPaiements
                    total_recette_inscriptions={total_recette_inscriptions}
                    total_encaisse={total_encaisse}
                    total_reste={total_reste}
                />

                {/* Filtres */}
                <Card className="shadow-sm">
                    <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
                        <div className="flex items-center">
                            <Select
                                value={filtrePeriode}
                                onValueChange={setFiltrePeriode}
                            >
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue placeholder="Période" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem
                                        value="all"
                                        disabled={filtrePeriode !== 'all'}
                                    >
                                        Tout
                                    </SelectItem>
                                    <SelectItem value="Hebdomadaire">
                                        Hebdomadaire
                                    </SelectItem>
                                    <SelectItem value="Mensuel">
                                        Mensuel
                                    </SelectItem>
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
                                        <X className="h-3.5 w-3.5" />{' '}
                                        Réinitialiser
                                    </Button>
                                </>
                            )}
                        </div>

                        <Button onClick={handleExport} variant="outline" size="sm" className="gap-1.5">
                            <Sheet className="h-3.5 w-3.5" /> Exporter la liste
                            des paiements
                        </Button>
                    </CardContent>
                </Card>

                {/* Tableau */}
                <Card className="overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/40 hover:bg-muted/40">
                                <TableHead>Reférence</TableHead>
                                <TableHead>Montant</TableHead>
                                <TableHead>Etudiant</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Methode de paiement</TableHead>
                                <TableHead>Nom du receveur</TableHead>

                                <TableHead className="w-[80px]" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paiements.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="h-48 text-center"
                                    >
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                            <History className="h-10 w-10 opacity-20" />
                                            <p className="text-sm">
                                                Aucun paiement n'a été trouvé.
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
                                paiements.data.map((paiement) => {
                                    const date = new Date(
                                        paiement.date_paiement,
                                    );
                                    return (
                                        <TableRow
                                            key={paiement.id}
                                            className="group"
                                        >
                                            <TableCell className="text-sm tracking-wide text-muted-foreground">
                                                {paiement.reference}
                                            </TableCell>

                                            <TableCell>
                                                {fmt(paiement.montant)}
                                            </TableCell>

                                            <TableCell className="text-sm tracking-wide">
                                                {
                                                    paiement.inscription
                                                        ?.etudiant.prenom
                                                }{' '}
                                                {
                                                    paiement.inscription
                                                        ?.etudiant.nom
                                                }
                                            </TableCell>

                                            {/* Date */}
                                            <TableCell className="text-sm text-muted-foreground tabular-nums">
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
                                            </TableCell>

                                            <TableCell className="text-sm tracking-wide text-muted-foreground">
                                                {paiement.methode_paiement}
                                            </TableCell>

                                            <TableCell className="text-sm tracking-wide text-muted-foreground">
                                                {paiement.nom_receveur}
                                            </TableCell>

                                            {/* Actions */}
                                            {/* <TableCell>
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
                                                                href={`/historiques/${paiement.id}`}
                                                                className="flex cursor-pointer items-center gap-2"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                                Voir le détail
                                                            </Link>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell> */}
                                        </TableRow>
                                    );
                                })
                            )}

                            <PaginationLinks links={paiements.links} />
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Index;
