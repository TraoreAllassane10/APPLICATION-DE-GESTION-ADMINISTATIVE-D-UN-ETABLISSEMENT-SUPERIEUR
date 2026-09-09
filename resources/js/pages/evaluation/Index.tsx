import { Enseignement } from '@/features/enseignement/types/enseignement.types';
import EvaluationFiltresSection from '@/features/evaluations/components/evaluation-filtres-section';
import EvaluationTableSection from '@/features/evaluations/components/evaluation-table-section';
import HeaderSection from '@/features/evaluations/components/header-section';
import { Evaluation } from '@/features/evaluations/types/evaluation.types';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Meta, Periode } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Tableau de bord', href: '/dashboard' },
    { title: 'Évaluations', href: '/evaluations' },
];

export interface EvaluationData {
    data: Evaluation[];
    meta: Meta;
    links?: Array<{ url: string | null; label: string; active: boolean }>;
}

interface EvaluationProps {
    evaluations: EvaluationData;
    enseignements: Enseignement[];
    periodes: Periode[];
    filters: {
        search: string;
        statut: string;
        genre: string;
    };
    [key: string]: unknown;
}

export default function Index() {
    const { evaluations, enseignements, periodes } =
        usePage<EvaluationProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des évaluations" />

            <div className="space-y-6 p-6">
                {/* En-tête */}
                <HeaderSection />

                {/* Filtres */}
                <EvaluationFiltresSection
                    enseignements={enseignements}
                    periodes={periodes}
                />

                {/* Liste des évaluations & Pagination */}
                <EvaluationTableSection evaluations={evaluations} />
            </div>
        </AppLayout>
    );
}