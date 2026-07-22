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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    NativeSelect,
    NativeSelectOption,
} from '@/components/ui/native-select';
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import useNiveau from '@/hooks/useNiveau';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, FiliereData, Niveau } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    Edit,
    GraduationCap,
    PlusCircle,
    Trash2,
    Users2Icon,
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Niveau', href: '/niveau' }];

interface NiveauProps {
    niveaux: Niveau;
    filieres: { data: FiliereData[] };
    [key: string]: unknown;
}

const Index = () => {
    const { niveaux, filieres } = usePage<NiveauProps>().props;

    const [nom, setNom] = useState('');
    const [filiere_id, setFiliereId] = useState('');
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const { createNiveau, deleteNiveau } = useNiveau();

    const handleSubmit = () => {
        if (nom === '' || filiere_id === '') {
            toast.error('Veuillez remplir tous les champs !');
            return;
        }
        createNiveau({ nom, filiere_id });
        setNom('');
        setFiliereId('');
    };

    const handleDelete = () => {
        if (selectedId) {
            deleteNiveau(selectedId);
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
                            Gestion des classes
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            Gérez les niveaux et leurs filières.
                        </p>
                    </div>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button className="gap-2 transition duration-300 hover:bg-red-700">
                                <PlusCircle className="h-4 w-4" />
                                Ajouter un niveau
                            </Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Nouveau niveau</SheetTitle>
                                <SheetDescription>
                                    Renseignez les informations du nouveau
                                    niveau.
                                </SheetDescription>
                            </SheetHeader>
                            <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                <div className="grid gap-3">
                                    <Label>Nom du niveau</Label>
                                    <Input
                                        placeholder="Ex : IDA 1, IDA 2…"
                                        value={nom}
                                        onChange={(e) => setNom(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-3">
                                    <Label>Filière</Label>
                                    <NativeSelect
                                        className="w-full"
                                        value={filiere_id}
                                        onChange={(e) =>
                                            setFiliereId(e.target.value)
                                        }
                                    >
                                        <NativeSelectOption value="" />
                                        {filieres.data.map((filiere) => (
                                            <NativeSelectOption
                                                key={filiere.id}
                                                value={filiere.id}
                                            >
                                                {filiere.nom}
                                            </NativeSelectOption>
                                        ))}
                                    </NativeSelect>
                                </div>
                            </div>
                            <SheetFooter>
                                <Button onClick={handleSubmit}>
                                    Enregistrer
                                </Button>
                                <SheetClose asChild>
                                    <Button variant="outline">Fermer</Button>
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* Tableau */}
                <Card className="overflow-hidden shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/40 hover:bg-muted/40">
                                <TableHead>Niveau</TableHead>
                                <TableHead>Filière</TableHead>
                                <TableHead className="w-[80px]" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {niveaux.data.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={3}
                                        className="h-48 text-center"
                                    >
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                            <GraduationCap className="h-10 w-10 opacity-20" />
                                            <p className="text-sm">
                                                Aucun niveau enregistré.
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                niveaux.data.map((niveau) => (
                                    <TableRow key={niveau.id} className="group">
                                        <TableCell>
                                            <div className="flex items-center gap-2.5">
                                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                                                    {niveau.nom
                                                        .slice(0, 2)
                                                        .toUpperCase()}
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
                                                            href={`/niveau/${niveau.id}/edit`}
                                                            className="flex cursor-pointer items-center gap-2"
                                                        >
                                                            <Edit className="h-4 w-4" />{' '}
                                                            Modifier
                                                        </Link>
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/niveau/${niveau.id}/liste-de-classe`}
                                                            className="flex cursor-pointer items-center gap-2"
                                                        >
                                                            <Users2Icon className="h-4 w-4" />{' '}
                                                            Liste de classe
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    {/* 
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`/niveau/${niveau.id}/emploi-du-temps`}
                                                            className="flex cursor-pointer items-center gap-2"
                                                        >
                                                            <CalendarDaysIcon className="h-4 w-4" /> Emploi du temps
                                                        </Link>
                                                    </DropdownMenuItem> */}

                                                    <DropdownMenuSeparator />

                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            setSelectedId(
                                                                niveau.id,
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
