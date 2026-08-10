import AcademiqueSection from '@/components/etudiant/AcademiqueSection';
import ContactSection from '@/components/etudiant/ContactSection';
import ProfilSection from '@/components/etudiant/ProfilSection';
import ResponsableSection from '@/components/etudiant/ResponsableSection';
import StatutBadge from '@/components/etudiant/StatutBadge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Etudiant } from '@/types';
import { fmt } from '@/utils/util';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    BookOpen,
    Calendar,
    GraduationCap,
    Hash,
    Mail,
    Pencil,
    Phone,
    Printer,
    User,
    Users,
} from 'lucide-react';
import { useState } from 'react';

type Tab = 'profil' | 'academique' | 'contact' | 'responsable' | 'inscriptions';

const TABS: {
    id: Tab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}[] = [
    { id: 'profil', label: 'Profil', icon: User },
    { id: 'academique', label: 'Académique', icon: BookOpen },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'responsable', label: 'Affiliation', icon: Users },
    { id: 'inscriptions', label: 'Inscriptions', icon: GraduationCap },
];

export default function Show() {
    const { etudiant } = usePage<{ etudiant: Etudiant }>().props;

    const [activeTab, setActiveTab] = useState<Tab>('profil');

    // Age de l'tudiant
    const age =
        new Date().getFullYear() -
        new Date(etudiant.date_naissance).getFullYear();

    return (
        <AppLayout>
            <Head title={`${etudiant.prenom} ${etudiant.nom}`} />

            <div className="space-y-6 p-6">
                {/* Breadcrumb */}
                <Link
                    href="/etudiants"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="h-3.5 w-3.5" /> Retour aux étudiants
                </Link>

                {/* Header */}
                <Card className="overflow-hidden shadow-sm">
                    <div className="h-1.5 bg-gradient-to-r from-primary to-primary/30" />
                    <CardContent className="p-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            {/* Avatar */}
                            <div
                                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold ${etudiant.genre === 'Féminin' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'} `}
                            >
                                {etudiant.photo ? (
                                    <img
                                        src={`/storage/${etudiant.photo}`}
                                        className="h-16 w-16 rounded-full object-cover"
                                    />
                                ) : (
                                    <p>
                                        {etudiant.nom[0]}
                                        {etudiant.prenom[0]}
                                    </p>
                                )}
                            </div>

                            {/* Infos principales */}
                            <div className="min-w-0 flex-1">
                                <div className="mb-1 flex flex-wrap items-center gap-2">
                                    <h1 className="text-xl font-bold tracking-tight">
                                        {etudiant.civilite} {etudiant.nom}{' '}
                                        {etudiant.prenom}
                                    </h1>
                                    <StatutBadge statut={etudiant.statut} />
                                    <Badge
                                        variant="outline"
                                        className="text-xs"
                                    >
                                        {etudiant.genre}
                                    </Badge>
                                </div>
                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Hash className="h-3 w-3" />
                                        <code className="font-mono text-xs">
                                            {etudiant.ip}
                                        </code>
                                    </span>
                                    {etudiant.email && (
                                        <span className="flex items-center gap-1">
                                            <Mail className="h-3 w-3" />{' '}
                                            {etudiant.email}
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(
                                            etudiant.date_naissance,
                                        ).toLocaleDateString('fr-FR')}{' '}
                                        ({age} ans)
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="shrink-0 space-x-2">
                                <a
                                    href={`/etudiants/${etudiant.ip}/fiche`}
                                    target="_blank"
                                >
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-1.5"
                                    >
                                        <Printer className="h-3.5 w-3.5" />{' '}
                                        Fiche d'identification
                                    </Button>
                                </a>

                                <a
                                    href={`/etudiants/${etudiant.ip}/certificat-scolarite`}
                                    target="_blank"
                                >
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-1.5"
                                    >
                                        <Printer className="h-3.5 w-3.5" />{' '}
                                        Certificat de scolarité
                                    </Button>
                                </a>

                                <Link href={`/etudiants/${etudiant.ip}/edit`}>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-1.5"
                                    >
                                        <Pencil className="h-3.5 w-3.5" />{' '}
                                        Modifier
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Onglets */}
                <div className="flex gap-0 overflow-x-auto border-b">
                    {TABS.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                                activeTab === id
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                            } `}
                        >
                            <Icon className="h-4 w-4" />
                            {label}
                        </button>
                    ))}
                </div>

                {/* ─── Onglet Profil ──────────────────────────────────────────── */}
                {activeTab === 'profil' && (
                    <ProfilSection etudiant={etudiant} />
                )}

                {/* ─── Onglet Académique ──────────────────────────────────────── */}
                {activeTab === 'academique' && (
                    <AcademiqueSection etudiant={etudiant} />
                )}

                {/* ─── Onglet Contact ─────────────────────────────────────────── */}
                {activeTab === 'contact' && (
                    <ContactSection etudiant={etudiant} />
                )}

                {/* ─── Onglet Responsable ─────────────────────────────────────── */}
                {activeTab === 'responsable' && (
                    <ResponsableSection etudiant={etudiant} />
                )}

                {/* ─── Onglet Inscriptions ────────────────────────────────────── */}
                {activeTab === 'inscriptions' && (
                    <div className="space-y-4">
                        {etudiant.inscriptions.length === 0 ? (
                            <Alert className="border-muted bg-muted/40">
                                <GraduationCap className="h-4 w-4" />
                                <AlertDescription className="text-sm text-muted-foreground">
                                    Aucune inscription enregistrée pour cet
                                    étudiant.{' '}
                                    <Link
                                        href="/inscriptions/create"
                                        className="underline"
                                    >
                                        Inscrire l'étudiant
                                    </Link>
                                </AlertDescription>
                            </Alert>
                        ) : (
                            etudiant.inscriptions.map((ins) => {
                                return (
                                    <Card key={ins.id} className="shadow-sm">
                                        <CardContent className="p-4">
                                            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                                                <div className="space-y-1">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="text-sm font-semibold">
                                                            {ins.annee.libelle}
                                                        </span>
                                                        {ins.niveaux.map(
                                                            (niveau) => (
                                                                <Badge
                                                                    variant="secondary"
                                                                    className="font-bold"
                                                                >
                                                                    {niveau.nom}
                                                                </Badge>
                                                            ),
                                                        )}
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold`}
                                                        >
                                                            <span
                                                                className={`h-1.5 w-1.5 rounded-full`}
                                                            />
                                                            {ins.status}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {
                                                                ins.type_inscription
                                                            }
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">
                                                        Scolarité :{' '}
                                                        {fmt(ins.montant_total)}
                                                    </p>
                                                </div>
                                                <Link
                                                    href={`/inscriptions/${ins.id}`}
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="gap-1.5"
                                                    >
                                                        Voir l'inscription
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })
                        )}

                        <div className="pt-2 text-center">
                            <Link href="/inscriptions/create">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1.5"
                                >
                                    <GraduationCap className="h-4 w-4" />
                                    Nouvelle inscription
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
