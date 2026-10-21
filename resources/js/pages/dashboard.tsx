import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BookOpen,
    ClipboardList,
    GraduationCap,
    Layers,
    ReceiptText,
    UserPlus,
    Users,
    Users2,
} from 'lucide-react';

import StatCard from '@/components/dashboard/StatCardDashboard';
import DashbaordPedagogie from '@/features/dashboard/components/DashbaordPedagogie';
import DashbaordScolarite from '@/features/dashboard/components/DashbaordScolarite';
import DashboardAdmin from '@/features/dashboard/components/DashboardAdmin';
import {
    RepartitionNiveau,
    StatFinanciere,
    StatGlobales,
} from '@/features/dashboard/types/dashboard.types';
import { Inscription } from '@/features/inscription/types/inscription.types';
import { Paiement } from '@/features/paiement/types/paiement.types';
import { Annee, Auth } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Evaluation } from '@/features/evaluations/types/evaluation.types';

interface DashboardProps {
    anneeActive: Annee;
    stats_globales: StatGlobales;
    stats_financiere: StatFinanciere;
    derniers_paiements: Paiement[];
    dernieres_inscriptions: Inscription[];
    repartitionNiveaux: RepartitionNiveau[];
    dernieres_evaluations: Evaluation[];
    auth: Auth;
    [key: string]: unknown;
}

export default function Dashboard() {
    const {
        anneeActive,
        stats_globales,
        stats_financiere,
        derniers_paiements,
        dernieres_inscriptions,
        auth,
        repartitionNiveaux,
        dernieres_evaluations
    } = usePage<DashboardProps>().props;

    const taux = stats_financiere.tauxRecouvrement;

    const isAdmin = auth.user.roles?.some(
        (role) => role.name === 'Administrateur',
    );

    const isSecretaireScolarite = auth.user.roles?.some(
        (role) => role.name === 'Secrétaire de scolarité',
    );

    const isInspecteurPedagogique = auth.user.roles?.some(
        (role) => role.name === 'Inspecteur pedagogique',
    );

    return (
        <AppLayout>
            <Head title="Tableau de bord" />

            <div className="space-y-8 p-4 sm:p-6 lg:p-8">
                {/*Header*/}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            Tableau de bord
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Vue d'ensemble de l'année académique{' '}
                            <Badge
                                variant="secondary"
                                className="font-semibold"
                            >
                                {anneeActive.libelle}
                            </Badge>
                        </p>
                    </div>

                    {isAdmin && (
                        <Button size="sm" asChild>
                            <Link href="/inscriptions">
                                <UserPlus className="mr-2 h-4 w-4" />
                                Inscrire un étudiant
                            </Link>
                        </Button>
                    )}
                </div>

                {isAdmin && (
                    <>
                        {/* ── Key Metrics Grid ────────────────────────────────────────── */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <StatCard
                                label="Alumnis"
                                value={stats_globales.totalEtudiants}
                                sub="Fichier général"
                                icon={Users}
                                color="text-blue-600"
                                bg="bg-blue-50 dark:bg-blue-950/40"
                            />
                            <StatCard
                                label="Inscriptions"
                                value={stats_globales.totalInscriptions}
                                sub={anneeActive.libelle}
                                icon={GraduationCap}
                                color="text-violet-600"
                                bg="bg-violet-50 dark:bg-violet-950/40"
                            />
                            <StatCard
                                label="Enseignants"
                                value={stats_globales.totalEnseignants}
                                icon={BookOpen}
                                color="text-cyan-600"
                                bg="bg-cyan-50 dark:bg-cyan-950/40"
                            />
                            <StatCard
                                label="Filières actives"
                                value={stats_globales.totalFilieres}
                                icon={ReceiptText}
                                color="text-slate-600"
                                bg="bg-slate-100 dark:bg-slate-800/50"
                            />
                        </div>

                        <DashboardAdmin
                            anneeActive={anneeActive.libelle}
                            taux={taux}
                            stats_financiere={stats_financiere}
                            repartitionNiveaux={repartitionNiveaux}
                            dernieres_inscriptions={dernieres_inscriptions}
                            derniers_paiements={derniers_paiements}
                        />
                    </>
                )}

                {isSecretaireScolarite && (
                    <>
                        {/* ── Key Metrics Grid ────────────────────────────────────────── */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <StatCard
                                label="Alumnis"
                                value={stats_globales.totalEtudiants}
                                sub="Fichier général"
                                icon={Users}
                                color="text-blue-600"
                                bg="bg-blue-50 dark:bg-blue-950/40"
                            />
                            <StatCard
                                label="Inscriptions"
                                value={stats_globales.totalInscriptions}
                                sub={anneeActive.libelle}
                                icon={GraduationCap}
                                color="text-violet-600"
                                bg="bg-violet-50 dark:bg-violet-950/40"
                            />
                            <StatCard
                                label="Enseignants"
                                value={stats_globales.totalEnseignants}
                                icon={BookOpen}
                                color="text-cyan-600"
                                bg="bg-cyan-50 dark:bg-cyan-950/40"
                            />
                            <StatCard
                                label="Filières actives"
                                value={stats_globales.totalFilieres}
                                icon={ReceiptText}
                                color="text-slate-600"
                                bg="bg-slate-100 dark:bg-slate-800/50"
                            />
                        </div>

                        <DashbaordScolarite
                            anneeActive={anneeActive.libelle}
                            repartitionNiveaux={repartitionNiveaux}
                            dernieres_inscriptions={dernieres_inscriptions}
                        />
                    </>
                )}

                {isInspecteurPedagogique && (
                    <>
                        {/* ── Key Metrics Grid ────────────────────────────────────────── */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <StatCard
                                label="Classes"
                                value={stats_globales.totalClasses}
                                icon={GraduationCap}
                                color="text-blue-600"
                                bg="bg-blue-50 dark:bg-blue-950/40"
                            />
                            <StatCard
                                label="Filières"
                                value={stats_globales.totalFilieres}
                                icon={Layers}
                                color="text-violet-600"
                                bg="bg-violet-50 dark:bg-violet-950/40"
                            />
                            <StatCard
                                label="Enseignants"
                                value={stats_globales.totalEnseignants}
                                icon={Users2}
                                color="text-green-600"
                                bg="bg-green-50 dark:bg-green-950/40"
                            />
                            {/* <StatCard
                                label="Evaluations reçues"
                                value={stats_globales.totalEvaluationRecues}
                                icon={ClipboardList}
                                color="text-pink-600"
                                bg="bg-pink-100 dark:bg-pink-800/50"
                            /> */}
                        </div>

                        <DashbaordPedagogie
                            anneeActive={anneeActive.libelle}
                            repartitionNiveaux={repartitionNiveaux}
                        />

                            <Card className="col-span-12 md:col-span-8">
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>Dernières évaluations reçues</span>

                                <Link href="/evaluations">
                                    <Button variant={'ghost'}>
                                        Voir plus <ArrowRight />
                                    </Button>
                                </Link>
                            </CardTitle>

                            <CardDescription>
                                Liste des 5 dernières évaluations que vous avez reçu
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
                    </>
                )}
            </div>
        </AppLayout>
    );
}
