import Avatar from '@/components/etudiant/Avatar';
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
import useProfesseur from '@/hooks/useProfesseur';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Professeur } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    Edit,
    Folder,
    PlusCircle,
    Sheet,
    Trash2,
    UserRound,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Professeurs', href: '/professeur' },
];

interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: { active: boolean; label: string; page: number; url: string }[];
}

interface ProfesseurProps {
    professeurs: {
        data: Professeur[];
        meta: Meta;
    };
    [key: string]: unknown;
}

const Index = () => {
    const { professeurs } = usePage<ProfesseurProps>().props;
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const { deleteProfesseur } = useProfesseur();

    const handleDelete = () => {
        if (selectedId) {
            deleteProfesseur(selectedId);
            setSelectedId(null);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-5 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Gestion des enseignants
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            {professeurs.data.length} professeur
                            {professeurs.data.length !== 1 ? 's' : ''}{' '}
                            enregistré
                            {professeurs.data.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    <div className="flex place-items-center gap-2">
                        <a href={`professeur/export`}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-1.5"
                            >
                                <Sheet className="h-3.5 w-3.5" /> Exporter vers
                                Excel
                            </Button>
                        </a>

                        <Link href="professeur/create">
                            <Button className="gap-2 transition duration-300 hover:bg-red-700">
                                <PlusCircle className="h-4 w-4" />
                                Ajouter un enseignant
                            </Button>
                        </Link>
                    </div>
                </div>

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
                                        <TableRow
                                            key={prof.id}
                                            className="group"
                                        >
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

                                            <TableCell>
                                                {prof.specialite}
                                            </TableCell>

                                            <TableCell>
                                                {
                                                    prof.annee_academiques[0]
                                                        .pivot.grade
                                                }
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
                                                                href={`/professeur/${prof.id}/show`}
                                                                className="flex cursor-pointer items-center gap-2"
                                                            >
                                                                <Folder className="h-4 w-4" />
                                                                Dossier
                                                            </Link>
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem
                                                            asChild
                                                        >
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
                            Supprimer ce professeur ?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Cette action est irréversible. Les données liées à
                            ce professeur (séances, cours, etc.) pourraient
                            également être affectées.
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
        </AppLayout>
    );
};

export default Index;
