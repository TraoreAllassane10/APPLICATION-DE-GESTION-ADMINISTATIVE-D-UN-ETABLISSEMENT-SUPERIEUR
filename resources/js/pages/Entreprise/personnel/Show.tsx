import InfoRow from '@/components/Entreprise/Personnel/InfoRow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Personnel } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Building,
    Calendar,
    Download,
    Globe,
    Hash,
    Mail,
    Phone,
    User,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Personnels', href: '/personnels' },
    { title: 'profil', href: '/personnels' },
];
const Show = () => {
    const { personnel } = usePage<{ personnel: Personnel }>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Personnel" />

            <div className="space-y-5 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Profil de {personnel.nom} {personnel.prenom}
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            Visualisation des informations de l'employé.
                        </p>
                    </div>
                </div>

                {/* Identité */}
                <Card>
                    <CardHeader className="flex flex-row place-items-center justify-between">
                        <h1 className="font-semibold text-muted-foreground">
                            Indentification
                        </h1>
                        <Button variant={'outline'}>
                            <Link href={`/personnels/${personnel.id}/edit`}>
                                Modifier
                            </Link>
                        </Button>
                    </CardHeader>

                    <Separator />

                    <CardContent>
                        <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 md:grid-cols-3">
                            <InfoRow
                                icon={User}
                                label="Nom complet"
                                value={`${personnel.nom} ${personnel.prenom}`}
                            />
                            <InfoRow
                                icon={Calendar}
                                label="Date de naissance"
                                value={personnel.date_naissance}
                            />
                            <InfoRow
                                icon={Globe}
                                label="Lieu de naissance"
                                value={personnel.lieu_naissance}
                            />
                            <InfoRow
                                icon={User}
                                label="Genre"
                                value={personnel.genre}
                            />
                            <InfoRow
                                icon={User}
                                label="Situation matrimoniale"
                                value={personnel.situation_matrimoniale}
                            />
                            <InfoRow
                                icon={User}
                                label="Fonction"
                                value={personnel.fonction}
                            />

                            <InfoRow
                                icon={User}
                                label="Nationnalite"
                                value={personnel.nationalite}
                            />
                            <InfoRow
                                icon={Mail}
                                label="Email"
                                value={personnel.email}
                            />
                            <InfoRow
                                icon={Phone}
                                label="Telephone"
                                value={personnel.telephone}
                            />
                            <InfoRow
                                icon={Hash}
                                label="Matricule"
                                value={personnel.matricule}
                            />
                            <InfoRow
                                icon={Hash}
                                label="Nombre d'enfant"
                                value={personnel.nombre_enfant}
                            />
                            <InfoRow
                                icon={Hash}
                                label="Nombre d'enfant en charge"
                                value={personnel.nombre_enfant_charge}
                            />
                            <InfoRow
                                icon={Hash}
                                label="BP"
                                value={personnel.bp}
                            />
                            <InfoRow
                                icon={Hash}
                                label="RIB de l'employé"
                                value={personnel.rib}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Entreprise */}
                <Card>
                    <CardHeader>
                        <h1 className="font-semibold text-muted-foreground">
                            Informations sur son entreprise
                        </h1>
                    </CardHeader>

                    <Separator />

                    <CardContent>
                        <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 md:grid-cols-3">
                            <InfoRow
                                icon={Building}
                                label="Nom de son entreprise"
                                value={personnel.nom_entreprise}
                            />
                            <InfoRow
                                icon={Hash}
                                label="Numero registre de commerce"
                                value={personnel.numero_registre_commerce}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Formations */}
                <Card>
                    <CardHeader>
                        <h1 className="font-semibold text-muted-foreground">
                            Formations
                        </h1>
                    </CardHeader>

                    <Separator />

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/40 hover:bg-muted/40">
                                    <TableHead>Année(s)</TableHead>
                                    <TableHead>Diplome(s) obtenu(s)</TableHead>
                                    <TableHead>Ecole / Université</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {personnel.formations.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="h-10 text-center"
                                        >
                                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                <p className="text-sm">
                                                    Aucune formations ajoutée.
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    personnel.formations.map((formation) => (
                                        <TableRow key={formation.id}>
                                            <TableCell>
                                                {formation.annee}
                                            </TableCell>
                                            <TableCell>
                                                {formation.diplome}
                                            </TableCell>
                                            <TableCell>
                                                {formation.ecole}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Experiences */}
                <Card>
                    <CardHeader>
                        <h1 className="font-semibold text-muted-foreground">
                            Expériences
                        </h1>
                    </CardHeader>

                    <Separator />

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/40 hover:bg-muted/40">
                                    <TableHead>Année(s)</TableHead>
                                    <TableHead>Ecole / Université</TableHead>
                                    <TableHead>Fonction</TableHead>
                                    <TableHead>
                                        Nombre d'annee d'enseignement
                                    </TableHead>
                                    <TableHead>matières enseignées</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {personnel.experiences.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="h-10 text-center"
                                        >
                                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                <p className="text-sm">
                                                    Aucune expérience ajoutée.
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    personnel.experiences.map((experience) => (
                                        <TableRow key={experience.id}>
                                            <TableCell>
                                                {experience.annee}
                                            </TableCell>
                                            <TableCell>
                                                {experience.nom_ecole}
                                            </TableCell>
                                            <TableCell>
                                                {experience.fonction}
                                            </TableCell>
                                            <TableCell>
                                                {
                                                    experience.nombre_annee_enseignement
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {experience.matiere_enseignee}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Documents */}
                <Card>
                    <CardHeader>
                        <h1 className="font-semibold text-muted-foreground">
                            Pièces jointes
                        </h1>
                    </CardHeader>

                    <Separator />

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/40 hover:bg-muted/40">
                                    <TableHead>Nom du fichier</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {personnel.documents.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={2}
                                            className="h-10 text-center"
                                        >
                                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                <p className="text-sm">
                                                    Aucune pièce jointe ajoutée.
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    personnel.documents.map((document) => (
                                        <TableRow key={document.id}>
                                            <TableCell>
                                                {document.nom}
                                            </TableCell>
                                            <TableCell>
                                                <a
                                                    href={`/storage/${document.chemin}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                               
                                                >
                                                     <Button variant={'outline'}>
                                                    <Download />
                                                    Télécharger
                                                </Button>
                                                </a>
                                            </TableCell>

                                            <TableCell>
                                               
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Show;
