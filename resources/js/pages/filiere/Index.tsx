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
import useFiliere from '@/hooks/useFiliere';
import AppLayout from '@/layouts/app-layout';
import { filiere } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import {
    ChevronDown,
    Edit,
    GraduationCap,
    PlusCircle,
    Trash2,
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Filieres',
        href: '/filiere',
    },
];

interface Filiere {
    id: number;
    nom: string;
}

interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: {
        active: boolean;
        label: string;
        page: number;
        url: string;
    }[];
}

interface Filiere {
    data: Filiere[];
}

interface FiliereProps {
    filieres: Filiere;
    [key: string]: unknown;
}

const Index = () => {
    const { filieres } = usePage<FiliereProps>().props;

    const [nom, setNom] = useState('');

    const { createFiliere, deleteFiliere } = useFiliere();

    // Enregistrement d'une filiere
    const handleSubmit = () => {
        // Verification des données
        if (nom == '') {
            toast.error('Veuillez entrer le nom de la filière!');
            return;
        }

        // Création d'une filière
        createFiliere({ nom });

        // Nettoyage de l'etat
        setNom('');

        // Redirection vers la page d'affichage des filieres
        router.visit(filiere());
    };

    // Suppression d'une filiere
    const handleDelete = (id: number) => {
        if (id) deleteFiliere(id);
    };

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="space-y-6 p-6">
                    {/* Entete et le bouton d'ajout */}
                    <div className="my-2 flex place-items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">
                                Gestion des filières
                            </h1>
                            <p className="mt-0.5 text-sm text-muted-foreground">
                                Gérez les filieres. ({filieres.data.length}{' '}
                                trouvées)
                            </p>
                        </div>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                                >
                                    <PlusCircle className="h-4 w-4" />
                                    Ajouter une filière
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Nouvelle filière</SheetTitle>
                                    <SheetDescription>
                                        Ajouter une nouvelle filière
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Nom de la filière
                                        </Label>
                                        <Input
                                            value={nom}
                                            onChange={(e) =>
                                                setNom(e.target.value)
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

                    <Card className="overflow-hidden shadow-sm">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/40 hover:bg-muted/40">
                                    <TableHead>Libellé</TableHead>
                                    <TableHead className="w-[80px]" />
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filieres.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={3}
                                            className="h-48 text-center"
                                        >
                                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                <GraduationCap className="h-10 w-10 opacity-20" />
                                                <p className="text-sm">
                                                    Aucune filière enregistrée.
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filieres.data.map((filiere) => (
                                        <TableRow
                                            key={filiere.id}
                                            className="group"
                                        >
                                            <TableCell className="text-md font-medium">
                                                {filiere.nom}
                                            </TableCell>

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
                                                        className="w-48"
                                                    >
                                                        <DropdownMenuItem
                                                            asChild
                                                        >
                                                            <Link
                                                                href={`filiere/${filiere.id}/edit`}
                                                                className="flex cursor-pointer items-center gap-2"
                                                            >
                                                                <Edit className="h-4 w-4" />{' '}
                                                                Modifier
                                                            </Link>
                                                        </DropdownMenuItem>

                                                        <DropdownMenuSeparator />

                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleDelete(
                                                                    filiere.id,
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

                            {/* <PaginationLinks links={cours.meta.links} /> */}
                        </Table>
                    </Card>
                </div>
            </AppLayout>
        </div>
    );
};

export default Index;
