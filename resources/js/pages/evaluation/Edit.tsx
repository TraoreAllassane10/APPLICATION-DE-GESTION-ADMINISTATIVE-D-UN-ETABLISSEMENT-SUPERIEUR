import EvaluationEditForm from '@/features/evaluations/components/forms/edit/evaluation-edit-form';
import { Evaluation } from '@/features/evaluations/types/evaluation.types';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Evaluations', href: '/evaluations' },
    { title: "Modification d'évaluation", href: '/evaluations/edit' },
];

interface EditEvaluationProps {
    evaluation: Evaluation;
    type_evaluations: string[];
    [key: string]: unknown;
}

function Edit() {
    const { evaluation, type_evaluations } =
        usePage<EditEvaluationProps>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Modification d'une evaluation" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div>
                    <div className="flex items-center gap-3">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Modification d'une évaluation
                            </h1>

                            <p className="text-sm text-muted-foreground">
                                Modifier une évaluation et définissez ses
                                paramètres.
                            </p>
                        </div>
                    </div>
                </div>

                <EvaluationEditForm
                    evaluation={evaluation}
                    type_evaluations={type_evaluations}
                />
            </div>
        </AppLayout>
    );
}

export default Edit;
