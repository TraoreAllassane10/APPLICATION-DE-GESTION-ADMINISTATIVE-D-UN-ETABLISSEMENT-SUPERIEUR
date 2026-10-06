import ModalConfirmationSuppression from '@/components/modals/ModalConfirmationSuppression';
import { Button } from '@/components/ui/button';
import { Cours } from '@/features/cours/types/cours.types';
import FiltreEnseignement from '@/features/enseignement/components/filtre-enseignement';
import ModalEnseignement from '@/features/enseignement/components/modal-enseignement';
import TableEnseignement from '@/features/enseignement/components/table-enseignement';
import useEnseignement from '@/features/enseignement/hooks/useEnseignement';
import { EnseignementData } from '@/features/enseignement/types/enseignement.types';
import { Professeur } from '@/features/professeur/types/professeur.types';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, DataNiveau } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Tableau de bord', href: '/dashboard' },
    { title: 'Enseignements', href: '/enseignements' },
];

interface Filters {
    professeur: string;
    cours: string;
    niveau: string;
}

interface EnseignementPageProps {
    professeurs: Professeur[];
    cours: Cours[];
    niveaux: DataNiveau[];
    enseignements: EnseignementData;
    filters: Filters;
    [key: string]: unknown;
}

const EnseignementPage = () => {
    const { professeurs, cours, niveaux, enseignements, filters } =
        usePage<EnseignementPageProps>().props;

    const [filtreProfesseur, setFiltreProfesseur] = useState('');
    const [filtreCours, setFiltreCours] = useState('');
    const [filtreNiveau, setFiltreNiveau] = useState('');

    const [open, setOpen] = useState(false);
    const [gererEnseignementId, setGererEnseignementId] = useState<number | null>(null);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const hasFilters = filtreProfesseur || filtreCours || filtreNiveau;

    const { filtrageEnseignement, deleteEnseignement } = useEnseignement();

    const handleDelete = async () => {
        if (selectedId) {
            await deleteEnseignement(selectedId);
            setSelectedId(null);
            router.reload();
        }
    };

    const handleSearch = () => {
        filtrageEnseignement(filtreProfesseur, filtreCours, filtreNiveau);
    };

    const reset = () => {
        setFiltreProfesseur('');
        setFiltreCours('');
        setFiltreNiveau('');

        router.get('/enseignements');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Enseignements" />

            <div className="space-y-6 p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Gestion des enseignements
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            Visualiser et gerer tous les enseignements .
                        </p>
                    </div>

                    <Button
                        onClick={() => {
                            setGererEnseignementId(null);
                            setOpen(true);
                        }}
                        className="gap-2 transition duration-300 hover:bg-red-700"
                    >
                        <PlusCircle className="h-4 w-4" />
                        Assigner une classe à un enseignant
                    </Button>
                </div>

                {/* Modal */}
                <ModalEnseignement
                    open={open}
                    onClose={() => {
                        setOpen(false);
                        setGererEnseignementId(null);
                    }}
                    enseignements={enseignements.data}
                    niveaux={niveaux}
                    enseignementId={gererEnseignementId}
                />

                {/* Filtres */}
                <FiltreEnseignement
                    professeurs={professeurs}
                    cours={cours}
                    niveaux={niveaux}
                    filtreProfesseur={filtreProfesseur}
                    onChangeProfesseur={setFiltreProfesseur}
                    filtreCours={filtreCours}
                    onChangeFiltreCours={setFiltreCours}
                    filtreNiveau={filtreNiveau}
                    onChangeFiltreNiveau={setFiltreNiveau}
                    hasFilters={hasFilters}
                    reset={reset}
                    onSearch={handleSearch}
                    totalEnseignement={enseignements.data.length}
                />

                {/* Liste des enseignements */}
                <TableEnseignement
                    enseignements={enseignements}
                    hasFilters={hasFilters}
                    onReset={reset}
                    onOpenModal={() => setOpen(true)}
                    onGererEnseignement={setGererEnseignementId}
                    onDelete={setSelectedId}
                />

                <ModalConfirmationSuppression
                    title="Supprimer un enseignement ?"
                    content=" Cette action est irréversible. Les données liées à
                        cet enseignements (evaluations, notes, assiduités.) pourraient
                        également être affectées."
                    selectedId={selectedId}
                    handleDelete={handleDelete}
                    setSelectedId={setSelectedId}
                />
            </div>
        </AppLayout>
    );
};

export default EnseignementPage;
