import { Inscription } from '@/features/inscription/types/inscription.types';
import { Paiement } from '@/features/paiement/types/paiement.types';
import { RepartitionNiveau, StatFinanciere } from '../types/dashboard.types';
import DernieresInscriptionCard from './DernieresInscriptionCard';
import DerniersPaiementCard from './DerniersPaiementCard';
import RecouvrementCard from './RecouvrementCard';
import RepartitionNiveauCard from './RepartitionNiveauCard';

interface DashboardAdminProps {
    anneeActive: string;
    taux: number;
    stats_financiere: StatFinanciere;
    repartitionNiveaux: RepartitionNiveau[];
    derniers_paiements: Paiement[];
    dernieres_inscriptions: Inscription[];
}

const DashboardAdmin = ({
    anneeActive,
    taux,
    stats_financiere,
    repartitionNiveaux,
    derniers_paiements,
    dernieres_inscriptions,
}: DashboardAdminProps) => {
    return (
        <div className="space-y-8">
            {/* ── Financial & Academic Repartition ──────────────────── */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Recouvrement */}
                <RecouvrementCard
                    anneeActive={anneeActive}
                    stats_financiere={stats_financiere}
                    taux={taux}
                />

                {/* Repartition par niveau */}
                <RepartitionNiveauCard
                    anneeActive={anneeActive}
                    repartitionNiveaux={repartitionNiveaux}
                />
            </div>

            {/* ── Recent Activity Tables ─────────────────────────────── */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Derniers paiements */}
                <DerniersPaiementCard derniers_paiements={derniers_paiements} />

                {/* Dernières inscriptions */}
                <DernieresInscriptionCard
                    dernieres_inscriptions={dernieres_inscriptions}
                />
            </div>
        </div>
    );
};

export default DashboardAdmin;
