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
import ConfigurationLayout from '@/layouts/configurations/ConfigurationLayout';
import { filiere } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Edit, Trash } from 'lucide-react';
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
                <ConfigurationLayout>
                    <div>
                        {/* Entete et le bouton d'ajout */}
                        <div className="my-2 flex place-items-center justify-between">
                            <h1 className="text-2xl font-bold">Gestion des filières</h1>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                                    >
                                        Ajouter une filière
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>
                                            Nouvelle filière
                                        </SheetTitle>
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

                        <Card>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted">
                                            <TableHead>Libellé</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filieres?.data.map((filiere) => (
                                            <TableRow>
                                                <TableCell>
                                                    {filiere.nom}
                                                </TableCell>
                                                <TableCell className="flex gap-2">
                                                    <Link
                                                        href={`filiere/${filiere.id}/edit`}
                                                    >
                                                        <Edit
                                                            size={20}
                                                            className="cursor-pointer text-blue-600 hover:text-blue-800"
                                                        />
                                                    </Link>

                                                    <Link
                                                        onClick={() =>
                                                            handleDelete(
                                                                filiere.id,
                                                            )
                                                        }
                                                    >
                                                        <Trash
                                                            size={20}
                                                            className="cursor-pointer text-red-600 hover:text-red-800"
                                                        />
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>

                        
                        </Card>
                    </div>
                </ConfigurationLayout>
            </AppLayout>
        </div>
    );
};

export default Index;
