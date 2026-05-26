import { EtudiantForm } from '@/components/etudiant/EtudiantForm';
import useEtudiant from '@/hooks/useEtudiant';
import AppLayout from '@/layouts/app-layout';
import { EtudiantFormData } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function Create() {
    const { createEtudiant } = useEtudiant();

    // Creation d'un etudiant
    const handleSubmit = (data: EtudiantFormData) => {
        createEtudiant(data);
    };

    return (
        <AppLayout>
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
