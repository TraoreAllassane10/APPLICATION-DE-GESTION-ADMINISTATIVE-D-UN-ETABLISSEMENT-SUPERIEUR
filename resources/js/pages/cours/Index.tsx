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
import useCours from '@/hooks/useCours';
import AppLayout from '@/layouts/app-layout';
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
        title: 'Cours',
        href: '/cours',
    },
];

interface Data {
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

interface Cours {
    data: Data[];
    meta: Meta;
}

interface CoursProps {
    cours: Cours;

    [key: string]: unknown;
}

const Index = () => {
    const { cours } = usePage<CoursProps>().props;

    const [nom, setNom] = useState('');

    const { createCours, deleteCours } = useCours();

    // Enregistrement d'un cours
    const handleSubmit = () => {
        // Verification des données
        if (nom == '') {
            toast.error('Veuillez remplir tous les champs!');
            return;
        }

        // Création d'un cours
        createCours({ nom });

        // Nettoyage de l'etat
        setNom('');
    };

    // Suppression d'un cours
    const handleDelete = (id: number) => {
        if (id) deleteCours(id);
        router.visit('/cours');
    };

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="space-y-6 p-6">
                    {/* Entete et le bouton d'ajout */}
                    <div className="my-2 flex place-items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">
                                Gestion des cours
                            </h1>

                            <p className="mt-0.5 text-sm text-muted-foreground">
                                Gérez les cours.
                            </p>
                        </div>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                                >
                                    <PlusCircle className="h-4 w-4" />
                                    Ajouter un cours
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Nouveau cours</SheetTitle>
                                    <SheetDescription>
                                        Ajouter un nouveau cours
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Nom du cours
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
                                    <TableHead>Nom du cours</TableHead>
                                    <TableHead className="w-[80px]" />
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {cours.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={3}
                                            className="h-48 text-center"
                                        >
                                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                <GraduationCap className="h-10 w-10 opacity-20" />
                                                <p className="text-sm">
                                                    Aucun cours enregistré.
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    cours.data.map((cours) => (
                                        <TableRow
                                            key={cours.id}
                                            className="group"
                                        >
                                            <TableCell className="text-md font-medium">
                                                {cours.nom}
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
                                                                href={`/cours/${cours.id}/edit`}
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
                                                                    cours.id,
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

                            <PaginationLinks links={cours.meta.links} />
                        </Table>
                    </Card>
                </div>
            </AppLayout>
        </div>
    );
};

export default Index;
