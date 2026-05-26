import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BadgeDollarSign,
    BookOpen,
    GraduationCap,
    ReceiptText,
    TrendingUp,
    Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
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

import StatCard from '@/components/dashboard/StatCardDashboard';
import {
    Annee,
    Auth,
    Inscription,
    Paiement,
    RepartitionNiveau,
    StatFinanciere,
    StatGlobales,
} from '@/types';
import { fmt } from '@/utils/util';

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
        (role) => role.name == 'Administrateur',
    );

    return (
        <AppLayout>
            <Head title="Tableau de bord" />

            <div className="space-y-6 p-6">
                {/* ── Header ──────────────────────────────────────────────────── */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Tableau de bord
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            Année universitaire{' '}
                            <span className="font-semibold text-foreground">
                                {anneeActive.libelle}
                            </span>
                        </p>
                    </div>
                </div>

                {/* ── Stats globales ───────────────────────────────────────────── */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <StatCard
                        label="Étudiants"
                        value={stats_globales.totalEtudiants}
                        sub="Fichier général"
                        icon={Users}
                        color="text-blue-600"
                        bg="bg-blue-50"
                        // trend={{ label: '+12 ce mois', up: true }}
                    />
                    <StatCard
                        label="Inscriptions"
                        value={stats_globales.totalInscriptions}
                        sub={anneeActive.libelle}
                        icon={GraduationCap}
                        color="text-violet-600"
                        bg="bg-violet-50"
                        // trend={{ label: '+5 ce mois', up: true }}
                    />
                    <StatCard
                        label="Enseignants"
                        value={stats_globales.totalEnseignants}
                        icon={BookOpen}
                        color="text-cyan-600"
                        bg="bg-cyan-50"
                    />
                    <StatCard
                        label="Filières actives"
                        value={stats_globales.totalFilieres}
                        icon={ReceiptText}
                        color="text-slate-600"
                        bg="bg-slate-100"
                    />
                </div>

                {isAdmin ? (
                    <div className="space-y-6">
                        {/* ── Situation financière et niveaux ─────────────────────────────────────── */}
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            {/* Recouvrement */}
                            <Card className="shadow-sm">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                                        <TrendingUp className="h-4 w-4 text-primary" />
                                        Recouvrement global
                                    </CardTitle>
                                    <CardDescription className="text-xs">
                                        {anneeActive.libelle}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-5">
                                    {/* Jauge circulaire SVG */}
                                    <div className="flex justify-center">
                                        <div className="relative h-32 w-32">
                                            <svg
                                                viewBox="0 0 100 100"
                                                className="h-full w-full -rotate-90"
                                            >
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="38"
                                                    fill="none"
                                                    stroke="hsl(var(--muted))"
                                                    strokeWidth="10"
                                                />
                                                <circle
                                                    cx="50"
                                                    cy="50"
                                                    r="38"
                                                    fill="none"
                                                    stroke={
                                                        taux >= 80
                                                            ? '#10b981'
                                                            : taux >= 50
                                                              ? '#3b82f6'
                                                              : '#f59e0b'
                                                    }
                                                    strokeWidth="10"
                                                    strokeDasharray={`${taux * 2.388} 238.8`}
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                <span className="text-2xl font-bold">
                                                    {taux}%
                                                </span>
                                                <span className="text-[10px] text-muted-foreground">
                                                    recouvré
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-0 divide-y">
                                        {[
                                            {
                                                label: 'Total attendu',
                                                value: fmt(
                                                    stats_financiere.totalAttendu,
                                                ),
                                                color: 'text-foreground',
                                            },
                                            {
                                                label: 'Montant payé',
                                                value: fmt(
                                                    stats_financiere.totalPaye,
                                                ),
                                                color: 'text-emerald-600',
                                            },
                                            {
                                                label: 'Reste à payer',
                                                value: fmt(
                                                    stats_financiere.resteAPayer,
                                                ),
                                                color: 'text-rose-600',
                                            },
                                        ].map(({ label, value, color }) => (
                                            <div
                                                key={label}
                                                className="flex items-center justify-between py-2.5 text-sm"
                                            >
                                                <span className="text-muted-foreground">
                                                    {label}
                                                </span>
                                                <span
                                                    className={`font-bold tabular-nums ${color}`}
                                                >
                                                    {value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Graphique mensuel */}
                            <Card className="shadow-sm">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm font-semibold">
                                        Inscriptions par niveau
                                    </CardTitle>
                                    <CardDescription className="text-xs">
                                        {anneeActive.libelle}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {(() => {
                                        const max = Math.max(
                                            ...repartitionNiveaux.map(
                                                (r) => r.inscrits,
                                            ),
                                        );
                                        return repartitionNiveaux.map(
                                            ({ niveau, inscrits, couleur }) => (
                                                <div
                                                    key={niveau}
                                                    className="space-y-1"
                                                >
                                                    <div className="flex justify-between text-sm">
                                                        <span className="font-medium">
                                                            {niveau}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground tabular-nums">
                                                            {inscrits} étudiants
                                                        </span>
                                                    </div>
                                                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                                                        <div
                                                            className="h-full rounded-full transition-all duration-700"
                                                            style={{
                                                                width: `${Math.round((inscrits / max) * 100)}%`,
                                                                background:
                                                                    couleur,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ),
                                        );
                                    })()}
                                </CardContent>
                            </Card>
                        </div>

                        {/* ── Derniers paiements + Dernières inscriptions ──────────────── */}
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                            {/* Derniers paiements */}
                            <Card className="overflow-hidden shadow-sm">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                                            <BadgeDollarSign className="h-4 w-4 text-emerald-600" />
                                            Derniers paiements
                                        </CardTitle>
                                    </div>
                                </CardHeader>
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                                            <TableHead className="py-2 text-xs">
                                                Étudiant
                                            </TableHead>
                                            <TableHead className="py-2 text-xs">
                                                Montant
                                            </TableHead>
                                            <TableHead className="py-2 text-xs">
                                                Date
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {derniers_paiements.map((p) => (
                                            <TableRow key={p.id}>
                                                <TableCell className="py-2.5">
                                                    <p className="text-sm leading-none font-medium">
                                                        {
                                                            p.inscription
                                                                ?.etudiant.nom
                                                        }{' '}
                                                        {
                                                            p.inscription
                                                                ?.etudiant
                                                                .prenom
                                                        }
                                                    </p>
                                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                                        <code className="font-mono text-[11px]">
                                                            {
                                                                p.inscription
                                                                    ?.etudiant
                                                                    .ip
                                                            }
                                                        </code>
                                                        {' · '}
                                                        {p.inscription?.niveaux.map(
                                                            (niveau) => (
                                                                <span>
                                                                    {niveau.nom}
                                                                </span>
                                                            ),
                                                        )}
                                                    </p>
                                                </TableCell>
                                                <TableCell className="py-2.5">
                                                    <span className="text-sm font-bold text-emerald-600 tabular-nums">
                                                        +{p.montant} FCFA
                                                    </span>
                                                    <p className="text-xs text-muted-foreground">
                                                        {p.methode_paiement}
                                                    </p>
                                                </TableCell>
                                                <TableCell className="py-2.5 text-xs text-muted-foreground tabular-nums">
                                                    {new Date(
                                                        p.date_paiement,
                                                    ).toLocaleDateString(
                                                        'fr-FR',
                                                        {
                                                            day: '2-digit',
                                                            month: 'short',
                                                        },
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Card>

                            {/* Dernières inscriptions */}
                            <Card className="overflow-hidden shadow-sm">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                                            <GraduationCap className="h-4 w-4 text-violet-600" />
                                            Dernières inscriptions
                                        </CardTitle>
                                        <Link href="/inscriptions">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 gap-1 text-xs text-muted-foreground"
                                            >
                                                Tout voir{' '}
                                                <ArrowRight className="h-3 w-3" />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardHeader>
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                                            <TableHead className="py-2 text-xs">
                                                Étudiant
                                            </TableHead>
                                            <TableHead className="py-2 text-xs">
                                                Niveau
                                            </TableHead>
                                            <TableHead className="py-2 text-xs">
                                                Date
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {dernieres_inscriptions.map((ins) => (
                                            <TableRow key={ins.id}>
                                                <TableCell className="py-2.5">
                                                    <p className="text-sm leading-none font-medium">
                                                        {ins.etudiant.nom}{' '}
                                                        {ins.etudiant.prenom}
                                                    </p>
                                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                                        {
                                                            ins.niveaux[0]
                                                                .filiere.nom
                                                        }
                                                    </p>
                                                </TableCell>
                                                <TableCell className="py-2.5">
                                                    <Badge
                                                        variant="secondary"
                                                        className="text-xs font-bold"
                                                    >
                                                        {ins.niveaux.map(
                                                            (niveau) => (
                                                                <span>
                                                                    {niveau.nom}
                                                                </span>
                                                            ),
                                                        )}
                                                    </Badge>
                                                    <p className="mt-0.5 text-xs text-muted-foreground">
                                                        {ins.annee.libelle}
                                                    </p>
                                                </TableCell>
                                                <TableCell className="py-2.5 text-xs text-muted-foreground tabular-nums">
                                                    {new Date(
                                                        ins.date,
                                                    ).toLocaleDateString(
                                                        'fr-FR',
                                                        {
                                                            day: '2-digit',
                                                            month: 'short',
                                                        },
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Card>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Graphique mensuel */}
                        <Card className="shadow-sm">
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm font-semibold">
                                    Inscriptions par niveau
                                </CardTitle>
                                <CardDescription className="text-xs">
                                    {anneeActive.libelle}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {(() => {
                                    const max = Math.max(
                                        ...repartitionNiveaux.map(
                                            (r) => r.inscrits,
                                        ),
                                    );
                                    return repartitionNiveaux.map(
                                        ({ niveau, inscrits, couleur }) => (
                                            <div
                                                key={niveau}
                                                className="space-y-1"
                                            >
                                                <div className="flex justify-between text-sm">
                                                    <span className="font-medium">
                                                        {niveau}
                                                    </span>
                                                    <span className="text-xs text-muted-foreground tabular-nums">
                                                        {inscrits} étudiants
                                                    </span>
                                                </div>
                                                <div className="h-2 overflow-hidden rounded-full bg-muted">
                                                    <div
                                                        className="h-full rounded-full transition-all duration-700"
                                                        style={{
                                                            width: `${Math.round((inscrits / max) * 100)}%`,
                                                            background: couleur,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        ),
                                    );
                                })()}
                            </CardContent>
                        </Card>

                        {/* Dernières inscriptions */}
                        <Card className="overflow-hidden shadow-sm">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                                        <GraduationCap className="h-4 w-4 text-violet-600" />
                                        Dernières inscriptions
                                    </CardTitle>
                                    <Link href="/inscriptions">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 gap-1 text-xs text-muted-foreground"
                                        >
                                            Tout voir{' '}
                                            <ArrowRight className="h-3 w-3" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardHeader>
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                                        <TableHead className="py-2 text-xs">
                                            Étudiant
                                        </TableHead>
                                        <TableHead className="py-2 text-xs">
                                            Niveau
                                        </TableHead>
                                        <TableHead className="py-2 text-xs">
                                            Date
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {dernieres_inscriptions.map((ins) => (
                                        <TableRow key={ins.id}>
                                            <TableCell className="py-2.5">
                                                <p className="text-sm leading-none font-medium">
                                                    {ins.etudiant.nom}{' '}
                                                    {ins.etudiant.prenom}
                                                </p>
                                                <p className="mt-0.5 text-xs text-muted-foreground">
                                                    {ins.niveaux[0].filiere.nom}
                                                </p>
                                            </TableCell>
                                            <TableCell className="py-2.5">
                                                <Badge
                                                    variant="secondary"
                                                    className="text-xs font-bold"
                                                >
                                                    {ins.niveaux.map(
                                                        (niveau) => (
                                                            <span>
                                                                {niveau.nom}
                                                            </span>
                                                        ),
                                                    )}
                                                </Badge>
                                                <p className="mt-0.5 text-xs text-muted-foreground">
                                                    {ins.annee.libelle}
                                                </p>
                                            </TableCell>
                                            <TableCell className="py-2.5 text-xs text-muted-foreground tabular-nums">
                                                {new Date(
                                                    ins.date,
                                                ).toLocaleDateString('fr-FR', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                })}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Card>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
