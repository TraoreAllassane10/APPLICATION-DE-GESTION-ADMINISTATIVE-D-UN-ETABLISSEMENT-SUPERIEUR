import FilterSection from '@/features/bulletin/components/FilterSection';
import HeaderSection from '@/features/bulletin/components/HeaderSection';
import ModalDetailBulletin from '@/features/bulletin/components/modals/ModalDetailBulletin';
import ModalGenerationMasse from '@/features/bulletin/components/modals/ModalGenerationMasse';
import StatistiqueSection from '@/features/bulletin/components/StatistiqueSection';
import TableBulletin from '@/features/bulletin/components/TableBulletin';
import useBulletin from '@/features/bulletin/hooks/useBulletin';
import {
    AnneeUniversitaire,
    Bulletin,
} from '@/features/bulletin/types/bulletin.types';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, DataNiveau, Periode } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { BookOpen, Loader2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Tableau de bord', href: '/dashboard' },
    { title: 'Gestion des Bulletins', href: '/bulletins' },
];

interface BulletinPageProps {
    niveaux: DataNiveau[];
    periodes: Periode[];
    annees?: AnneeUniversitaire[];
    anneeActive?: AnneeUniversitaire;
    [key: string]: unknown;
}

export default function Index() {
    const {
        niveaux = [],
        periodes = [],
        annees = [],
        anneeActive,
    } = usePage<BulletinPageProps>().props;

    // Filtres de session académique
    const [selectedAnnee, setSelectedAnnee] = useState<string>(
        anneeActive?.id?.toString() ??
            (annees.length > 0 ? annees[0].id.toString() : ''),
    );
    const [selectedClasse, setSelectedClasse] = useState<string>('');
    const [selectedPeriode, setSelectedPeriode] = useState<string>('');

    // Filtres de recherche & d'état
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statutFilter, setStatutFilter] = useState<string>('ALL');
    const [completudeFilter, setCompletudeFilter] = useState<string>('ALL');

    // Modales
    const [selectedBulletin, setSelectedBulletin] = useState<Bulletin | null>(
        null,
    );
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [isMassGenerationOpen, setIsMassGenerationOpen] = useState(false);

    // Téléchargement ZIP
    const [downloadingZip, setDownloadingZip] = useState(false);

    const {
        getBulletins,
        genererBulletins,
        validerBulletin,
        publierBulletin,
        bulletins,
        stats,
        loading,
        generating,
        actionLoadingId,
    } = useBulletin();

    // Nom de la classe et libellé de la période sélectionnés
    const classeObj = niveaux.find((n) => n.id.toString() === selectedClasse);
    const periodeObj = periodes.find((p) => p.id.toString() === selectedPeriode);
    const anneeObj = annees.find((a) => a.id.toString() === selectedAnnee);

    // Chargement automatique lors du changement de sélection classe/période
    const handleCharger = async () => {
        if (selectedClasse && selectedPeriode) {
            await getBulletins(Number(selectedClasse), Number(selectedPeriode));
        } else {
            toast.error('Veuillez sélectionner une classe et une période.');
        }
    };

    // Déclencheur de génération en masse
    const handleGenererMasse = async () => {
        if (!selectedClasse || !selectedPeriode) {
            toast.error('Veuillez sélectionner une classe et une période.');
            return;
        }

        // Si des bulletins sont déjà affichés, on ouvre directement le récapitulatif
        setIsMassGenerationOpen(true);
    };

    const handleExecuterGenerationMasse = async () => {
        if (selectedClasse && selectedPeriode) {
            await genererBulletins(
                Number(selectedClasse),
                Number(selectedPeriode),
            );
        }
    };

    // Régénération individuelle d'un bulletin
    const handleRegenererIndividuel = async (bulletin: Bulletin) => {
        if (!selectedClasse || !selectedPeriode) return;

        try {
            await genererBulletins(
                Number(selectedClasse),
                Number(selectedPeriode),
                bulletin.inscription_id,
            );

            // Mettre à jour le bulletin sélectionné dans la modale si ouvert
            if (selectedBulletin?.inscription_id === bulletin.inscription_id) {
                const refreshed = bulletins.find(
                    (b) => b.inscription_id === bulletin.inscription_id,
                );
                if (refreshed) {
                    setSelectedBulletin(refreshed);
                }
            }
        } catch {
            // L'erreur est gérée dans le hook
        }
    };

    // Validation d'un bulletin
    const handleValider = async (bulletin: Bulletin) => {
        if (!bulletin.id) return;
        await validerBulletin(
            bulletin.id,
            Number(selectedClasse),
            Number(selectedPeriode),
        );
        if (selectedBulletin?.id === bulletin.id) {
            setSelectedBulletin((prev) =>
                prev ? { ...prev, statut: 'VALIDE' } : null,
            );
        }
    };

    // Publication d'un bulletin
    const handlePublier = async (bulletin: Bulletin) => {
        if (!bulletin.id) return;
        await publierBulletin(
            bulletin.id,
            Number(selectedClasse),
            Number(selectedPeriode),
        );
        if (selectedBulletin?.id === bulletin.id) {
            setSelectedBulletin((prev) =>
                prev ? { ...prev, statut: 'PUBLIE' } : null,
            );
        }
    };

    // Consultation détaillée
    const handleOpenDetail = (bulletin: Bulletin) => {
        setSelectedBulletin(bulletin);
        setIsDetailOpen(true);
    };

    // Export ZIP de promotion
    const handleDownloadZip = () => {
        if (!selectedClasse || !selectedPeriode) {
            toast.error(
                "Veuillez d'abord sélectionner une classe et une période académique.",
            );
            return;
        }

        setDownloadingZip(true);
        const downloadUrl = `/classes/${selectedClasse}/periodes/${selectedPeriode}/download-zip`;
        window.location.href = downloadUrl;

        setTimeout(() => {
            setDownloadingZip(false);
        }, 5000);
    };

    // Filtrage dynamique des étudiants
    const filteredBulletins = useMemo(() => {
        return bulletins.filter((b) => {
            // Filtre recherche textuelle
            if (searchTerm.trim() !== '') {
                const term = searchTerm.toLowerCase();
                const nomComplet = `${b.nom} ${b.prenom}`.toLowerCase();
                const matricule = (b.etudiant_ip || '').toLowerCase();

                if (!nomComplet.includes(term) && !matricule.includes(term)) {
                    return false;
                }
            }

            // Filtre par statut officiel
            if (statutFilter !== 'ALL' && b.statut !== statutFilter) {
                return false;
            }

            // Filtre par complétude des notes
            if (completudeFilter === 'COMPLETE' && !b.is_complet) {
                return false;
            }
            if (completudeFilter === 'INCOMPLETE' && b.is_complet) {
                return false;
            }

            return true;
        });
    }, [bulletins, searchTerm, statutFilter, completudeFilter]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestion des Bulletins" />

            <div className="space-y-6 p-4 sm:p-6 lg:p-8">
                {/* ÉCRAN 1 : En-tête */}
                <HeaderSection
                    downloadingZip={downloadingZip}
                    onDownloadZip={handleDownloadZip}
                    hasSelection={Boolean(selectedClasse && selectedPeriode)}
                    classeNom={classeObj?.nom}
                    periodeLibelle={periodeObj?.libelle}
                />

                {/* Section Filtres : Année, Classe, Période, Recherche, Statuts */}
                <FilterSection
                    annees={annees}
                    selectedAnnee={selectedAnnee}
                    onSelectedAnnee={setSelectedAnnee}
                    niveaux={niveaux}
                    selectedClasse={selectedClasse}
                    onSelectedClasse={setSelectedClasse}
                    periodes={periodes}
                    selectedPeriode={selectedPeriode}
                    onSelectedPeriode={setSelectedPeriode}
                    searchTerm={searchTerm}
                    onSearchTerm={setSearchTerm}
                    statutFilter={statutFilter}
                    onStatutFilter={setStatutFilter}
                    completudeFilter={completudeFilter}
                    onCompletudeFilter={setCompletudeFilter}
                    onCharger={handleCharger}
                    onGenererMasse={handleGenererMasse}
                    isLoading={loading}
                    isGenerating={generating}
                    hasData={bulletins.length > 0}
                />

                {/* Section Statistiques d'ensemble */}
                {stats && (
                    <StatistiqueSection
                        total_etudiant={stats.total_etudiants}
                        total_admis={stats.total_admis}
                        total_ajourne={stats.total_ajourne}
                        moyenne_classe={stats.moyenne_classe}
                    />
                )}

                {/* Tableau principal des bulletins & états de chargement */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-24 text-center bg-card/40">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <p className="mt-3 text-sm font-medium text-muted-foreground">
                            Chargement des résultats et bilans de la promotion...
                        </p>
                    </div>
                ) : bulletins.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card/30 py-20 text-center">
                        <div className="mb-3 rounded-full bg-muted p-3">
                            <BookOpen className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground">
                            Aucun bulletin chargé
                        </h3>
                        <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                            Sélectionnez une classe et une période ci-dessus,
                            puis cliquez sur <strong>Afficher</strong> ou{' '}
                            <strong>Générer la classe</strong> pour consulter
                            les relevés des étudiants.
                        </p>
                    </div>
                ) : filteredBulletins.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card/30 py-16 text-center">
                        <p className="text-sm font-medium text-foreground">
                            Aucun étudiant ne correspond aux critères de recherche.
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Essayez de modifier votre mot-clé ou vos filtres de
                            statut.
                        </p>
                    </div>
                ) : (
                    <TableBulletin
                        bulletins={filteredBulletins}
                        onOpenDetail={handleOpenDetail}
                        onRegenererIndividuel={handleRegenererIndividuel}
                        onValider={handleValider}
                        onPublier={handlePublier}
                        actionLoadingId={actionLoadingId}
                    />
                )}
            </div>

            {/* ÉCRAN 2 : Consultation & Édition Détaillée */}
            <ModalDetailBulletin
                isModalOpen={isDetailOpen}
                onOpenChange={setIsDetailOpen}
                bulletin={selectedBulletin}
                classeNom={classeObj?.nom}
                periodeLibelle={periodeObj?.libelle}
                anneeLibelle={anneeObj?.libelle}
                onRegenerer={handleRegenererIndividuel}
                onValider={handleValider}
                onPublier={handlePublier}
                isGenerating={generating}
                isActionLoading={actionLoadingId !== null}
            />

            {/* ÉCRAN 3 : Dialogue & Récapitulatif de Génération en Masse */}
            <ModalGenerationMasse
                isOpen={isMassGenerationOpen}
                onOpenChange={setIsMassGenerationOpen}
                classeNom={classeObj?.nom}
                periodeLibelle={periodeObj?.libelle}
                bulletins={bulletins}
                stats={stats}
                isGenerating={generating}
                onLancerGeneration={handleExecuterGenerationMasse}
            />
        </AppLayout>
    );
}
