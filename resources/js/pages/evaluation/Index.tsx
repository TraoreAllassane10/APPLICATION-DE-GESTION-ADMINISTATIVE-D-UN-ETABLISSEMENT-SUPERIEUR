import EvaluationFiltresSection from '@/features/evaluations/components/evaluation-filtres-section';
import EvaluationTableSection from '@/features/evaluations/components/evaluation-table-section';
import { HeaderSection } from '@/features/evaluations/components/header-section';
import { Evaluation } from '@/features/evaluations/types/evaluation.types';
import AppLayout from '@/layouts/app-layout';
import { Meta } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export interface EvaluationData {
    data: Evaluation[];
    meta: Meta;
}

interface EvaluationProps {
    evaluations: EvaluationData;
    filters: {
        search: string;
        statut: string;
        genre: string;
    };
    [key: string]: unknown;
}


function Index() {
    const {evaluations} = usePage<EvaluationProps>().props;

    return (
        <AppLayout>
            <Head title="Evaluations" />

            <div className="space-y-6 p-6">
                {/* Header  */}
                <HeaderSection />

                {/* Filtres */}
                <EvaluationFiltresSection />

                {/* Table */}
                <EvaluationTableSection evaluations={evaluations}/>
            </div>
        </AppLayout>
    );
}

export default Index;
