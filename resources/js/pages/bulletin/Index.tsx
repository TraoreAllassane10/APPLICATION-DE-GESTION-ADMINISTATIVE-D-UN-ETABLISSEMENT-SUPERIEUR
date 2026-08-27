import FilterSection from '@/features/bulletin/components/FilterSection';
import HeaderSection from '@/features/bulletin/components/HeaderSection';
import ModalDetailBulletin from '@/features/bulletin/components/modals/ModalDetailBulletin';
import StatistiqueSection from '@/features/bulletin/components/StatistiqueSection';
import TableBulletin from '@/features/bulletin/components/TableBulletin';
import { Bulletin } from '@/features/bulletin/types/bulletin.types';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useState } from 'react';



// ─── Breadcrumbs ──────────────────────────────────────────────────────────────
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Bulletins', href: '/bulletins' },
];

interface BulletinPageProps {
    bulletins: Bulletin[];
    [key: string] : unknown;
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const Index = () => {
    const {bulletins} = usePage<BulletinPageProps>().props;

    const [selectedPeriode, setSelectedPeriode] = useState<string>('1');
    const [selectedClasse, setSelectedClasse] = useState<string>('1');
    const [isRecalculating, setIsRecalculating] = useState(false);

    // Modal détail
    const [selectedBulletin, setSelectedBulletin] =
        useState<Bulletin | null>(null);
    const [appreciationEditable, setAppreciationEditable] =
        useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // const admis = bulletins.filter((b) => b.moyenneGenerale >= 10).length;
    // const ajourne = bulletins.filter((b) => b.moyenneGenerale < 10).length;
    // const moyenneClasse =
    //     bulletins.reduce((acc, b) => acc + b.moyenneGenerale, 0) /
    //     bulletins.length;

    const handleRecalculer = () => {
        setIsRecalculating(true);
        setTimeout(() => setIsRecalculating(false), 1500);
    };

    const handleOpenDetail = (bulletin: Bulletin) => {
        setSelectedBulletin(bulletin);
        
        // setAppreciationEditable(detail?.appreciationGenerale ?? '');
        setIsModalOpen(true);
    };

    const handleTelechargerPDF = (
        bulletin: Bulletin,
        e: React.MouseEvent,
    ) => {
        e.stopPropagation();
        alert(`Téléchargement du PDF de ${bulletin.inscription.etudiant.prenom} ${bulletin.inscription.etudiant.nom}`);
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
                `Impression PDF du bulletin de ${selectedBulletin.inscription.etudiant.prenom} ${selectedBulletin.inscription.etudiant.nom}`,
            );
        }
    };

    const detailActif = selectedBulletin ? selectedBulletin.id : null

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des Bulletins" />

            <div className="space-y-6 p-6">
                <HeaderSection />

                <FilterSection
                    selectedPeriode={selectedPeriode}
                    onSelectedPeriode={setSelectedPeriode}
                    selectedClasse={selectedClasse}
                    onSelectedClasse={setSelectedClasse}
                    onRecalculer={handleRecalculer}
                    isRecalculating={isRecalculating}
                />

                <StatistiqueSection />

                <TableBulletin
                    bulletins={bulletins}
                    onTelechargerTous={handleTelechargerTous}
                    onOpenDetail={handleOpenDetail}
                    onTelechargerPDF={handleTelechargerPDF}
                />
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
