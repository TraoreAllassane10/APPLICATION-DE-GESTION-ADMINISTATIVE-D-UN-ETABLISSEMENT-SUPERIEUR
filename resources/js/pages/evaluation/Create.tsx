import { Enseignement } from '@/features/enseignement/types/enseignement.types';
import EvaluationForm from '@/features/evaluations/components/forms/add/evaluation-form';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Periode } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Evaluations', href: '/evaluations' },
    { title: "Création d'évaluation", href: '/evaluations/create' },
];

interface CreateEvaluationProps {
    enseignements: Enseignement[];
    periodes: Periode[];
    type_evaluations: string[];
    [key: string]: unknown;
}

export default function Create() {
    const { enseignements, periodes, type_evaluations } = usePage<CreateEvaluationProps>().props;

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

                <EvaluationForm
                    enseignements={enseignements}
                    periodes={periodes}
                    type_evaluations={type_evaluations}
                />
            </div>
        </AppLayout>
    );
}
