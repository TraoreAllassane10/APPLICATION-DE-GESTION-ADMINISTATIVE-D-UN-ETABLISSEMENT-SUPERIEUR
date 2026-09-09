import { EtudiantForm } from '@/features/etudiant/components/EtudiantForm';
import useEtudiant from '@/features/etudiant/hooks/useEtudiant';
import { EtudiantFormData } from '@/features/etudiant/types/etudiant.types';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Tableau de bord', href: '/dashboard' },
    { title: 'Etudiants', href: '/etudiants' },
    { title: 'Création d\'un etudiant', href: '#' },
];

export default function Create() {
    const { createEtudiant, isLoading } = useEtudiant();

    // Creation d'un etudiant
    const handleSubmit = async (data: EtudiantFormData) => {
        await createEtudiant(data);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nouvel étudiant" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/etudiants"
                        className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" /> Retour aux
                        étudiants
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Nouvel étudiant
                    </h1>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                        Remplissez les informations pour enregistrer un nouvel
                        étudiant.
                    </p>
                </div>

                <EtudiantForm
                    onSubmit={handleSubmit}
                    onCancel={() => router.visit('/etudiants')}
                    isLoading
                />
            </div>
        </AppLayout>
    );
}
