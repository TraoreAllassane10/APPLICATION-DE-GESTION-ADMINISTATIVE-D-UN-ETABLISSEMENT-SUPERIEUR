import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

import { EtudiantForm } from '@/components/etudiant/EtudiantForm';
import useEtudiant from '@/hooks/useEtudiant';
import { Etudiant, EtudiantFormData } from '@/types';

export default function Edit() {
    const { etudiant } = usePage<{ etudiant: Etudiant }>().props;
   
    const { updateEtudiant } = useEtudiant();

    // On exclut created_at / updated_at pour correspondre à EtudiantFormData
    const { created_at, updated_at, ...initialData } = etudiant;

    const handleSubmit = (data: EtudiantFormData) => {
        updateEtudiant(data.ip, data);
    };

    return (
        <AppLayout>
            <Head title={`Modifier — ${etudiant.nom} ${etudiant.prenom}`} />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href={`/etudiants/${etudiant.ip}/show`}
                        className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" /> Retour au profil
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Modifier — {etudiant.civilite} {etudiant.nom}{' '}
                        {etudiant.prenom}
                    </h1>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                        Mettez à jour les informations de l'étudiant.
                    </p>
                </div>

                <EtudiantForm
                    initialData={initialData}
                    isEdit
                    onSubmit={handleSubmit}
                    onCancel={() => router.visit(`/etudiants/${etudiant.ip}/show`)}
                    isLoading
                />
            </div>
        </AppLayout>
    );
}
