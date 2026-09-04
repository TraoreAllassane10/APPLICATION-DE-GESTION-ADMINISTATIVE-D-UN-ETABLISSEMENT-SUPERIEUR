import PaginationLinks from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronDown, Eye, Folder, History } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { fmt } from '@/utils/util';
import { paiementData } from '../types/paiement.types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link } from '@inertiajs/react';

interface PaiementTableProps {
    paiements: paiementData;
    hasFilters: boolean;
    onRest: () => void;
}

const PaiementTable = ({paiements, hasFilters, onRest}: PaiementTableProps) => {
  
  return (
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
                                                    onClick={onRest}
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
                                                                href={`/inscriptions/${paiement.inscription?.id}`}
                                                                className="flex cursor-pointer items-center gap-2"
                                                            >
                                                                <Folder className="h-4 w-4" />
                                                                Voir son inscription
                                                            </Link>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}

                            <PaginationLinks links={paiements.links} />
                        </TableBody>
                    </Table>
                </Card>
  )
}

export default PaiementTable
