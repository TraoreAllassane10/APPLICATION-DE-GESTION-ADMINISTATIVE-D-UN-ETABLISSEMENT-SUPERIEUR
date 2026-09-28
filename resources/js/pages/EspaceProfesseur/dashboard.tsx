import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Annee } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Award,
    BookOpen,
    CheckSquare,
    GraduationCap,
    Sparkles,
    Users,
} from 'lucide-react';

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
    anneeActive: Annee;
    [key: string]: unknown;
}

export default function DashboardProfesseur() {
    const { professeur, anneeActive } =
        usePage<DashboardProfesseurProps>().props;

    const getInitials = (name: string) => {
        if (!name) return 'PR';
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Extraire les classes (niveaux)
    const rawNiveaux =
        professeur.enseignements?.flatMap((ens) => ens.niveaux || []) || [];
    const classesList = Array.from(
        new Map(
            rawNiveaux
                .filter((n): n is Niveau => Boolean(n && n.id))
                .map((n) => [n.id, n]),
        ).values(),
    );

    // Extraire les matières (cours)
    const rawCours =
        professeur.enseignements?.flatMap((ens) => ens.cours || []) || [];
    const matieresList = Array.from(
        new Map(
            rawCours
                .filter((c): c is Cours => Boolean(c && c.id))
                .map((c) => [c.id, c]),
        ).values(),
    );

    return (
        <AppLayout>
            <Head title="Tableau de bord - Enseignant" />

            <div className="min-h-screen space-y-6 bg-[#F8FAFC] p-4 sm:p-6 lg:p-8">
                {/* 1. SECTION BANNIÈRE D'ACCUEIL */}
                <div className="w-full gap-6">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 p-6 text-white shadow-xl shadow-blue-500/10 sm:p-8 lg:col-span-8">
                        {/* Motif visuel d'arrière-plan */}
                        <div className="pointer-events-none absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-2xl" />

                        <div className="relative z-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
                            <div className="max-w-xl space-y-3">
                                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md">
                                    <Sparkles className="h-3.5 w-3.5 text-yellow-300" />
                                    <span>
                                        Espace Enseignant • Année Académique{' '}
                                        {anneeActive.libelle}
                                    </span>
                                </div>
                                <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                                    Bonjour, {professeur.nom_prenom} !
                                </h1>
                                <p className="text-sm leading-relaxed text-blue-100">
                                    Inspirez la réussite de vos étudiants. Vous
                                    avez{' '}
                                    <span className="font-semibold text-white">
                                        {classesList.length} classe(s)
                                    </span>{' '}
                                    et{' '}
                                    <span className="font-semibold text-white">
                                        {matieresList.length} matière(s)
                                    </span>{' '}
                                    attribuée(s) aujourd'hui.
                                </p>
                                <div className="pt-2">
                                    <Button className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 font-semibold text-blue-600 shadow-md transition-all hover:bg-blue-50">
                                        <span>Consulter mes évaluations</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Avatar & Badge */}
                            <div className="hidden flex-col items-center gap-2 sm:flex">
                                <Avatar className="h-24 w-24 border-4 border-white/20 shadow-2xl">
                                    <AvatarImage
                                        src={professeur.avatar}
                                        alt={professeur.nom_prenom}
                                    />
                                    <AvatarFallback className="bg-white text-2xl font-bold text-blue-600">
                                        {getInitials(professeur.nom_prenom)}
                                    </AvatarFallback>
                                </Avatar>
                                {professeur.specialite && (
                                    <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                        {professeur.specialite}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. CARTES STATISTIQUES (KPIs) */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
                    {/* Carte 1 */}
                    <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                Classes
                            </span>
                            <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600">
                                <GraduationCap className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-3xl font-extrabold text-slate-900">
                                    {classesList.length}
                                </p>
                                <p className="mt-1 text-xs text-slate-400">
                                    Niveaux actifs
                                </p>
                            </div>
                            {/* Micro Wave SVG */}
                            <svg
                                className="h-8 w-16 text-blue-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 50 20"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M0 15 Q12.5 5 25 12.5 T50 5"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Carte 2 */}
                    <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                                Matières
                            </span>
                            <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600">
                                <BookOpen className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-3xl font-extrabold text-slate-900">
                                    {matieresList.length}
                                </p>
                                <p className="mt-1 text-xs text-slate-400">
                                    Enseignements
                                </p>
                            </div>
                            <svg
                                className="h-8 w-16 text-emerald-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 50 20"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M0 10 Q12.5 18 25 8 T50 15"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* 3. RACCOURCIS RAPIDES (Quick Links Bar) */}
                <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                    <div className="mb-3 flex items-center justify-between px-2">
                        <h2 className="text-sm font-bold tracking-wider text-slate-800 uppercase">
                            Accès Rapides
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
                        {[
                            {
                                label: 'Évaluations',
                                icon: CheckSquare,
                                color: 'text-amber-600 bg-amber-50',
                            },
                            {
                                label: 'Moyennes',
                                icon: Award,
                                color: 'text-pink-600 bg-pink-50',
                            },
                            {
                                label: 'Présences',
                                icon: Users,
                                color: 'text-emerald-600 bg-emerald-50',
                            },
                        ].map((link, idx) => (
                            <button
                                key={idx}
                                className="group flex flex-col items-center justify-center rounded-xl border border-slate-50 bg-slate-50/50 p-3 transition-all hover:border-slate-200 hover:bg-white hover:shadow-sm"
                            >
                                <div
                                    className={`mb-2 rounded-xl p-2.5 transition-transform group-hover:scale-110 ${link.color}`}
                                >
                                    <link.icon className="h-5 w-5" />
                                </div>
                                <span className="text-xs font-semibold text-slate-700 transition-colors group-hover:text-blue-600">
                                    {link.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 4. GRILLE PRINCIPALE (CLASSES ET MATIÈRES) */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                    {/* MES CLASSES */}
                    <Card className="col-span-12 overflow-hidden rounded-2xl border-slate-100 shadow-sm lg:col-span-6">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-slate-100 bg-white p-5">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                                    <GraduationCap className="h-5 w-5" />
                                </div>
                                <div>
                                    <CardTitle className="text-base font-bold text-slate-800">
                                        Mes Classes / Niveaux
                                    </CardTitle>
                                    <p className="text-xs text-slate-400">
                                        Classes sous votre responsabilité
                                        académique
                                    </p>
                                </div>
                            </div>
                            <Badge className="border-none bg-blue-50 font-semibold text-blue-700 hover:bg-blue-100">
                                {classesList.length} Total
                            </Badge>
                        </CardHeader>
                        <CardContent className="bg-white p-5">
                            {classesList.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {classesList.map((niveau) => (
                                        <div
                                            key={niveau.id}
                                            className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/30 p-4 transition-all hover:border-blue-200 hover:bg-white hover:shadow-md"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                                                    {niveau.nom
                                                        .slice(0, 2)
                                                        .toUpperCase()}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-slate-800 transition-colors group-hover:text-blue-600">
                                                        {niveau.nom}
                                                    </h4>
                                                    <p className="text-xs text-slate-400">
                                                        Classe active
                                                    </p>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-8 text-center text-sm text-slate-400">
                                    Aucune classe affectée.
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* MES MATIÈRES */}
                    <Card className="col-span-12 overflow-hidden rounded-2xl border-slate-100 shadow-sm lg:col-span-6">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-slate-100 bg-white p-5">
                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-emerald-50 p-2 text-emerald-600">
                                    <BookOpen className="h-5 w-5" />
                                </div>
                                <div>
                                    <CardTitle className="text-base font-bold text-slate-800">
                                        Mes Matières & Cours
                                    </CardTitle>
                                    <p className="text-xs text-slate-400">
                                        Modules de cours dispensés
                                    </p>
                                </div>
                            </div>
                            <Badge className="border-none bg-emerald-50 font-semibold text-emerald-700 hover:bg-emerald-100">
                                {matieresList.length} Total
                            </Badge>
                        </CardHeader>
                        <CardContent className="bg-white p-5">
                            {matieresList.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {matieresList.map((cours) => (
                                        <div
                                            key={cours.id}
                                            className="group flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/30 p-4 transition-all hover:border-emerald-200 hover:bg-white hover:shadow-md"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-sm font-bold text-emerald-600 capitalize transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                                                    {cours.nom
                                                        .slice(0, 2)
                                                        .toUpperCase()}
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-bold text-slate-800 capitalize transition-colors group-hover:text-emerald-600">
                                                        {cours.nom}
                                                    </h4>
                                                    <p className="text-xs text-slate-400">
                                                        Matière principale
                                                    </p>
                                                </div>
                                            </div>
                                           
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-8 text-center text-sm text-slate-400">
                                    Aucune matière affectée.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
