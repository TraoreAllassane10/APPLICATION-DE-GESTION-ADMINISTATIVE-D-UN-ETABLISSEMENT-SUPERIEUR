
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
import Avatar from '@/features/etudiant/components/Avatar';
import AppLayout from '@/layouts/app-layout';
import ConfigurationLayout from '@/layouts/configurations/ConfigurationLayout';
import { utilisateur } from '@/routes';
import { BreadcrumbItem, User } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Horaire',
        href: '/horaire',
    },
];

interface UserProps {
    utilisateurs: User[];
    roles: any;
    [key: string]: unknown;
}

const Index = () => {
    const { utilisateurs, roles } = usePage<UserProps>().props;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    // Enregistrement d'un utilisateur
    const handleSubmit = async () => {
        // Verification des données
        if (name == '' || email == '' || password == '' || role == '') {
            toast.error('Veuillez remplir tous les champs svp');
            return;
        }

        // Création d'un horaire
        try {
            await axios
                .post('/utilisateurs', { name, email, password, role })
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Utilisateur crée avec succès');

                        router.visit(utilisateur());
                    }
                })
                .catch((error) => {
                    toast.error(
                        "Erreur survenue lors de la creation de l'utilisateur",
                    );
                    console.log(error);
                });
        } catch (error) {
            toast.error('Erreur survenue au niveau du serveur');
            console.log(error);
        }

        // Nettoyage de l'etat
        setName('');
        setEmail('');
        setPassword('');
        setRole('');
    };

    // Suppression d'un utilisateur
    const handleDelete = async (id: number) => {
        if (id) {
            try {
                await axios
                    .delete(`/utilisateurs/${id}/delete`)
                    .then((response) => {
                        if (response.data.success) {
                            toast.success('Utilisateur supprimé avec succès');

                            router.visit(utilisateur());
                        }
                    })
                    .catch((error) => {
                        toast.error(
                            "Erreur survenue lors de la supprimé de l'utilisateur",
                        );
                        console.log(error);
                    });
            } catch (error) {
                toast.error('Erreur survenue au niveau du serveur');
                console.log(error);
            }
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
                                Gestion des utilisateurs
                            </h1>

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground"
                                    >
                                        Ajouter un utilisateur
                                    </Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>
                                            Nouvel Utilisateur
                                        </SheetTitle>
                                        <SheetDescription>
                                            Ajouter un nouvel utilisateur
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="grid flex-1 auto-rows-min gap-6 px-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">
                                                Nom complet
                                            </Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="name"
                                                name="name"
                                                placeholder="Ex: Traore Allassane"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                tabIndex={2}
                                                autoComplete="email"
                                                name="email"
                                                placeholder="traoreallassane2255@example.com"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="password">
                                                Mot de passe
                                            </Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                required
                                                tabIndex={3}
                                                autoComplete="new-password"
                                                name="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="sheet-demo-name">
                                                Role
                                            </Label>
                                            <NativeSelect
                                                className="w-full"
                                                value={role}
                                                onChange={(e) =>
                                                    setRole(e.target.value)
                                                }
                                            >
                                                <NativeSelectOption value="">
                                                    {' '}
                                                </NativeSelectOption>

                                                {roles.map((role: any) => (
                                                    <NativeSelectOption
                                                        value={role}
                                                    >
                                                        {role}
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
                                            <TableHead>Nom Complet</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Role</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {utilisateurs.map((user) => (
                                            <TableRow>
                                                <TableCell className='flex gap-2 place-items-center'>
                                                    <Avatar
                                                        nom={user.name.split(' ')[0]}
                                                        prenom={user.name.split(' ')[1]}
                                                        genre='Masculin'
                                                     />
                                                    {user.name}
                                                </TableCell>
                                                <TableCell>
                                                    {user.email}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        {user.roles?.map(
                                                            (role) => (
                                                                <span className="rounded-full bg-yellow-50 px-2 py-0.5 font-medium text-yellow-500">
                                                                    {role.name}
                                                                </span>
                                                            ),
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="flex gap-2">
                                                    <Link
                                                        onClick={() =>
                                                            handleDelete(
                                                                user.id,
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
