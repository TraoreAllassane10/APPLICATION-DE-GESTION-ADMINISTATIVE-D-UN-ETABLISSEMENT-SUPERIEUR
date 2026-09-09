import { Inscription } from '@/features/inscription/types/inscription.types';
import { RepartitionNiveau } from '../types/dashboard.types';
import RepartitionNiveauCard from './RepartitionNiveauCard';
import DernieresInscriptionCard from './DernieresInscriptionCard';

interface DashbaordPedagogieProps {
    anneeActive: string;
    repartitionNiveaux: RepartitionNiveau[];
    dernieres_inscriptions: Inscription[];
}

const DashbaordPedagogie = ({anneeActive, dernieres_inscriptions, repartitionNiveaux} : DashbaordPedagogieProps) => {
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
  )
}

export default DashbaordPedagogie
