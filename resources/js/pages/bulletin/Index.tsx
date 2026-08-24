import FilterSection from '@/features/bulletin/components/FilterSection';
import HeaderSection from '@/features/bulletin/components/HeaderSection';
import ModalDetailBulletin from '@/features/bulletin/components/modals/ModalDetailBulletin';
import StatistiqueSection from '@/features/bulletin/components/StatistiqueSection';
import TableBulletin from '@/features/bulletin/components/TableBulletin';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
type Mention = 'Très Bien' | 'Bien' | 'Assez Bien' | 'Passable' | 'Ajourné';

interface LigneMatiere {
    matiere: string;
    coefficient: number;
    moyenne: number;
    totalPoints: number;
    appreciation: string;
}

interface DetailBulletin {
    etudiantId: number;
    totalEtudiants: number;
    appreciationGenerale: string;
    matieres: LigneMatiere[];
}

interface BulletinEtudiant {
    id: number;
    rang: number;
    matricule: string;
    nom: string;
    prenom: string;
    moyenneGenerale: number;
    mention: Mention;
}

const BULLETINS_MOCK: BulletinEtudiant[] = [
    {
        id: 1,
        rang: 1,
        matricule: 'MAT-001',
        nom: 'KOUASSI',
        prenom: 'Jean',
        moyenneGenerale: 16.2,
        mention: 'Très Bien',
    },
    {
        id: 2,
        rang: 2,
        matricule: 'MAT-008',
        nom: 'KONAN',
        prenom: 'Marie',
        moyenneGenerale: 14.85,
        mention: 'Bien',
    },
    {
        id: 3,
        rang: 3,
        matricule: 'MAT-015',
        nom: 'DIALLO',
        prenom: 'Ibrahim',
        moyenneGenerale: 13.5,
        mention: 'Assez Bien',
    },
    {
        id: 4,
        rang: 4,
        matricule: 'MAT-022',
        nom: 'TRAORÉ',
        prenom: 'Aïcha',
        moyenneGenerale: 12.1,
        mention: 'Passable',
    },
    {
        id: 5,
        rang: 5,
        matricule: 'MAT-031',
        nom: 'YAO',
        prenom: 'Koffi',
        moyenneGenerale: 11.75,
        mention: 'Passable',
    },
    {
        id: 6,
        rang: 6,
        matricule: 'MAT-044',
        nom: 'BAMBA',
        prenom: 'Fatou',
        moyenneGenerale: 10.2,
        mention: 'Passable',
    },
    {
        id: 7,
        rang: 7,
        matricule: 'MAT-053',
        nom: 'COULIBALY',
        prenom: 'Moussa',
        moyenneGenerale: 9.4,
        mention: 'Ajourné',
    },
    {
        id: 8,
        rang: 8,
        matricule: 'MAT-061',
        nom: 'SANOGO',
        prenom: 'Awa',
        moyenneGenerale: 7.8,
        mention: 'Ajourné',
    },
];

// Détails par étudiant (matieres + appréciation)
const DETAILS_MOCK: Record<number, DetailBulletin> = {
    1: {
        etudiantId: 1,
        totalEtudiants: 35,
        appreciationGenerale:
            'Félicitations du conseil de classe. Poursuivez ainsi.',
        matieres: [
            {
                matiere: 'Comptabilité Générale',
                coefficient: 3.0,
                moyenne: 14.5,
                totalPoints: 43.5,
                appreciation: 'Bon travail',
            },
            {
                matiere: 'Mathématiques Financières',
                coefficient: 2.0,
                moyenne: 18.0,
                totalPoints: 36.0,
                appreciation: 'Excellent',
            },
            {
                matiere: 'Anglais des Affaires',
                coefficient: 1.0,
                moyenne: 16.0,
                totalPoints: 16.0,
                appreciation: 'Très bien',
            },
            {
                matiere: 'Droit Commercial',
                coefficient: 2.0,
                moyenne: 15.5,
                totalPoints: 31.0,
                appreciation: 'Bonne maîtrise',
            },
        ],
    },
    2: {
        etudiantId: 2,
        totalEtudiants: 35,
        appreciationGenerale: 'Bon niveau général. Continuez vos efforts.',
        matieres: [
            {
                matiere: 'Comptabilité Générale',
                coefficient: 3.0,
                moyenne: 13.0,
                totalPoints: 39.0,
                appreciation: 'Satisfaisant',
            },
            {
                matiere: 'Mathématiques Financières',
                coefficient: 2.0,
                moyenne: 16.5,
                totalPoints: 33.0,
                appreciation: 'Très bien',
            },
            {
                matiere: 'Anglais des Affaires',
                coefficient: 1.0,
                moyenne: 14.0,
                totalPoints: 14.0,
                appreciation: 'Bien',
            },
            {
                matiere: 'Droit Commercial',
                coefficient: 2.0,
                moyenne: 15.0,
                totalPoints: 30.0,
                appreciation: 'Bon travail',
            },
        ],
    },
    3: {
        etudiantId: 3,
        totalEtudiants: 35,
        appreciationGenerale:
            'Résultats satisfaisants. Des efforts supplémentaires sont attendus.',
        matieres: [
            {
                matiere: 'Comptabilité Générale',
                coefficient: 3.0,
                moyenne: 12.0,
                totalPoints: 36.0,
                appreciation: 'Passable',
            },
            {
                matiere: 'Mathématiques Financières',
                coefficient: 2.0,
                moyenne: 15.0,
                totalPoints: 30.0,
                appreciation: 'Bien',
            },
            {
                matiere: 'Anglais des Affaires',
                coefficient: 1.0,
                moyenne: 13.5,
                totalPoints: 13.5,
                appreciation: 'Assez bien',
            },
            {
                matiere: 'Droit Commercial',
                coefficient: 2.0,
                moyenne: 14.0,
                totalPoints: 28.0,
                appreciation: 'Satisfaisant',
            },
        ],
    },
    4: {
        etudiantId: 4,
        totalEtudiants: 35,
        appreciationGenerale: 'Résultats moyens. Des progrès sont nécessaires.',
        matieres: [
            {
                matiere: 'Comptabilité Générale',
                coefficient: 3.0,
                moyenne: 11.0,
                totalPoints: 33.0,
                appreciation: 'Peut mieux faire',
            },
            {
                matiere: 'Mathématiques Financières',
                coefficient: 2.0,
                moyenne: 13.0,
                totalPoints: 26.0,
                appreciation: 'Assez bien',
            },
            {
                matiere: 'Anglais des Affaires',
                coefficient: 1.0,
                moyenne: 12.5,
                totalPoints: 12.5,
                appreciation: 'Passable',
            },
            {
                matiere: 'Droit Commercial',
                coefficient: 2.0,
                moyenne: 12.0,
                totalPoints: 24.0,
                appreciation: 'Satisfaisant',
            },
        ],
    },
    5: {
        etudiantId: 5,
        totalEtudiants: 35,
        appreciationGenerale:
            'Résultats acceptables. Restez constant dans vos efforts.',
        matieres: [
            {
                matiere: 'Comptabilité Générale',
                coefficient: 3.0,
                moyenne: 10.5,
                totalPoints: 31.5,
                appreciation: 'Passable',
            },
            {
                matiere: 'Mathématiques Financières',
                coefficient: 2.0,
                moyenne: 13.0,
                totalPoints: 26.0,
                appreciation: 'Assez bien',
            },
            {
                matiere: 'Anglais des Affaires',
                coefficient: 1.0,
                moyenne: 11.5,
                totalPoints: 11.5,
                appreciation: 'Passable',
            },
            {
                matiere: 'Droit Commercial',
                coefficient: 2.0,
                moyenne: 12.25,
                totalPoints: 24.5,
                appreciation: 'Satisfaisant',
            },
        ],
    },
    6: {
        etudiantId: 6,
        totalEtudiants: 35,
        appreciationGenerale:
            'Juste la moyenne. Un travail plus régulier est indispensable.',
        matieres: [
            {
                matiere: 'Comptabilité Générale',
                coefficient: 3.0,
                moyenne: 10.0,
                totalPoints: 30.0,
                appreciation: 'Passable',
            },
            {
                matiere: 'Mathématiques Financières',
                coefficient: 2.0,
                moyenne: 11.0,
                totalPoints: 22.0,
                appreciation: 'Passable',
            },
            {
                matiere: 'Anglais des Affaires',
                coefficient: 1.0,
                moyenne: 9.5,
                totalPoints: 9.5,
                appreciation: 'Insuffisant',
            },
            {
                matiere: 'Droit Commercial',
                coefficient: 2.0,
                moyenne: 10.5,
                totalPoints: 21.0,
                appreciation: 'Passable',
            },
        ],
    },
    7: {
        etudiantId: 7,
        totalEtudiants: 35,
        appreciationGenerale:
            'Ajourné. Une session de rattrapage est nécessaire.',
        matieres: [
            {
                matiere: 'Comptabilité Générale',
                coefficient: 3.0,
                moyenne: 8.0,
                totalPoints: 24.0,
                appreciation: 'Insuffisant',
            },
            {
                matiere: 'Mathématiques Financières',
                coefficient: 2.0,
                moyenne: 10.5,
                totalPoints: 21.0,
                appreciation: 'Passable',
            },
            {
                matiere: 'Anglais des Affaires',
                coefficient: 1.0,
                moyenne: 9.0,
                totalPoints: 9.0,
                appreciation: 'Insuffisant',
            },
            {
                matiere: 'Droit Commercial',
                coefficient: 2.0,
                moyenne: 10.0,
                totalPoints: 20.0,
                appreciation: 'Passable',
            },
        ],
    },
    8: {
        etudiantId: 8,
        totalEtudiants: 35,
        appreciationGenerale:
            'Résultats insuffisants. Travail sérieux requis pour le rattrapage.',
        matieres: [
            {
                matiere: 'Comptabilité Générale',
                coefficient: 3.0,
                moyenne: 6.5,
                totalPoints: 19.5,
                appreciation: 'Très insuffisant',
            },
            {
                matiere: 'Mathématiques Financières',
                coefficient: 2.0,
                moyenne: 8.5,
                totalPoints: 17.0,
                appreciation: 'Insuffisant',
            },
            {
                matiere: 'Anglais des Affaires',
                coefficient: 1.0,
                moyenne: 0.0,
                totalPoints: 7.0,
                appreciation: 'Insuffisant',
            },
            {
                matiere: 'Droit Commercial',
                coefficient: 2.0,
                moyenne: 9.0,
                totalPoints: 18.0,
                appreciation: 'Insuffisant',
            },
        ],
    },
};

// ─── Breadcrumbs ──────────────────────────────────────────────────────────────
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Bulletins', href: '/bulletins' },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
const Index = () => {
    const [selectedPeriode, setSelectedPeriode] = useState<string>('1');
    const [selectedClasse, setSelectedClasse] = useState<string>('1');
    const [isRecalculating, setIsRecalculating] = useState(false);

    // Modal détail
    const [selectedEtudiant, setSelectedEtudiant] =
        useState<BulletinEtudiant | null>(null);
    const [appreciationEditable, setAppreciationEditable] =
        useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const bulletins = BULLETINS_MOCK;
    const admis = bulletins.filter((b) => b.moyenneGenerale >= 10).length;
    const ajourne = bulletins.filter((b) => b.moyenneGenerale < 10).length;
    const moyenneClasse =
        bulletins.reduce((acc, b) => acc + b.moyenneGenerale, 0) /
        bulletins.length;

    const handleRecalculer = () => {
        setIsRecalculating(true);
        setTimeout(() => setIsRecalculating(false), 1500);
    };

    const handleOpenDetail = (etudiant: BulletinEtudiant) => {
        setSelectedEtudiant(etudiant);
        const detail = DETAILS_MOCK[etudiant.id];
        setAppreciationEditable(detail?.appreciationGenerale ?? '');
        setIsModalOpen(true);
    };

    const handleTelechargerPDF = (
        etudiant: BulletinEtudiant,
        e: React.MouseEvent,
    ) => {
        e.stopPropagation();
        alert(`Téléchargement du PDF de ${etudiant.prenom} ${etudiant.nom}`);
    };

    const handleTelechargerTous = () => {
        alert('Téléchargement de tous les bulletins en ZIP/PDF...');
    };

    const handleEnregistrer = () => {
        alert(`Appréciation enregistrée : "${appreciationEditable}"`);
        setIsModalOpen(false);
    };

    const handleImprimerPDF = () => {
        if (selectedEtudiant) {
            alert(
                `Impression PDF du bulletin de ${selectedEtudiant.prenom} ${selectedEtudiant.nom}`,
            );
        }
    };

    const detailActif = selectedEtudiant
        ? DETAILS_MOCK[selectedEtudiant.id]
        : null;

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
                selectedEtudiant={selectedEtudiant}
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
