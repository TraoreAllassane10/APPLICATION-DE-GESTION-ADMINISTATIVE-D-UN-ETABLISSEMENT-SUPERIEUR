import EvaluationForm from '@/features/evaluations/components/forms/add/evaluation-form';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Evaluations', href: '/evaluations' },
    { title: "Création d'évaluation", href: '/evaluations/create' },
];

export default function Create() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Création d'une evaluation" />

            <div className="space-y-6 p-6">
                {/* Header */}
                <div>
                    <div className="flex items-center gap-3">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Nouvelle évaluation
                            </h1>

                            <p className="text-sm text-muted-foreground">
                                Créez une évaluation et définissez ses
                                paramètres.
                            </p>
                        </div>
                    </div>
                </div>

                <EvaluationForm />
            </div>
        </AppLayout>
    );
}
