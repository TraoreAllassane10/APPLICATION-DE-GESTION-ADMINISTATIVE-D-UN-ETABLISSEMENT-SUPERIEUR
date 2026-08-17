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
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import usePeriodeAcademique from '@/hooks/usePeriodeAcademique';
import AppLayout from '@/layouts/app-layout';
import ConfigurationLayout from '@/layouts/configurations/ConfigurationLayout';
import { Annee, BreadcrumbItem, Periode } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Periode Académique',
        href: '/periodes',
    },
];

interface PeriodeAcademiqueProps {
    periodes: Periode[];
    [key: string]: unknown;
}

const Index = () => {
    const { periodes } = usePage<PeriodeAcademiqueProps>().props;

    const [libelle, setLibelle] = useState('');
    const [date_debut, setDateDebut] = useState('');
    const [date_fin, setDateFin] = useState('');

    const [selectedId, setSelectedId] = useState<number | null>(null);

    const { createPeriode, deletePeriode } = usePeriodeAcademique();

    // Enregistrement d'une annee
    const handleSubmit = async () => {
        // Verification des données
        if (libelle == '' || date_debut == undefined || date_fin == undefined) {
            toast.error('Veuillez remplir tous les champs svp !');
            return;
        }

        // Creation d'une nouvelle année
        await createPeriode({
            libelle,
            date_debut: new Date(date_debut),
            date_fin: new Date(date_fin),
        });

        // Nettoye de l'etat du composant
        setLibelle('');
        setDateDebut('');
        setDateFin('');
    };

    // Suppression d'une année
    const handleDelete = async () => {
        if (selectedId) {
            await deletePeriode(selectedId);

            setSelectedId(null);
        }
    };

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <ConfigurationLayout>
                    <div>
                        {/* Entete et le bouton d'ajout */}
                        <div className="my-2 flex place-items-center justify-between">
                            <h1 className="text-2xl font-bold">
                                Gestion des periodes academiques
                            </h1>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                                    >
                                        Nouvelle période académique
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>
                                            Nouvelle Période Académique
                                        </SheetTitle>
                                        <SheetDescription>
                                            Ajouter une période académique
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="sheet-demo-name">
                                                Libellé
                                            </Label>
                                            <Input
                                                value={libelle}
                                                onChange={(e) =>
                                                    setLibelle(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="sheet-demo-username">
                                                Date de debut
                                            </Label>
                                            <Input
                                                type="date"
                                                value={date_debut}
                                                onChange={(e) =>
                                                    setDateDebut(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="sheet-demo-username">
                                                Date de fin
                                            </Label>
                                            <Input
                                                type="date"
                                                value={date_fin}
                                                onChange={(e) =>
                                                    setDateFin(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <SheetFooter>
                                        <Button onClick={handleSubmit}>
                                            Enregistrer
                                        </Button>
                                        <SheetClose asChild>
                                            <Button variant="outline">
                                                Fermer
                                            </Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>

                        <Card>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted">
                                            <TableHead>Libellé</TableHead>
                                            <TableHead>Date de Début</TableHead>
                                            <TableHead>Date de Fin</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {periodes.map((periode) => (
                                            <TableRow key={periode.id}>
                                                <TableCell>
                                                    {periode.libelle}
                                                </TableCell>
                                                <TableCell>
                                                    {periode.date_debut}
                                                </TableCell>
                                                <TableCell>
                                                    {periode.date_fin}
                                                </TableCell>
                                                <TableCell className="flex gap-2">
                                                    <Link
                                                        href={`periodes/${periode.id}/edit`}
                                                    >
                                                        <Edit
                                                            size={20}
                                                            className="cursor-pointer text-blue-600 hover:text-blue-800"
                                                        />
                                                    </Link>

                                                    <Trash
                                                        onClick={() => {
                                                            setSelectedId(
                                                                periode.id,
                                                            );
                                                       
                                                        }}
                                                        size={20}
                                                        className="cursor-pointer text-red-600 hover:text-red-800"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
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
                                        Supprimer une periode academique ?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Attention ! La suppession d'une periode
                                        academique entrainera la suppession des
                                        données liées à cette periode .
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Annuler
                                    </AlertDialogCancel>
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
                </ConfigurationLayout>
            </AppLayout>
        </div>
    );
};

export default Index;
