import { ArrowRightLeft, UserCheck, Users, UserX } from 'lucide-react';
import StatCard from '../StatCard';
import { StatsEtudiant } from '@/types';

const EtudiantStats = ({ stats }: {stats: StatsEtudiant}) => {
    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard
                label="Alumnis"
                value={stats.total}
                icon={Users}
                color="text-blue-600"
                bg="bg-blue-50"
            />
            <StatCard
                label="Affectés"
                value={stats.affecte}
                icon={UserCheck}
                color="text-emerald-600"
                bg="bg-emerald-50"
            />
            <StatCard
                label="Non affectés"
                value={stats.naff}
                icon={UserX}
                color="text-rose-600"
                bg="bg-rose-50"
            />
            <StatCard
                label="Transferts"
                value={stats.transfert}
                icon={ArrowRightLeft}
                color="text-amber-600"
                bg="bg-amber-50"
            />
        </div>
    );
};

export default EtudiantStats;
