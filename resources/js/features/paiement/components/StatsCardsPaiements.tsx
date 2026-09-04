import { Banknote, PiggyBank, Wallet } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/card';
import { fmt } from '@/utils/util';

interface StatProps {
    total_recette_inscriptions: number;
    total_encaisse: number;
    total_reste: number;
}

export default function StatsCardsPaiements({total_recette_inscriptions, total_encaisse, total_reste} : StatProps) {
    return (
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {[
                {
                    label: 'Montant total des inscriptions',
                    value: total_recette_inscriptions,
                    icon: Banknote,
                    color: 'text-blue-600',
                    bg: 'bg-blue-50',
                },
                {
                    label: 'Montant total versé',
                    value: total_encaisse,
                    icon: Wallet,
                    color: 'text-emerald-600',
                    bg: 'bg-emerald-50',
                },
                {
                    label: 'Montant total dû',
                    value: total_reste,
                    icon: PiggyBank,
                    color: 'text-red-600',
                    bg: 'bg-red-50',
                },
            ].map(({ label, value, icon: Icon, color, bg }) => (
                <Card key={label} className="shadow-sm">
                    <CardContent className="flex items-center gap-3 p-4">
                        <div className={`rounded-lg p-2 ${bg}`}>
                            <Icon className={`h-4 w-4 ${color}`} />
                        </div>
                        <div>
                            <p className="text-xl font-bold tracking-tight">
                                {fmt(value)}
                            </p>
                            <p className="text-xs leading-tight text-muted-foreground">
                                {label}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
