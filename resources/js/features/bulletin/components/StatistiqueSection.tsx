import { Award, FileText, TrendingUp, Users } from 'lucide-react';

interface StatItemProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    colorClass: string;
}

const StatItem = ({ icon, label, value, colorClass }: StatItemProps) => (
    <div className="flex items-center gap-3 rounded-lg border bg-card px-4 py-3 shadow-sm">
        <div
            className={`flex size-9 items-center justify-center rounded-md ${colorClass}`}
        >
            {icon}
        </div>
        <div>
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="text-lg font-bold">{value}</p>
        </div>
    </div>
);

function StatistiqueSection() {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatItem
                icon={<Users className="size-4 text-blue-600" />}
                label="Total étudiants"
                value={10}
                colorClass="bg-blue-50 dark:bg-blue-900/20"
            />
            <StatItem
                icon={<Award className="size-4 text-emerald-600" />}
                label="Admis"
                value={5}
                colorClass="bg-emerald-50 dark:bg-emerald-900/20"
            />
            <StatItem
                icon={<FileText className="size-4 text-red-500" />}
                label="Ajournés"
                value={5}
                colorClass="bg-red-50 dark:bg-red-900/20"
            />
            <StatItem
                icon={<TrendingUp className="size-4 text-violet-600" />}
                label="Moy. classe"
                value={`12.23 / 20`} // ${moyenneClasse.toFixed(2)}
                colorClass="bg-violet-50 dark:bg-violet-900/20"
            />
        </div>
    );
}

export default StatistiqueSection;
