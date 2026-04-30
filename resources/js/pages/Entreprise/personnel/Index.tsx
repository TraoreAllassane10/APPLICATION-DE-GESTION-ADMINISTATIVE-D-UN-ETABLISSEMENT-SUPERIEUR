import Avatar from '@/components/etudiant/Avatar';
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
import usePersonnel from '@/hooks/Entreprise/usePersonnel';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Meta, Personnel } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    Edit,
    Eye,
    GraduationCap,
    PlusCircle,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Personnels', href: '/personnels' },
];

export interface PersonnelData {
    data: Personnel[];
    meta: Meta;
}

export interface PersonnelProps {
    personnels: PersonnelData;
    [key: string]: unknown;
}

const Index = () => {
    const { personnels } = usePage<PersonnelProps>().props;

    const [selectedId, setSelectedId] = useState<number | null>(null);

    const { deletePersonnel } = usePersonnel();

    const handleDelete = () => {
        if (selectedId) {
            deletePersonnel(selectedId.toString());
            setSelectedId(null);
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Personnel" />

            <div className="space-y-5 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Personnels
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            Gérez le personnel.
                        </p>
                    </div>

                    <Link href="/personnels/create">
                        <Button className="gap-2 transition duration-300 hover:bg-red-700">
                            <PlusCircle className="h-4 w-4" />
                            Ajouter un employers
                        </Button>
                    </Link>
                </div>

                {/* Tableau */}
                <Card className="overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/40 hover:bg-muted/40">
                                <TableHead>Nom et Prenom</TableHead>
                                <TableHead>Genre</TableHead>
                                <TableHead>Fonction</TableHead>
                                <TableHead>Date de naissance</TableHead>
                                <TableHead className="w-[80px]" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {personnels.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={3}
                                        className="h-48 text-center"
                                    >
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                            <GraduationCap className="h-10 w-10 opacity-20" />
                                            <p className="text-sm">
                                                Aucun employé enregistré.
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                personnels.data.map((personnel) => (
                                    <TableRow
                                        key={personnel.id}
                                        className="group"
                                    >
                                        <TableCell>
                                            <div className="flex items-center gap-2.5">
                                                <Avatar
                                                    nom={personnel.nom}
                                                    prenom={personnel.prenom}
                                                    genre={personnel.genre}
                                                />
                                                <div>
                                                    {personnel.nom}{' '}
                                                    {personnel.prenom}
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-sm text-muted-foreground">
                                            {personnel.genre}
                                        </TableCell>

                                        <TableCell className="text-sm text-muted-foreground">
                                            {personnel.fonction}
                                        </TableCell>

                                        <TableCell className="text-sm text-muted-foreground">
                                            {new Date(
                                                personnel.date_naissance,
                                            ).toLocaleDateString('fr-FR')}
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
                                                    className="w-48"
                                                >
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/personnels/${personnel.id}/show`}
                                                            className="flex cursor-pointer items-center gap-2"
                                                        >
                                                            <Eye className="h-4 w-4" />{' '}
                                                            Profil
                                                        </Link>
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/personnels/${personnel.id}/edit`}
                                                            className="flex cursor-pointer items-center gap-2"
                                                        >
                                                            <Edit className="h-4 w-4" />{' '}
                                                            Modifier
                                                        </Link>
                                                    </DropdownMenuItem>

                                                    <DropdownMenuSeparator />

                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            setSelectedId(
                                                                Number(
                                                                    personnel.id,
                                                                ),
                                                            )
                                                        }
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
                                Supprimer cet employé ?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Cette action est irréversible. La suppression de
                                cet peut entraîner une perte de données liées
                                (formations, experiences, etc.).
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
};

export default Index;
