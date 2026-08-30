import FilterSection from '@/features/bulletin/components/FilterSection';
import HeaderSection from '@/features/bulletin/components/HeaderSection';
import ModalDetailBulletin from '@/features/bulletin/components/modals/ModalDetailBulletin';
import StatistiqueSection from '@/features/bulletin/components/StatistiqueSection';
import TableBulletin from '@/features/bulletin/components/TableBulletin';
import useBulletin from '@/features/bulletin/hooks/useBulletin';
import { Bulletin } from '@/features/bulletin/types/bulletin.types';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, DataNiveau, Periode } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { BookOpen, Loader } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Bulletins', href: '/bulletins' },
];

interface BulletinPageProps {
    niveaux: DataNiveau[];
    periodes: Periode[];
    [key: string]: unknown;
}

const Index = () => {
    const { niveaux, periodes } = usePage<BulletinPageProps>().props;

    const [selectedPeriode, setSelectedPeriode] = useState<string>('');
    const [selectedClasse, setSelectedClasse] = useState<string>('');

    // Modal détail
    const [selectedBulletin, setSelectedBulletin] = useState<Bulletin | null>(
        null,
    );
    const [appreciationEditable, setAppreciationEditable] =
        useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { getBulletins, bulletins, stats, loading } = useBulletin();

    console.log(bulletins);
    

    const handleRecalculer = async () => {
        await getBulletins(Number(selectedClasse), Number(selectedPeriode));
    };

    const handleOpenDetail = (bulletin: Bulletin) => {
        setSelectedBulletin(bulletin);

        // setAppreciationEditable(detail?.appreciationGenerale ?? '');
        setIsModalOpen(true);
    };

    const handleTelechargerPDF = (bulletin: Bulletin, e: React.MouseEvent) => {
        e.stopPropagation();
        alert(`Téléchargement du PDF de ${bulletin.prenom} ${bulletin.nom}`);
    };

    const handleTelechargerTous = () => {
        alert('Téléchargement de tous les bulletins en ZIP/PDF...');
    };

    const handleEnregistrer = () => {
        alert(`Appréciation enregistrée : "${appreciationEditable}"`);
        setIsModalOpen(false);
    };

    const handleImprimerPDF = () => {
        if (selectedBulletin) {
            alert(
                `Impression PDF du bulletin de ${selectedBulletin.prenom} ${selectedBulletin.nom}`,
            );
        }
    };

    const detailActif = selectedBulletin ? selectedBulletin.id : null;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des Bulletins" />

            <div className="space-y-6 p-6">
                <HeaderSection />

                <FilterSection
                    niveaux={niveaux}
                    periodes={periodes}
                    selectedPeriode={selectedPeriode}
                    onSelectedPeriode={setSelectedPeriode}
                    selectedClasse={selectedClasse}
                    onSelectedClasse={setSelectedClasse}
                    onRecalculer={handleRecalculer}
                    isRecalculating={loading}
                />

                {stats && (
                    <StatistiqueSection
                        total_etudiant={stats.total_etudiants}
                        total_admis={stats.total_admis}
                        total_ajourne={stats.total_ajourne}
                        moyenne_classe={stats.moyenne_classe}
                    />
                )}

                {loading ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center text-muted-foreground">
                        <Loader className="h-10 w-10 animate-spin" />
                    </div>
                ) : bulletins?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center text-muted-foreground">
                        <BookOpen className="mb-3 h-12 w-12 opacity-20" />
                        <p className="text-sm font-medium">
                            Sélectionnez une classe et une période
                        </p>
                        <p className="mt-1 text-xs">
                            Les etudiants et leur moyenne générale s'afficheront
                            ici.
                        </p>
                    </div>
                ) : (
                    <TableBulletin
                        bulletins={bulletins}
                        onTelechargerTous={handleTelechargerTous}
                        onOpenDetail={handleOpenDetail}
                        onTelechargerPDF={handleTelechargerPDF}
                    />
                )}
            </div>

            {/* ── Modal Détail Bulletin ── */}
            <ModalDetailBulletin
                isModalOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                bulletin={selectedBulletin}
                detailActif={detailActif}
                onImprimerPDF={handleImprimerPDF}
                onEnregistrer={handleEnregistrer}
                appreciationEditable={appreciationEditable}
                onAppreciationEditable={setAppreciationEditable}
            />
        </AppLayout>
    );
};

export default Index;
