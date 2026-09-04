import PaginationLinks from '@/components/Pagination';
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
import { Meta } from '@/types';
import { Link } from '@inertiajs/react';
import { ChevronDown, Edit, Folder, GraduationCap, Trash2, UserRound } from 'lucide-react';
import { Professeur } from '../types/professeur.types';
import Avatar from '@/features/etudiant/components/Avatar';

interface TableProfesseurProps {
    professeurs: {
        data: Professeur[];
        meta: Meta;
    };
    setSelectedId: React.Dispatch<React.SetStateAction<number | null>>
}

const TableProfesseur = ({ professeurs, setSelectedId }: TableProfesseurProps) => {
    return (
        <div>
            {/* Tableau */}
            <Card className="overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/40 hover:bg-muted/40">
                            <TableHead>Nom et prenom</TableHead>
                            <TableHead>Matricule</TableHead>
                            <TableHead>Date de naissance</TableHead>
                            <TableHead>Spécialité</TableHead>
                            <TableHead>Grade</TableHead>
                            <TableHead className="w-[80px]" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {professeurs.data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={4}
                                    className="h-48 text-center"
                                >
                                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                        <UserRound className="h-10 w-10 opacity-20" />
                                        <p className="text-sm">
                                            Aucun professeur enregistré.
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            professeurs.data.map((prof) => {
                                const nom = prof.nom_prenom.split(' ');

                                return (
                                    <TableRow key={prof.id} className="group">
                                        <TableCell>
                                            <div className="flex flex-row place-items-center gap-2">
                                                <Avatar
                                                    nom={nom[0]}
                                                    prenom={nom[1]}
                                                    genre={
                                                        prof.sexe == 'M'
                                                            ? 'Masculin'
                                                            : 'Féminin'
                                                    }
                                                />
                                                {prof.nom_prenom}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <span className="rounded-sm bg-accent p-1">
                                                {prof.matricule}
                                            </span>
                                        </TableCell>

                                        <TableCell>
                                            {prof.date_naissance}
                                        </TableCell>

                                        <TableCell>{prof.specialite}</TableCell>

                                        <TableCell>
                                            {
                                                prof.annee_academiques[0].pivot
                                                    .grade
                                            }
                                        </TableCell>

                                        {/* Actions */}
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
                                                            href={`/professeur/${prof.id}/show`}
                                                            className="flex cursor-pointer items-center gap-2"
                                                        >
                                                            <Folder className="h-4 w-4" />
                                                            Dossier
                                                        </Link>
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/professeur/${prof.id}/assigner-classe`}
                                                            className="flex cursor-pointer items-center gap-2"
                                                        >
                                                            <GraduationCap className="h-4 w-4" />
                                                            Attribuer des classes
                                                        </Link>
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/professeur/${prof.id}/edit`}
                                                            className="flex cursor-pointer items-center gap-2"
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                            Modifier
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            setSelectedId(
                                                                prof.id,
                                                            )
                                                        }
                                                        className="cursor-pointer gap-2 text-destructive focus:text-destructive"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        Supprimer
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

            {/* Pagination */}
            <PaginationLinks links={professeurs.meta.links} />
        </div>
    );
};

export default TableProfesseur;
