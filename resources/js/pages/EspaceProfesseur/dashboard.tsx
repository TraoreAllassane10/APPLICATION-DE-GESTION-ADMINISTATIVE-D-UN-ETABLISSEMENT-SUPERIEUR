import StatCard from '@/components/StatCard';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Evaluation } from '@/features/evaluations/types/evaluation.types';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowRight, ClipboardList, GraduationCap, Users } from 'lucide-react';
import { useEffect } from 'react';

interface Niveau {
    id: number;
    nom: string;
    [key: string]: unknown;
}

interface Cours {
    id: number;
    nom: string;
    [key: string]: unknown;
}

interface Enseignement {
    id?: number;
    coefficient?: number | string;
    niveaux?: Niveau[];
    cours?: Cours[];
    [key: string]: unknown;
}

interface ProfesseurExtended {
    id: number;
    nom_prenom: string;
    email: string;
    telephone?: string;
    specialite?: string;
    avatar?: string;
    enseignements?: Enseignement[];
    [key: string]: unknown;
}

interface DashboardProfesseurProps {
    professeur: ProfesseurExtended;
    total_matiere: number;
    total_classe: number;
    total_evaluation: number;
    dernieres_evaluations: Evaluation[];
    [key: string]: unknown;
}

export default function DashboardProfesseur() {
    const {
        total_matiere,
        total_classe,
        total_evaluation,
        dernieres_evaluations,
    } = usePage<DashboardProfesseurProps>().props;

    useEffect(() => {
        if (window.location.pathname !== '/professeur/dashboard') {
            router.get('/professeur/dashboard');
        }
    }, []);

    return (
        <AppLayout>
            <Head title="Tableau de bord - Enseignant" />

            <div className="space-y-8 p-4 sm:p-6 lg:p-8">
                {/*Header*/}
                <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            Tableau de bord
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Vue d'ensemble de vos données annuelle
                        </p>
                    </div>
                </section>

                {/* Statitiques */}
                <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <StatCard
                        label="Matière"
                        value={total_matiere}
                        icon={Users}
                        color="text-blue-600"
                        bg="bg-blue-50 dark:bg-blue-950/40"
                    />

                    <StatCard
                        label="Classe"
                        value={total_classe}
                        icon={GraduationCap}
                        color="text-green-600"
                        bg="bg-green-50 dark:bg-green-950/40"
                    />

                    <StatCard
                        label="Evaluations"
                        value={total_evaluation}
                        icon={ClipboardList}
                        color="text-yellow-600"
                        bg="bg-yellow-50 dark:bg-yellow-950/40"
                    />

                    {/* <StatCard
                        label="Evaluation non transmise"
                        value={total_evaluation_non_transmise}
                        icon={ClipboardList}
                        color="text-red-600"
                        bg="bg-red-50 dark:bg-red-950/40"
                    /> */}
                </section>

                {/* Dernieres evaluations*/}
                <section>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>Dernières évaluations</span>

                                <Link href="/professeur/evaluations">
                                    <Button variant={'ghost'}>
                                        Voir plus <ArrowRight />
                                    </Button>
                                </Link>
                            </CardTitle>

                            <CardDescription>
                                Vos 5 dernières évaluations
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/40">
                                        <TableHead>Titre</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Note maximale</TableHead>
                                        <TableHead>Coefficient</TableHead>
                                        <TableHead>Matière</TableHead>
                                        <TableHead>Période</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {dernieres_evaluations.length === 0 ? (
                                        <TableRow>
                                            <TableCell
                                                colSpan={7}
                                                className="h-48 text-center"
                                            >
                                                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                    <GraduationCap className="h-10 w-10 opacity-20" />
                                                    <p className="text-sm">
                                                        Aucune evaluation
                                                        trouvée.
                                                    </p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        dernieres_evaluations.map(
                                            (evaluation) => {
                                                return (
                                                    <TableRow
                                                        key={evaluation.id}
                                                        className="group"
                                                    >
                                                        <TableCell className="space-x-1">
                                                            {evaluation.titre}
                                                        </TableCell>

                                                        <TableCell>
                                                            {evaluation.type}
                                                        </TableCell>

                                                        <TableCell>
                                                            {evaluation.date}
                                                        </TableCell>

                                                        <TableCell>
                                                            {
                                                                evaluation.note_maximale
                                                            }
                                                        </TableCell>

                                                        <TableCell>
                                                            {
                                                                evaluation.coefficient
                                                            }
                                                        </TableCell>

                                                        <TableCell>
                                                            {
                                                                evaluation
                                                                    .enseignement
                                                                    .cours.nom
                                                            }
                                                        </TableCell>

                                                        <TableCell>
                                                            {
                                                                evaluation
                                                                    .periode_academique
                                                                    .libelle
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            },
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </AppLayout>
    );
}
