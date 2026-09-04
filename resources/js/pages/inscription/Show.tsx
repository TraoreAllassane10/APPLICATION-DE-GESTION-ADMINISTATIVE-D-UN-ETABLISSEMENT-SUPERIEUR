import { Alert, AlertDescription } from '@/components/ui/alert';
import InscriptionShowHeader from '@/features/inscription/components/show/InscriptionShowHeader';
import InscriptionShowTabs from '@/features/inscription/components/show/InscriptionShowTabs';
import TabFinancier from '@/features/inscription/components/show/TabFinancier';
import TabGeneral from '@/features/inscription/components/show/TabGeneral';
import TabResultats from '@/features/inscription/components/show/TabResultats';
import { TABS } from '@/features/inscription/constants';
import {
    Inscription,
    Tab,
} from '@/features/inscription/types/inscription.types';
import AppLayout from '@/layouts/app-layout';
import { Auth } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Lock } from 'lucide-react';
import { useState } from 'react';

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

                <InscriptionShowHeader inscription={inscription} />

                {/* Onglets */}
                <InscriptionShowTabs
                    Tabs={TABS}
                    activeTab={activeTab}
                    onActiveTab={setActiveTab}
                />

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
