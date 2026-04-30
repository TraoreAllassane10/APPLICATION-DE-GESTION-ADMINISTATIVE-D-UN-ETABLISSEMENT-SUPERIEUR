import { PersonnelForm } from '@/components/Entreprise/Personnel/PersonnelForm';
import usePersonnel from '@/hooks/Entreprise/usePersonnel';
import AppLayout from '@/layouts/app-layout';
import { Personnel, PersonnelFormData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const Edit = () => {
    const { personnel } = usePage<{ personnel: Personnel }>().props;

    const { updatePersonnel } = usePersonnel();

    const handleSubmit = (data: PersonnelFormData) => {
        updatePersonnel(data.id, data);
    };

    return (
        <AppLayout>
            <Head title={`Modifier — ${personnel.nom} ${personnel.prenom}`} />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href={`/personnels/${personnel.id}/show`}
                        className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" /> Retour au profil
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Modifier — {personnel.nom}{' '}
                        {personnel.prenom}
                    </h1>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                        Mettez à jour les informations de l'employé.
                    </p>
                </div>

                <PersonnelForm
                    initialData={personnel}
                    isEdit
                    onSubmit={handleSubmit}
                    onCancel={() => router.visit(`/personnels/${personnel.id}/show`)}
                    isLoading
                />
            </div>
        </AppLayout>
    );
};

export default Edit;
