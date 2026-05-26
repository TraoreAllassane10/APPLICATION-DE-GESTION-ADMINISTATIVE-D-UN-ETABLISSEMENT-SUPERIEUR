import Avatar from '@/components/etudiant/Avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, DataNiveau, Etudiant } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Eye, GraduationCap, Printer } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Niveau',
        href: '/niveau',
    },
    {
        title: 'Liste de classe',
        href: '#',
    },
];

interface ListeEtudiantProps {
    liste: Etudiant[];
    niveau: DataNiveau;
    [key: string]: unknown;
}

const ListeDeClasse = () => {
    const { liste, niveau } = usePage<ListeEtudiantProps>().props;
    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    {/* Entete et le bouton d'ajout */}
                    <div className="my-2 flex place-items-center justify-between">
                        <h1 className="text-2xl font-bold">
                            Liste de classe de {niveau.nom}{' '}
                            <span className="text-sm font-normal">
                                ({liste.length} etudiants)
                            </span>
                        </h1>

                        <a
                            href={`/niveau/${niveau.id}/liste-de-classe/imprimer`}
                            target="_blank"
                        >
                            <Button variant="outline" size="sm">
                                <Printer />
                                Telécharger la liste de classe
                            </Button>
                        </a>
                    </div>

                    <Card className="overflow-hidden shadow-sm">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/40 hover:bg-muted/40">
                                    <TableHead>Etudiant</TableHead>
                                    <TableHead>Identifiant Permanent</TableHead>
                                    <TableHead>genre</TableHead>
                                    <TableHead>Date de naissance</TableHead>
                                    <TableHead>Lieu de naissance</TableHead>
                                    <TableHead className="w-[100px]" />
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {liste.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="h-48 text-center"
                                        >
                                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                <GraduationCap className="h-10 w-10 opacity-20" />
                                                <p className="text-sm">
                                                    Aucun etudiant trouvé.
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    liste.map((etudiant) => (
                                        <TableRow
                                            key={etudiant.ip}
                                            className="group"
                                        >
                                            <TableCell className="space-x-1">
                                                <div className="flex items-center gap-2">
                                                    <Avatar
                                                        nom={etudiant.nom}
                                                        prenom={etudiant.prenom}
                                                        genre={etudiant.genre}
                                                    />

                                                    <div className="font-medium">
                                                        {etudiant.nom}{' '}
                                                        {etudiant.prenom}
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell>{etudiant.ip}</TableCell>

                                            <TableCell>
                                                {etudiant.genre}
                                            </TableCell>

                                            <TableCell>
                                                {etudiant.date_naissance}
                                            </TableCell>

                                            <TableCell>
                                                {etudiant.lieu_naissance}
                                            </TableCell>

                                            <TableCell>
                                                <Link
                                                    href={`/etudiants/${etudiant.ip}/show`}
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <Eye />
                                                        Voir le profil
                                                    </Button>
                                                </Link>
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

export default ListeDeClasse;
