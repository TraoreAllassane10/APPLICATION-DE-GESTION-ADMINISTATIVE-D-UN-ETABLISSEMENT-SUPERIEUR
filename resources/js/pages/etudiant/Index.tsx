import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import EtudiantFiltresSection from '@/features/etudiant/components/acceuil/EtudiantFiltresSection';
import EtudiantHeaderSection from '@/features/etudiant/components/acceuil/EtudiantHeaderSection';
import EtudiantTableauSection from '@/features/etudiant/components/acceuil/EtudiantTableauSection';
import EtudiantStats from '@/features/etudiant/components/EtudiantStats';
import useEtudiant from '@/features/etudiant/hooks/useEtudiant';
import { EtudiantData, StatsEtudiant } from '@/features/etudiant/types/etudiant.types';

interface EtudiantProps {
    stats: StatsEtudiant;
    etudiants: EtudiantData;
    filters: {
        search: string;
        statut: string;
        genre: string;
    };
    [key: string]: unknown;
}

export default function Index() {
    const { etudiants, stats, filters } = usePage<EtudiantProps>().props;

    const [search, setSearch] = useState(filters.search ?? '');
    const [filtreStatut, setFiltreStatut] = useState(filters.statut ?? 'all');
    const [filtreGenre, setFiltreGenre] = useState(filters.genre ?? 'all');

    const hasFilters =
        search || filtreStatut !== 'all' || filtreGenre !== 'all';

    const reset = () => {
        setSearch('');
        setFiltreStatut('all');
        setFiltreGenre('all');

        router.visit('/etudiants');
    };

    const { deleteEtudiant, rechercheEtFiltrage } = useEtudiant();

    const handleDelete = (ip: string) => {
        if (ip) {
            deleteEtudiant(ip);

            router.visit('/etudiants');
        }
    };

    // Synchronisation des states
    useEffect(() => {
        setSearch(filters.search ?? '');
        setFiltreStatut(filters.statut ?? 'all');
        setFiltreGenre(filters.genre ?? 'all');
    }, [filters]);

    const handleSearch = () => {
        rechercheEtFiltrage(search, filtreStatut, filtreGenre);
    };

    return (
        <AppLayout>
            <Head title="Étudiants" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <EtudiantHeaderSection />

                {/* Stats */}
                <EtudiantStats stats={stats} />

                {/* Filtres */}
                <EtudiantFiltresSection
                    search={search}
                    onChangeSearch={setSearch}
                    filtreGenre={filtreGenre}
                    onChangeFiltreGenre={setFiltreGenre}
                    filtreStatut={filtreStatut}
                    onChangeFiltreStatut={setFiltreStatut}
                    onSearch={handleSearch}
                    hasFilters={hasFilters}
                    reset={reset}
                    totalEtudiant={etudiants.data.length}
                />

                {/* Tableau */}
                <EtudiantTableauSection
                    etudiants={etudiants}
                    hasFilters={hasFilters}
                    onRest={reset}
                    onDelete={handleDelete}
                />
            </div>
        </AppLayout>
    );
}
