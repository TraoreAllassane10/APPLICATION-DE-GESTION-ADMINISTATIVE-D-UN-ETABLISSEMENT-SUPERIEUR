import ModalConfirmationSuppression from '@/components/modals/ModalConfirmationSuppression';
import InscriptionFiltres from '@/features/inscription/components/home/InscriptionFiltres';
import InscriptionHeader from '@/features/inscription/components/home/InscriptionHeader';
import InscriptionTable from '@/features/inscription/components/home/InscriptionTable';
import { Inscription } from '@/features/inscription/types/inscription.types';
import useInscription from '@/features/inscription/hooks/useInscription';
import AppLayout from '@/layouts/app-layout';
import { Annee, Auth, DataNiveau } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface InscriptionProps {
    annees: Annee[];
    niveaux: DataNiveau[];
    inscriptions: {
        data: Inscription[];
        links: {
            active: boolean;
            label: string;
            page: number;
            url: string;
        }[];
    };
    stats: {
        total_inscription: number;
        total_inscription_annee: number;
    };
    filters: {
        search: string;
        statut: string;
        niveau: string;
    };
    auth: Auth;
    [key: string]: unknown;
}

export default function Index() {
    const { niveaux, inscriptions, stats, filters, auth } =
        usePage<InscriptionProps>().props;

    const [selectedId, setSelectedId] = useState<number | null>(null);

    const isAdmin = auth.user?.roles?.some(
        (role) => role.name == 'Administrateur',
    );

    const [search, setSearch] = useState(filters.search ?? '');
    const [filtreNiveau, setFiltreNiveau] = useState(filters.niveau ?? 'all');
    const [filtreStatut, setFiltreStatut] = useState(filters.statut ?? 'all');

    const hasFilters =
        search || filtreNiveau !== 'all' || filtreStatut !== 'all';

    // Réinitialisation des states de filtrage et recherche
    const reset = () => {
        setSearch('');
        setFiltreNiveau('all');
        setFiltreStatut('all');

        router.visit('/inscriptions');
    };

    const { deleteEtudiant, rechercheEtFiltrage } = useInscription();

    const handleDelete = async () => {
        if (selectedId) {
            await deleteEtudiant(selectedId);
            setSelectedId(null);
        }
    };

    // Recherche
    const handleSearch = () => {
        rechercheEtFiltrage(search, filtreStatut, filtreNiveau);
    };

    return (
        <AppLayout>
            <Head title="Inscriptions" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <InscriptionHeader
                    total_inscription_annee={stats.total_inscription_annee}
                />

                {/* Filtres */}
                <InscriptionFiltres
                    search={search}
                    onChangeSearch={setSearch}
                    filtreNiveau={filtreNiveau}
                    onChangeFiltreNiveau={setFiltreNiveau}
                    filtreStatut={filtreStatut}
                    onChangeFiltreStatut={setFiltreStatut}
                    hasFilters={hasFilters}
                    niveaux={niveaux}
                    onSearch={handleSearch}
                    onReset={reset}
                    total_inscription={inscriptions.data.length}
                />

                {/* Tableau */}
                <InscriptionTable
                    isAdmin={isAdmin}
                    hasFilters={hasFilters}
                    inscriptions={inscriptions}
                    onChangeSelectedId={setSelectedId}
                    onReset={reset}
                />

                {/* Dialog confirmation suppression */}
                <ModalConfirmationSuppression
                    title="Supprimer cette année academique ?"
                    content="Cette action est irréversible. La suppression de
                                cette inscription peut entraîner une perte de
                                données liées (paiements, historique, etc)."
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    handleDelete={handleDelete}
                />

            </div>
        </AppLayout>
    );
}
