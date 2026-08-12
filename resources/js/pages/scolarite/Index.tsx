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
import useScolarite from '@/hooks/useScolarite';
import AppLayout from '@/layouts/app-layout';
import {
    Annee,
    Auth,
    BreadcrumbItem,
    DataNiveau,
    Scolarite,
    TypeScolarite,
} from '@/types';
import { fmt } from '@/utils/util';
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
        title: 'Scolarite',
        href: '/scolarite',
    },
];

interface ScolariteProps {
    scolarites: Scolarite[];
    niveaux: DataNiveau[];
    annee: Annee;
    types: string[];
    auth: Auth;
    [key: string]: unknown;
}

const typeConfig: Record<TypeScolarite, string> = {
    Affecté: 'bg-blue-50 text-blue-700 border border-blue-200',
    Naff: 'bg-rose-50 text-rose-700 border border-rose-200',
    Licence: 'bg-green-50 text-green-700 border border-green-200',
};

function typeBadge(type: TypeScolarite) {
    const className = typeConfig[type];
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}
        >
            {type}
        </span>
    );
}

const Index = () => {
    const { scolarites, niveaux, annee, types, auth } =
        usePage<ScolariteProps>().props;

    const isAdmin = auth.user?.roles?.some(
        (role) => role.name == 'Administrateur',
    );

    const [niveau_id, SetNiveauId] = useState('');
    const [type, setType] = useState('');
    const [montant, setMontant] = useState('');

    const { createScolarite, deleteScolarite } = useScolarite();

    // Enregistrement d'une scolarite
    const handleSubmit = () => {
        // Verification des données
        if (
            type == '' ||
            montant == '' ||
            Number(montant) <= 0 ||
            niveau_id == ''
        ) {
            toast.error('Veuillez remplir tous les champs svp !');
            return;
        }

        // Creation d'une nouvelle scolarite
        createScolarite({
            annee_id: annee.id,
            montant: Number(montant),
            type,
            niveau_id: Number(niveau_id),
        });

        // Nettoye de l'etat du composant
        setMontant('');
        setType('');
        SetNiveauId('');

        //Redirection sur la page d'affiche
        router.visit('/scolarite');
    };

    // Suppression d'une scolarite
    const handleDelete = (id: number) => {
        if (id) deleteScolarite(id);
    };

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="space-y-5 p-6">
                    {/* Entete et le bouton d'ajout */}
                    <div className="my-2 flex place-items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">
                                Gestion des scolarites
                            </h1>

                            <p className="mt-0.5 text-sm text-muted-foreground">
                                Gérez toutes les scolarités.
                            </p>
                        </div>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                                >
                                    <PlusCircle className="h-4 w-4" />
                                    Nouvelle scolarite
                                </Button>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Nouvelle Scolarite</SheetTitle>
                                    <SheetDescription>
                                        Ajouter une scolarite
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-name">
                                            Annee Academique
                                        </Label>
                                        <Input value={annee.libelle} disabled />
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-username">
                                            Type de scolarite
                                        </Label>
                                        <NativeSelect
                                            className="w-full"
                                            value={type}
                                            onChange={(e) =>
                                                setType(e.target.value)
                                            }
                                        >
                                            <NativeSelectOption
                                                value=""
                                                disabled
                                            >
                                                Selectionner le type de
                                                scolarite
                                            </NativeSelectOption>

                                            {types.map((type, index) => (
                                                <NativeSelectOption
                                                    key={index}
                                                    value={type}
                                                >
                                                    {type}
                                                </NativeSelectOption>
                                            ))}
                                        </NativeSelect>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-username">
                                            Niveau
                                        </Label>
                                        <NativeSelect
                                            className="w-full"
                                            value={niveau_id}
                                            onChange={(e) =>
                                                SetNiveauId(e.target.value)
                                            }
                                        >
                                            <NativeSelectOption
                                                value=""
                                                disabled
                                            >
                                                Selectionner un niveau
                                            </NativeSelectOption>

                                            {niveaux.map((niveau) => (
                                                <NativeSelectOption
                                                    value={niveau.id}
                                                >
                                                    {niveau.nom}
                                                </NativeSelectOption>
                                            ))}
                                        </NativeSelect>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="sheet-demo-username">
                                            Montant
                                        </Label>
                                        <Input
                                            type="number"
                                            value={montant}
                                            onChange={(e) =>
                                                setMontant(e.target.value)
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
                                    <TableHead>classe</TableHead>
                                    <TableHead>Montant</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead className="w-[80px]" />
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {scolarites.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={3}
                                            className="h-48 text-center"
                                        >
                                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                <GraduationCap className="h-10 w-10 opacity-20" />
                                                <p className="text-sm">
                                                    Aucune scolarité
                                                    enregistrée.
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    scolarites.map((scolarite) => (
                                        <TableRow
                                            key={scolarite.id}
                                            className="group"
                                        >
                                            <TableCell className="text-md">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                                                        {scolarite.niveau.nom
                                                            .slice(0, 2)
                                                            .toUpperCase()}
                                                    </div>
                                                    <span className="text-sm font-medium">
                                                        {scolarite.niveau.nom}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-md">
                                                {fmt(scolarite.montant)}
                                            </TableCell>
                                            <TableCell className="text-md">
                                                {typeBadge(scolarite.type)}
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
                                                            Actions
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
                                                                href={`scolarite/${scolarite.id}/edit`}
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
                                                                    scolarite.id,
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
                </div>
            </AppLayout>
        </div>
    );
};

export default Index;
