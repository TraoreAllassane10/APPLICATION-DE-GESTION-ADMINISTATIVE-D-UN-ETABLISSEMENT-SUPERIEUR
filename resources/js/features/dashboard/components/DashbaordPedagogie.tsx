import { RepartitionNiveau } from '../types/dashboard.types';
import RepartitionNiveauCard from './RepartitionNiveauCard';

interface DashbaordPedagogieProps {
    anneeActive: string;
    repartitionNiveaux: RepartitionNiveau[];
}

const DashbaordPedagogie = ({
    anneeActive,
    repartitionNiveaux,
}: DashbaordPedagogieProps) => {
    return (
        <div className="space-y-8">
            {/* Repartition par niveau */}
            <RepartitionNiveauCard
                anneeActive={anneeActive}
                repartitionNiveaux={repartitionNiveaux}
            />
        </div>
    );
};

export default DashbaordPedagogie;
