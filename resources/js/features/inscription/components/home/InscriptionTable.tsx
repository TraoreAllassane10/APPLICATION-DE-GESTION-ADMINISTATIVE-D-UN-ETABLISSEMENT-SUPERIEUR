import PaginationLinks from '@/components/Pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import Avatar from '@/features/etudiant/components/Avatar';
import { Link } from '@inertiajs/react';
import { ChevronDown, Eye, GraduationCap, Trash2 } from 'lucide-react';
import { Inscription } from '../../types/inscription.types';
import ProgressFinanciere from '../ProgressFinancier';

interface InscriptionTableProps {
    isAdmin: boolean | undefined;
    inscriptions: {
        data: Inscription[];
        links: {
            active: boolean;
            label: string;
            page: number;
            url: string;
        }[];
    };
    hasFilters: string | boolean;
    onReset: () => void;
    onChangeSelectedId: (value: React.SetStateAction<number | null>) => void;
}

const InscriptionTable = ({isAdmin, inscriptions, hasFilters, onReset, onChangeSelectedId} : InscriptionTableProps) => {
    return (
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
                                                    onClick={onReset}
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
                                                    photo={
                                                        ins.etudiant
                                                            .photo as string
                                                    }
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
                                                            onChangeSelectedId(
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
    );
};

export default InscriptionTable;
