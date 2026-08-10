import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, BarChart2, Lock, User, Wallet } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

import Avatar from '@/components/etudiant/Avatar';
import StatutInscriptionBadge from '@/components/inscription/StatutInscriptionBadge';
import TabFinancier from '@/components/inscription/TabFinancier';
import TabGeneral from '@/components/inscription/TabGeneral';
import TabResultats from '@/components/inscription/TabResultats';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Auth, Inscription } from '@/types';

type Tab = 'general' | 'financier' | 'resultats';

const TABS: {
    id: Tab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}[] = [
    { id: 'general', label: 'Informations générales', icon: User },
    { id: 'financier', label: 'Situation financière', icon: Wallet },
    { id: 'resultats', label: 'Résultats académiques', icon: BarChart2 },
];

export default function Show() {
    const { inscription, auth } = usePage<{
        inscription: Inscription;
        auth: Auth;
    }>().props;

    const [activeTab, setActiveTab] = useState<Tab>('general');

    const isAdmin = auth.user?.roles?.some(
        (role) => role.name == 'Administrateur',
    );

    return (
        <AppLayout>
            <Head
                title={`Inscription — ${inscription.etudiant?.prenom} ${inscription.etudiant?.nom}`}
            />

            <div className="space-y-6 p-6">
                {/* Breadcrumb */}
                <Link
                    href="/inscriptions"
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeft className="h-3.5 w-3.5" /> Retour aux
                    inscriptions
                </Link>

                {/* Header carte étudiant */}
                <Card className="overflow-hidden shadow-sm">
                    <div className="h-1.5 bg-gradient-to-r from-primary to-primary/40" />
                    <CardContent className="p-5">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Avatar
                                photo={inscription.etudiant.photo as string}
                                nom={inscription.etudiant?.nom}
                                prenom={inscription.etudiant?.prenom}
                                genre="ee"
                            />

                            {/* Infos */}
                            <div className="min-w-0 flex-1">
                                <div className="mb-0.5 flex flex-wrap items-center gap-2">
                                    <h1 className="text-xl font-bold tracking-tight">
                                        {inscription.etudiant?.nom}{' '}
                                        {inscription.etudiant?.prenom}
                                    </h1>
                                    {inscription.status && (
                                        <StatutInscriptionBadge
                                            statut={
                                                inscription.status === 'Bon'
                                                    ? 'En cours'
                                                    : inscription.status
                                            }
                                        />
                                    )}

                                    {inscription.niveaux?.map((niveau) => (
                                        <Badge
                                            variant="secondary"
                                            className="font-bold"
                                        >
                                            {niveau.nom}
                                        </Badge>
                                    ))}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {inscription.etudiant?.ip} ·{' '}
                                    {inscription.niveaux &&
                                        inscription.niveaux[0].filiere.nom}{' '}
                                    · {inscription.annee?.libelle}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Onglets */}
                <div className="flex gap-0 border-b">
                    {TABS.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`-mb-px inline-flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
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

                {/* Contenu onglet */}
                <div>
                    {activeTab === 'general' && (
                        <TabGeneral ins={inscription} />
                    )}
                    {activeTab === 'financier' &&
                        (isAdmin ? (
                            <TabFinancier ins={inscription} />
                        ) : (
                            <Alert>
                                <Lock className="h-8 w-8" />
                                <AlertDescription className="text-md">
                                    Desolé ! Vous n'êtes pas authoriser à
                                    acceder à cette fonctionnalité
                                </AlertDescription>
                            </Alert>
                        ))}
                    {activeTab === 'resultats' && (
                        <TabResultats ins={inscription} />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
