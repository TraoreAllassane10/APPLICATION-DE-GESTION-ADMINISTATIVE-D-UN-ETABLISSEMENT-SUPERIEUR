import { Card, CardContent } from '@/components/ui/card';
import { Award, CheckCircle2, TrendingUp, Users, XCircle } from 'lucide-react';

interface StatistiqueSectionProps {
    total_etudiant: number;
    total_admis: number;
    total_ajourne: number;
    moyenne_classe: number;
}

export default function StatistiqueSection({
    total_etudiant,
    total_admis,
    total_ajourne,
    moyenne_classe,
}: StatistiqueSectionProps) {
    const tauxAdmission = total_etudiant > 0 
        ? Math.round((total_admis / total_etudiant) * 100) 
        : 0;

    const stats = [
        {
            label: 'Total Étudiants',
            value: total_etudiant,
            subtext: 'Inscrits dans cette session',
            icon: Users,
            color: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-500/10',
        },
        {
            label: 'Admis (≥ 10/20)',
            value: total_admis,
            subtext: `${tauxAdmission}% de réussite`,
            icon: CheckCircle2,
            color: 'text-emerald-600 dark:text-emerald-400',
            bgColor: 'bg-emerald-500/10',
        },
        {
            label: 'Ajournés',
            value: total_ajourne,
            subtext: `${100 - tauxAdmission}% de la classe`,
            icon: XCircle,
            color: 'text-rose-600 dark:text-rose-400',
            bgColor: 'bg-rose-500/10',
        },
        {
            label: 'Moyenne de Promotion',
            value: `${moyenne_classe.toFixed(2)}`,
            subtext: '/ 20 points',
            icon: TrendingUp,
            color: 'text-indigo-600 dark:text-indigo-400',
            bgColor: 'bg-indigo-500/10',
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                    <Card key={idx} className="border-border/60 shadow-xs">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-muted-foreground">
                                    {stat.label}
                                </span>
                                <div className={`p-2 rounded-md ${stat.bgColor}`}>
                                    <Icon className={`size-4 ${stat.color}`} />
                                </div>
                            </div>
                            <div className="mt-2 flex items-baseline gap-2">
                                <span className="text-2xl font-bold tracking-tight">
                                    {stat.value}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                    {stat.subtext}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}