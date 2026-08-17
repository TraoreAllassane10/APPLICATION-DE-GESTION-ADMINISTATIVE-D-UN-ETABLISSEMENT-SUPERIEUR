import ModalConfirmationSuppression from '@/components/modals/ModalConfirmationSuppression';
import { Button } from '@/components/ui/button';
import TableProfesseur from '@/features/professeur/components/TableProfesseur';

import useProfesseur from '@/features/professeur/hooks/useProfesseur';
import { Professeur } from '@/features/professeur/types/professeur.types';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { PlusCircle, Sheet } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Professeurs', href: '/professeur' },
];

interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: { active: boolean; label: string; page: number; url: string }[];
}

export interface ProfesseurProps {
    professeurs: {
        data: Professeur[];
        meta: Meta;
    };
    [key: string]: unknown;
}

const Index = () => {
    const { professeurs } = usePage<ProfesseurProps>().props;
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const { deleteProfesseur } = useProfesseur();

    const handleDelete = async () => {
        if (selectedId) {
            await deleteProfesseur(selectedId);
            setSelectedId(null);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-5 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Gestion des enseignants
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            {professeurs.data.length} professeur
                            {professeurs.data.length !== 1 ? 's' : ''}{' '}
                            enregistré
                            {professeurs.data.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    <div className="flex place-items-center gap-2">
                        <a href={`professeur/export`}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-1.5"
                            >
                                <Sheet className="h-3.5 w-3.5" /> Exporter vers
                                Excel
                            </Button>
                        </a>

                        <Link href="professeur/create">
                            <Button className="gap-2 transition duration-300 hover:bg-red-700">
                                <PlusCircle className="h-4 w-4" />
                                Ajouter un enseignant
                            </Button>
                        </Link>
                    </div>
                </div>

                <TableProfesseur
                    professeurs={professeurs}
                    setSelectedId={setSelectedId}
                />
            </div>

            {/* Dialog confirmation suppression */}
            <ModalConfirmationSuppression
                title="Supprimer ce professeur ?"
                content=" Cette action est irréversible. Les données liées à
                            ce professeur (séances, cours, etc.) pourraient
                            également être affectées."
                selectedId={selectedId}
                handleDelete={handleDelete}
                setSelectedId={setSelectedId}
            />
        </AppLayout>
    );
};

export default Index;
