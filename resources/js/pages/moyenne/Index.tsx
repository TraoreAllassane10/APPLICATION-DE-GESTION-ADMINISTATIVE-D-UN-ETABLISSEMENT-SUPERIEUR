import { Enseignement } from '@/features/enseignement/types/enseignement.types';
import MoyenneFilterSection from '@/features/moyenne/components/MoyenneFilterSection';
import MoyenneHeaderSection from '@/features/moyenne/components/MoyenneHeaderSection';
import MoyenneTableauSection from '@/features/moyenne/components/MoyenneTableauSection';
import useMoyenne from '@/features/moyenne/hooks/useMoyenne';
import { Moyenne } from '@/features/moyenne/types/moyennes.types';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, DataNiveau, Periode } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { BookOpen, Loader } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Notes & Moyennes', href: '/moyennes' },
];

interface MoyenneProps {
    niveaux: DataNiveau[];
    periodes: Periode[];
    [key: string]: unknown;
}

export default function Index() {
    const { niveaux, periodes } = usePage<MoyenneProps>().props;

    const [selectedEnseignementId, setSelectedEnseignementId] =
        useState<string>('');
    const [selectedClasseId, setSelectedClasseId] = useState<string>('');
    const [selectedPeriodeId, setSelectedPeriodeId] = useState<string>('');
    const [enseignements, setEnseignements] = useState<Enseignement[]>([]);
    const [moyennes, setMoyennes] = useState<Moyenne[] | []>([]);

    const { getMoyennes, loading } = useMoyenne();

    // Recupere l'enseignement de la classe selectionnée
    useEffect(() => {
        setSelectedEnseignementId('');
        setEnseignements([]);

        const enseignementClasseSelectionnee = niveaux.find(
            (n) => n.id === Number(selectedClasseId),
        )?.enseignements;

        if (enseignementClasseSelectionnee) {
            setEnseignements(enseignementClasseSelectionnee as any);
        }
    }, [selectedClasseId]);

    // Recuperation de la moyenne des etudiants de la classe selectionné
    useEffect(() => {
        if (selectedClasseId && selectedEnseignementId && selectedPeriodeId) {
            async function loadMoyennes() {
                const result = await getMoyennes(
                    Number(selectedClasseId),
                    Number(selectedEnseignementId),
                    Number(selectedPeriodeId),
                );

                setMoyennes(result);
            }

            loadMoyennes();
        }
    }, [selectedClasseId, selectedEnseignementId, selectedPeriodeId]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notes & Moyennes" />

            <div className="space-y-6 p-6">
                {/* En-tête */}
                <MoyenneHeaderSection />

                {/* Sélecteurs */}
                <MoyenneFilterSection
                    enseignements={enseignements}
                    niveaux={niveaux}
                    periodes={periodes}
                    selectedClasseId={selectedClasseId}
                    onSelectedClasseId={setSelectedClasseId}
                    selectedEnseignementId={selectedEnseignementId}
                    onSelectedEnseignementId={setSelectedEnseignementId}
                    selectedPeriodeId={selectedPeriodeId}
                    onSelectedPeriodeId={setSelectedPeriodeId}
                />

                {loading ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center text-muted-foreground">
                        <Loader className="h-10 w-10 animate-spin" />
                    </div>
                ) : moyennes?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center text-muted-foreground">
                        <BookOpen className="mb-3 h-12 w-12 opacity-20" />
                        <p className="text-sm font-medium">
                            Sélectionnez un enseignement, une classe et une
                            période
                        </p>
                        <p className="mt-1 text-xs">
                            Les notes et moyennes s'afficheront ici.
                        </p>
                    </div>
                ) : (
                    <MoyenneTableauSection moyennes={moyennes} />
                )}
            </div>
        </AppLayout>
    );
}
