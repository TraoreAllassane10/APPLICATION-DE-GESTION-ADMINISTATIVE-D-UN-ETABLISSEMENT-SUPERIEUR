
import { Inscription } from '@/features/inscription/types/inscription.types';
import { RepartitionNiveau } from '../types/dashboard.types';
import RepartitionNiveauCard from './RepartitionNiveauCard';
import DernieresInscriptionCard from './DernieresInscriptionCard';

interface DashbaordScolariteProps {
    anneeActive: string;
    repartitionNiveaux: RepartitionNiveau[];
    dernieres_inscriptions: Inscription[];
}

const DashbaordScolarite = ({
    anneeActive,
    dernieres_inscriptions,
    repartitionNiveaux,
}: DashbaordScolariteProps) => {
    return (
        <div className="space-y-8">
            {/* ── Financial & Academic Repartition ──────────────────── */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Repartition par niveau */}
                <RepartitionNiveauCard
                    anneeActive={anneeActive}
                    repartitionNiveaux={repartitionNiveaux}
                />

                {/* Dernières inscriptions */}
                <DernieresInscriptionCard dernieres_inscriptions={dernieres_inscriptions} />
            </div>
        </div>
    );
};

export default DashbaordScolarite;
