import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import useSalle from '@/hooks/useSalle';
import AppLayout from '@/layouts/app-layout';
import ConfigurationLayout from '@/layouts/configurations/ConfigurationLayout';
import { BreadcrumbItem, Meta, Site } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Edit, Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Salle',
        href: '/salle',
    },
];

interface Data {
    id: number;
    nom: string;
    site: Site;
}

interface Salle {
    data: Data[];
    meta: Meta;
}

interface SalleProps {
    salles: Salle;
    sites: Site[];
    [key: string]: unknown;
}

const Index = () => {
    const { salles, sites } = usePage<SalleProps>().props;

    const [nom, setNom] = useState('');
    const [site_id, setSiteId] = useState('');

    const { createSalle, deleteSalle } = useSalle();

    // Enregistrement d'une salle
    const handleSubmit = () => {
        // Verification des données
        if (nom == '') {
            toast.error('Veuillez entrer le nom de la salle!');
            return;
        }

        // Création d'une salle
        createSalle({ nom, site_id });

        // Nettoyage de l'etat
        setNom('');

        // Redirection vers la page d'affichage des filieres
        router.visit('/salle');
    };

    // Suppression d'une salle
    const handleDelete = (id: number) => {
        if (id) deleteSalle(id);
    };
    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <ConfigurationLayout>
                    <div>
                        {/* Entete et le bouton d'ajout */}
                        <div className="my-2 flex place-items-center justify-between">
                            <h1 className="text-2xl font-bold">Gestion des salles</h1>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                                    >
                                        Ajouter une salle
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Nouvelle Salle</SheetTitle>
                                        <SheetDescription>
                                            Ajouter une nouvelle salle
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="sheet-demo-name">
                                                Nom de la salle
                                            </Label>
                                            <Input
                                                value={nom}
                                                onChange={(e) =>
                                                    setNom(e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="sheet-demo-name">
                                                Site
                                            </Label>
                                            <NativeSelect
                                                className="w-full"
                                                value={site_id}
                                                onChange={(e) =>
                                                    setSiteId(e.target.value)
                                                }
                                            >
                                                <NativeSelectOption value="">
                                                    {' '}
                                                </NativeSelectOption>

                                                {sites.map((site) => (
                                                    <NativeSelectOption
                                                        value={site.id}
                                                    >
                                                        {site.nom}
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
                                            <TableHead>Nom de salle</TableHead>
                                            <TableHead>Site</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {salles?.data.map((salle) => (
                                            <TableRow>
                                                <TableCell>
                                                    {salle.nom}
                                                </TableCell>
                                                <TableCell>
                                                    {salle.site.nom}
                                                </TableCell>
                                                <TableCell className="flex gap-2">
                                                    <Link
                                                        href={`/salle/${salle.id}/edit`}
                                                    >
                                                        <Edit
                                                            size={20}
                                                            className="cursor-pointer text-blue-600 hover:text-blue-800"
                                                        />
                                                    </Link>

                                                    <Link
                                                        onClick={() =>
                                                            handleDelete(
                                                                salle.id,
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
