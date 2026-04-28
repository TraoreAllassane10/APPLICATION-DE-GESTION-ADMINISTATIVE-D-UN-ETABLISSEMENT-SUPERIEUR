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
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Personnels', href: '/personnels' },
];

const Index = () => {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleDelete = () => {
        if (selectedId) {
            // deleteNiveau(selectedId);
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
                            Gérez les personnels.
                        </p>
                    </div>

                    <Link href='/personnels/create'>
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
                                <TableHead>Nom</TableHead>
                                <TableHead>Prenom</TableHead>
                                <TableHead>Genre</TableHead>
                                <TableHead>Fonction</TableHead>
                                <TableHead>Telephone</TableHead>
                                <TableHead className="w-[80px]" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* {niveaux.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-48 text-center">
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                            <GraduationCap className="h-10 w-10 opacity-20" />
                                            <p className="text-sm">Aucun niveau enregistré.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                niveaux.data.map((niveau) => (
                                    <TableRow key={niveau.id} className="group">

                                        <TableCell>
                                            <div className="flex items-center gap-2.5">
                                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                                                    {niveau.nom.slice(0, 2).toUpperCase()}
                                                </div>
                                                <span className="text-sm font-medium">
                                                    {niveau.nom}
                                                </span>
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-sm text-muted-foreground">
                                            {niveau.filiere.nom}
                                        </TableCell>

                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 gap-1 opacity-0 transition-opacity group-hover:opacity-100"
                                                    >
                                                        Actions <ChevronDown className="h-3 w-3" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/niveau/${niveau.id}/edit`}
                                                            className="flex cursor-pointer items-center gap-2"
                                                        >
                                                            <Edit className="h-4 w-4" /> Modifier
                                                        </Link>
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/niveau/${niveau.id}/liste-de-classe`}
                                                            className="flex cursor-pointer items-center gap-2"
                                                        >
                                                            <Users2Icon className="h-4 w-4" /> Liste de classe
                                                        </Link>
                                                    </DropdownMenuItem>


                                                    <DropdownMenuSeparator />

                                                    <DropdownMenuItem
                                                        onClick={() => setSelectedId(niveau.id)}
                                                        className="cursor-pointer gap-2 text-destructive focus:text-destructive"
                                                    >
                                                        <Trash2 className="h-4 w-4" /> Supprimer
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>

                                    </TableRow>
                                ))
                            )} */}
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
                                Supprimer ce niveau ?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                Cette action est irréversible. La suppression de
                                ce niveau peut entraîner une perte de données
                                liées (inscriptions, scolarités, séances, etc.).
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
