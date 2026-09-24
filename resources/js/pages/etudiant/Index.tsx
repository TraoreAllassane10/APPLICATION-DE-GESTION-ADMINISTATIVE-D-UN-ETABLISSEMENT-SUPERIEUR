
import ModalConfirmationSuppression from '@/components/modals/ModalConfirmationSuppression';
import EtudiantFiltresSection from '@/features/etudiant/components/acceuil/EtudiantFiltresSection';
import EtudiantHeaderSection from '@/features/etudiant/components/acceuil/EtudiantHeaderSection';
import EtudiantTableauSection from '@/features/etudiant/components/acceuil/EtudiantTableauSection';
import EtudiantStats from '@/features/etudiant/components/EtudiantStats';
import useEtudiant from '@/features/etudiant/hooks/useEtudiant';
import {
    EtudiantData,
    StatsEtudiant,
} from '@/features/etudiant/types/etudiant.types';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Tableau de bord', href: '/dashboard' },
    { title: 'Etudiants', href: '/etudiants' },
];

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
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const hasFilters =
        search || filtreStatut !== 'all' || filtreGenre !== 'all';

    const reset = () => {
        setSearch('');
        setFiltreStatut('all');
        setFiltreGenre('all');

        router.visit('/etudiants');
    };

    const { deleteEtudiant, rechercheEtFiltrage } = useEtudiant();

    const handleDelete = async () => {
        if (selectedId) {
            console.log("delete");
            await deleteEtudiant(selectedId);
            setSelectedId(null);
        }
    };

    // Synchronisation des states
    useEffect(() => {
        setSearch(filters.search ?? '');
        setFiltreStatut(filters.statut ?? 'all');
        setFiltreGenre(filters.genre ?? 'all');

    }, [filters.genre, filters.search, filters.statut]);

    const handleSearch = () => {
        rechercheEtFiltrage(search, filtreStatut, filtreGenre);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
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
                    onChangeSelectedId={setSelectedId}
                />

                {/* Dialog confirmation suppression */}
                <ModalConfirmationSuppression
                    title="Supprimer cet étudiant ?"
                    content="Cette action est irréversible. La suppression cet étudiant peut entraîner
                    la perte de toute ses données. Toutefois la suppression peut echouer si l'étudiant a fait l'objet d'au moins une inscription."
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    handleDelete={handleDelete}
                />
            </div>
        </AppLayout>
    );
}
