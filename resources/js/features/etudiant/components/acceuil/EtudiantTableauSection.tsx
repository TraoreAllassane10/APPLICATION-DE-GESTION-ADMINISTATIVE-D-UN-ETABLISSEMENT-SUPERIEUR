import { Card } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import Avatar from '../Avatar';
import { Button } from '@/components/ui/button';
import { ChevronDown, Folder, Pencil, Trash2, Users } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import StatutBadge from '../StatutBadge';
import { Link } from '@inertiajs/react';
import PaginationLinks from '@/components/Pagination';
import { EtudiantData } from '../../types/etudiant.types';

interface EtudiantTableauSectionProps {
    etudiants: EtudiantData;
    hasFilters: string | boolean;
    onRest: () => void; 
    onDelete: (ip: string) => void;
}

const EtudiantTableauSection = ({etudiants, hasFilters, onRest, onDelete } : EtudiantTableauSectionProps) => {
    return (
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
                            <TableCell colSpan={7} className="h-48 text-center">
                                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                    <Users className="h-10 w-10 opacity-20" />
                                    <p className="text-sm">
                                        Aucun étudiant ne correspond à vos
                                        critères.
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
                        etudiants.data.map((e) => (
                            <TableRow key={e.ip} className="group">
                                <TableCell>
                                    <div className="flex items-center gap-2.5">
                                        <Avatar
                                            photo={e.photo as string}
                                            prenom={e.prenom}
                                            nom={e.nom}
                                            genre={e.genre}
                                        />
                                        <div>
                                            <p className="text-sm leading-none font-semibold">
                                                {e.civilite} {e.nom} {e.prenom}
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
                                                    <Folder className="h-4 w-4" />{' '}
                                                    Dossier
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
                                                        onDelete(e.ip)
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
    );
};

export default EtudiantTableauSection;
