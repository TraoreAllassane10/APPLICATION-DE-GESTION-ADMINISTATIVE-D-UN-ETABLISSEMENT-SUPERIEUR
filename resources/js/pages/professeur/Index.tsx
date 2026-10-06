import ModalConfirmationSuppression from '@/components/modals/ModalConfirmationSuppression';
import { Button } from '@/components/ui/button';
import FiltreProfesseur from '@/features/professeur/components/Filtre-professeur';
import TableProfesseur from '@/features/professeur/components/TableProfesseur';

import useProfesseur from '@/features/professeur/hooks/useProfesseur';
import { Professeur } from '@/features/professeur/types/professeur.types';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
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
    filtre: string;
    [key: string]: unknown;
}

const Index = () => {
    const { professeurs, filtre } = usePage<ProfesseurProps>().props;
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [search, setSearch] = useState<string>(filtre ?? "");

    const { deleteProfesseur, searchProfesseur } = useProfesseur();

    const handleSearch = () => {
        searchProfesseur(search);
    };

    const handleDelete = async () => {
        if (selectedId) {
            await deleteProfesseur(selectedId);
            setSelectedId(null);
        }
    };

    const handleReset = () => {
        router.get('/professeur')
    }

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
                            Visualiser et Gerer tous les enseignants
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

                {/* Recherche d'enseignant */}
                <FiltreProfesseur
                    search={search}
                    onChangeSearch={setSearch}
                    onSearch={handleSearch}
                    hasFilters={search}
                    totalProfesseur={professeurs.data.length}
                    onReset={handleReset}
                />

                {/* Table d'afichages des enseignants */}
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
