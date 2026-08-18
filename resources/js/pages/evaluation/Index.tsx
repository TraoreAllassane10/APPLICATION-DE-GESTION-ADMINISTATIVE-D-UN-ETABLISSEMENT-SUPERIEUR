import EvaluationFiltresSection from '@/features/evaluations/components/evaluation-filtres-section';
import EvaluationTableSection from '@/features/evaluations/components/evaluation-table-section';
import { HeaderSection } from '@/features/evaluations/components/header-section';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

function Index() {
    return (
        <AppLayout>
            <Head title="Evaluations" />

            <div className="space-y-6 p-6">
                {/* Header  */}
                <HeaderSection />

                {/* Filtres */}
                <EvaluationFiltresSection />

                {/* Table */}
                <EvaluationTableSection/>
            </div>
        </AppLayout>
    );
}

export default Index;
