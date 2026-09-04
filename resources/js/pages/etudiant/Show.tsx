import AcademiqueSection from '@/features/etudiant/components/show/AcademiqueSection';
import ContactSection from '@/features/etudiant/components/show/ContactSection';
import ProfilSection from '@/features/etudiant/components/show/ProfilSection';
import ResponsableSection from '@/features/etudiant/components/show/ResponsableSection';
import EtudiantShowHeader from '@/features/etudiant/components/show/EtudiantShowHeader';
import EtudiantShowTabs from '@/features/etudiant/components/show/EtudiantShowTabs';
import { TABS } from '@/features/etudiant/constants';
import { Etudiant, Tab } from '@/features/etudiant/types/etudiant.types';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import InscriptionSection from '@/features/etudiant/components/show/InscriptionSection';

export default function Show() {
    const { etudiant } = usePage<{ etudiant: Etudiant }>().props;
    const [activeTab, setActiveTab] = useState<Tab>('profil');

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
                <EtudiantShowHeader etudiant={etudiant} />

                {/* Onglets */}
                <EtudiantShowTabs
                    Tabs={TABS}
                    activeTab={activeTab}
                    onActiveTab={setActiveTab}
                />

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
                    <InscriptionSection inscriptions={etudiant.inscriptions} />
                )}
            </div>
        </AppLayout>
    );
}
