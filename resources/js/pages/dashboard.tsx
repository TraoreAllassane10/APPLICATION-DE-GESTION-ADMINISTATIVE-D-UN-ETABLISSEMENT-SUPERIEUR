import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    GraduationCap,
    ReceiptText,
    UserPlus,
    Users,
} from 'lucide-react';

import StatCard from '@/components/dashboard/StatCardDashboard';
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
import DashbaordPedagogie from '@/features/dashboard/components/DashbaordPedagogie';

interface DashboardProps {
    anneeActive: Annee;
    stats_globales: StatGlobales;
    stats_financiere: StatFinanciere;
    derniers_paiements: Paiement[];
    dernieres_inscriptions: Inscription[];
    repartitionNiveaux: RepartitionNiveau[];
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

                {isAdmin && (
                    <DashboardAdmin
                        anneeActive={anneeActive.libelle}
                        taux={taux}
                        stats_financiere={stats_financiere}
                        repartitionNiveaux={repartitionNiveaux}
                        dernieres_inscriptions={dernieres_inscriptions}
                        derniers_paiements={derniers_paiements}
                    />
                )}

                {isSecretaireScolarite && (
                    <DashbaordScolarite
                        anneeActive={anneeActive.libelle}
                        repartitionNiveaux={repartitionNiveaux}
                        dernieres_inscriptions={dernieres_inscriptions}
                    />
                )}

                {isInspecteurPedagogique && (
                    <DashbaordPedagogie
                        anneeActive={anneeActive.libelle}
                        repartitionNiveaux={repartitionNiveaux}
                        dernieres_inscriptions={dernieres_inscriptions}
                    />
                )}
            </div>
        </AppLayout>
    );
}
