import { Enseignement } from '@/features/enseignement/types/enseignement.types';
import EvaluationFiltresSection from '@/features/evaluations/components/evaluation-filtres-section';
import EvaluationTableSection from '@/features/evaluations/components/evaluation-table-section';
import { HeaderSection } from '@/features/evaluations/components/header-section';
import { Evaluation } from '@/features/evaluations/types/evaluation.types';
import AppLayout from '@/layouts/app-layout';
import { Meta, Periode } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export interface EvaluationData {
    data: Evaluation[];
    meta: Meta;
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

function Index() {
    const { evaluations, enseignements, periodes } =
        usePage<EvaluationProps>().props;

    return (
        <AppLayout>
            <Head title="Evaluations" />

            <div className="space-y-6 p-6">
                {/* Header  */}
                <HeaderSection />

                {/* Filtres */}
                <EvaluationFiltresSection
                    enseignements={enseignements}
                    periodes={periodes}
                />

                {/* Table */}
                <EvaluationTableSection evaluations={evaluations} />
            </div>
        </AppLayout>
    );
}

export default Index;
