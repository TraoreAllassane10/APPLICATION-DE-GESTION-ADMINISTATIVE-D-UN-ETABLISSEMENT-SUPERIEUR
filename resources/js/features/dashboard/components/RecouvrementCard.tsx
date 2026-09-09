import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { fmt } from '@/utils/util';
import { TrendingUp } from 'lucide-react';
import { StatFinanciere } from '../types/dashboard.types';

interface RecouvrementCardProps {
    anneeActive: string;
    taux: number;
    stats_financiere: StatFinanciere;
}

const RecouvrementCard = ({
    anneeActive,
    stats_financiere,
    taux,
}: RecouvrementCardProps) => {
    const strokeColor =
        taux >= 80
            ? 'stroke-emerald-500'
            : taux >= 50
              ? 'stroke-blue-500'
              : 'stroke-amber-500';

    return (
        <Card className="flex flex-col justify-between border-border/60 shadow-xs transition-all hover:shadow-md">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base font-semibold">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        Recouvrement global
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                        {anneeActive}
                    </Badge>
                </div>
                <CardDescription className="text-xs">
                    Progression de la collecte des frais de scolarité
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* SVG Circular Gauge */}
                <div className="flex justify-center py-2">
                    <div className="relative h-36 w-36">
                        <svg
                            viewBox="0 0 100 100"
                            className="h-full w-full -rotate-90 transform"
                        >
                            <circle
                                cx="50"
                                cy="50"
                                r="38"
                                fill="none"
                                className="stroke-muted"
                                strokeWidth="9"
                            />
                            <circle
                                cx="50"
                                cy="50"
                                r="38"
                                fill="none"
                                className={`${strokeColor} transition-all duration-1000 ease-out`}
                                strokeWidth="9"
                                strokeDasharray={`${taux * 2.388} 238.8`}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold tracking-tight tabular-nums">
                                {taux}%
                            </span>
                            <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
                                recouvré
                            </span>
                        </div>
                    </div>
                </div>

                <div className="divide-y divide-border/50 rounded-lg border bg-muted/20 px-4">
                    {[
                        {
                            label: 'Total attendu',
                            value: fmt(stats_financiere.totalAttendu),
                            color: 'text-foreground',
                        },
                        {
                            label: 'Montant payé',
                            value: fmt(stats_financiere.totalPaye),
                            color: 'text-emerald-600 dark:text-emerald-400',
                        },
                        {
                            label: 'Reste à payer',
                            value: fmt(stats_financiere.resteAPayer),
                            color: 'text-rose-600 dark:text-rose-400',
                        },
                    ].map(({ label, value, color }) => (
                        <div
                            key={label}
                            className="flex items-center justify-between py-3 text-sm"
                        >
                            <span className="text-muted-foreground">
                                {label}
                            </span>
                            <span
                                className={`font-semibold tabular-nums ${color}`}
                            >
                                {value}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default RecouvrementCard;
