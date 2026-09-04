import PaiementFiltres from '@/features/paiement/components/PaiementFiltres';
import PaiementTable from '@/features/paiement/components/PaiementTable';
import StatsCardsPaiements from '@/features/paiement/components/StatsCardsPaiements';
import { paiementData } from '@/features/paiement/types/paiement.types';
import usePaiement from '@/hooks/usePaiement';
import AppLayout from '@/layouts/app-layout';
import { Annee, BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Historique', href: '/historique' },
];

interface ActionProps {
    paiements: paiementData;
    anneeActive: Annee;
    total_recette_inscriptions: number;
    total_encaisse: number;
    total_reste: number;
    [key: string]: unknown;
}

const Index = () => {
    const {
        total_recette_inscriptions,
        total_encaisse,
        total_reste,
        paiements,
        anneeActive,
    } = usePage<ActionProps>().props;

    const [filtrePeriode, setFiltrePeriode] = useState('all');
    const hasFilters = filtrePeriode !== 'all';

    const { rechercheEtFiltrage } = usePaiement();

    const reset = () => {
        setFiltrePeriode('all');
        router.visit('/paiements');
    };

    const handleSearch = () => {
        rechercheEtFiltrage(filtrePeriode);
    };

    const handleExport = () => {
        window.location.href = `/paiements/export?periode=${filtrePeriode}`;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-5 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Gestion des paiements
                    </h1>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                        Consultez l'ensemble des paiements de scolarité
                        éffectué. ({anneeActive.libelle})
                    </p>
                </div>

                {/* Stats */}
                <StatsCardsPaiements
                    total_recette_inscriptions={total_recette_inscriptions}
                    total_encaisse={total_encaisse}
                    total_reste={total_reste}
                />

                {/* Filtres */}
                <PaiementFiltres
                    filtrePeriode={filtrePeriode}
                    onChangeFiltrePeriode={setFiltrePeriode}
                    hasFilters={hasFilters}
                    onSearch={handleSearch}
                    onReset={reset}
                    onExport={handleExport}
                />

                {/* Tableau */}
                <PaiementTable
                    paiements={paiements}
                    hasFilters={hasFilters}
                    onRest={reset}
                />
            </div>
        </AppLayout>
    );
};

export default Index;
