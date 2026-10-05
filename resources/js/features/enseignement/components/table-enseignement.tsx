import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
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
import { ChevronDown, Trash2, Users } from 'lucide-react';
import { EnseignementData } from '../types/enseignement.types';
import PaginationLinks from '@/components/Pagination';

const TableEnseignement = ({
    enseignements,
    hasFilters,
    onReset,
}: {
    enseignements: EnseignementData;
    hasFilters: boolean | string;
    onReset: () => void;
}) => {
    return (
        <Card className="overflow-hidden shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                        <TableHead>Professeur</TableHead>
                        <TableHead>Cours</TableHead>
                        <TableHead>Classe</TableHead>
                        <TableHead>Actions</TableHead>
                        <TableHead className="w-[80px]" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {enseignements.data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="h-48 text-center">
                                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                    <Users className="h-10 w-10 opacity-20" />
                                    <p className="text-sm">
                                        Aucun enseignement trouvé.
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
                        enseignements.data.map((e) => (
                            <TableRow key={e.id} className="group">
                                <TableCell className="text-sm">
                                    {e.professeur.nom_prenom}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {e.cours.nom}
                                </TableCell>
                                <TableCell className="text-sm">
                                    {e.niveaux.map((niveau) => (
                                        <span className="mr-2 rounded-full bg-blue-50 px-2 py-1 font-bold text-blue-500">
                                            {niveau.nom}
                                        </span>
                                    ))}
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
                                            <DropdownMenuItem
                                                // onClick={() =>
                                                //     onChangeSelectedId(e.id)
                                                // }
                                                className="flex cursor-pointer items-center gap-2 text-destructive focus:text-destructive"
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

                <PaginationLinks links={enseignements.links} />
            </Table>
        </Card>
    );
};

export default TableEnseignement;
