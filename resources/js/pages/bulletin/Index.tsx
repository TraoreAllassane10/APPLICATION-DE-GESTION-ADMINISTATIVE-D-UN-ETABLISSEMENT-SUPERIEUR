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
import { BookOpen, Loader2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Tableau de bord', href: '/dashboard' },
    { title: 'Bulletins', href: '/bulletins' },
];

interface BulletinPageProps {
    niveaux: DataNiveau[];
    periodes: Periode[];
    [key: string]: unknown;
}

export default function Index() {
    const { niveaux, periodes } = usePage<BulletinPageProps>().props;

    const [selectedPeriode, setSelectedPeriode] = useState<string>('');
    const [selectedClasse, setSelectedClasse] = useState<string>('');

    const [selectedBulletin, setSelectedBulletin] = useState<Bulletin | null>(
        null,
    );
    const [appreciationEditable, setAppreciationEditable] =
        useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [downloadingZip, setDownloadingZip] = useState(false);

    const { getBulletins, bulletins, stats, loading } = useBulletin();

    const handleRecalculer = async () => {
        if (selectedClasse && selectedPeriode) {
            await getBulletins(Number(selectedClasse), Number(selectedPeriode));
        }
    };

    const handleOpenDetail = (bulletin: Bulletin) => {
        setSelectedBulletin(bulletin);
        // setAppreciationEditable(bulletin.appreciationGenerale ?? '');
        setIsModalOpen(true);
    };

    const handleTelechargerPDF = (bulletin: Bulletin, e: React.MouseEvent) => {
        e.stopPropagation();
        window.open(
            `/bulletins/${bulletin.id}/telecharger-bulletin-pdf`,
            '_blank',
        );
    };

    const handleDownloadZip = () => {
        if (!selectedClasse || !selectedPeriode) {
            toast.error(
                "Veuillez d'abord selectionner une classe et une periode academique",
            );

            return ;
        }

        setDownloadingZip(true);

        const downloadUrl = `/classes/${selectedClasse}/periodes/${selectedPeriode}/download-zip`;

        window.location.href = downloadUrl;

        // Réinitialiser l'état du bouton après un délai estimé
        setTimeout(() => {
            setDownloadingZip(false);
        }, 5000);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des Bulletins" />

            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                {/* En-tête */}
                <HeaderSection downloadingZip={downloadingZip} onDownloadZip={handleDownloadZip} />

                {/* Section Filtres */}
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

                {/* Section Statistiques */}
                {stats && (
                    <StatistiqueSection
                        total_etudiant={stats.total_etudiants}
                        total_admis={stats.total_admis}
                        total_ajourne={stats.total_ajourne}
                        moyenne_classe={stats.moyenne_classe}
                    />
                )}

                {/* Affichage Table / Empty State / Loader */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-24 text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="mt-3 text-sm font-medium text-muted-foreground">
                            Calcul des moyennes et génération des bulletins...
                        </p>
                    </div>
                ) : !bulletins || bulletins.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card/30 py-20 text-center">
                        <div className="mb-3 rounded-full bg-muted p-3">
                            <BookOpen className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground">
                            Aucun bulletin affiché
                        </h3>
                        <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                            Veuillez sélectionner une classe et une période
                            ci-dessus pour afficher et gérer les résultats des
                            étudiants.
                        </p>
                    </div>
                ) : (
                    <TableBulletin
                        bulletins={bulletins}
                        onTelechargerTous={handleDownloadZip}
                        onOpenDetail={handleOpenDetail}
                        onTelechargerPDF={handleTelechargerPDF}
                    />
                )}
            </div>

            {/* Modal de détail */}
            <ModalDetailBulletin
                isModalOpen={isModalOpen}
                onOpenChange={setIsModalOpen}
                bulletin={selectedBulletin}
                detailActif={selectedBulletin?.id ?? null}
                onImprimerPDF={() => alert('Impression...')}
                onEnregistrer={() => setIsModalOpen(false)}
                appreciationEditable={appreciationEditable}
                onAppreciationEditable={setAppreciationEditable}
            />
        </AppLayout>
    );
}
