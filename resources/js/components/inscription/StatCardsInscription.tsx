import { fmt } from '@/utils/util';
import { Banknote, GraduationCap, LucidePiggyBank } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export default function StatCardsInscription({ stats, isAdmin }: any) {
    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {[
                {
                    label: "Nombre d'inscription de l'année",
                    value: stats.total_inscription_annee,
                    Icon: GraduationCap,
                    bg: 'bg-blue-50',
                    color: 'text-blue-600',
                },
                {
                    label: "Montant total des inscription de l'année",
                    value: fmt(stats.recette_annee_active),
                    Icon: Banknote,
                    bg: 'bg-red-50',
                    color: 'text-red-600',
                },
                {
                    label: "Montant versé de l'année",
                    value: fmt(stats.total_verse_annee_active),
                    Icon: LucidePiggyBank,
                    bg: 'bg-green-50',
                    color: 'text-green-600',
                },
            ].map(({ label, value, Icon, bg, color }) => (
                <Card key={label} className="border shadow-sm">
                    <CardContent className="flex items-center gap-3 p-4">
                        <div className={`rounded-lg p-2 ${bg}`}>
                            <Icon className={`h-4 w-4 ${color}`} />
                        </div>
                        <div>
                            <p className="text-xl font-bold tracking-tight">
                                {value}
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
