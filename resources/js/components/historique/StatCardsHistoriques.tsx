import { Activite } from "@/types";
import { History, PenLine, PlusCircle, Trash2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";


export default function StatCardsHistoriques({ activites }: { activites: Activite[] }) {
    const counts = {
        total: activites.length,
        creations: activites.filter((a) => a.action === 'Création').length,
        modifications: activites.filter((a) => a.action === 'Modification')
            .length,
        suppressions: activites.filter((a) => a.action === 'Suppression')
            .length,
    };

    return (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
                {
                    label: 'Total activités',
                    value: counts.total,
                    icon: History,
                    color: 'text-blue-600',
                    bg: 'bg-blue-50',
                },
                {
                    label: 'Créations',
                    value: counts.creations,
                    icon: PlusCircle,
                    color: 'text-emerald-600',
                    bg: 'bg-emerald-50',
                },
                {
                    label: 'Modifications',
                    value: counts.modifications,
                    icon: PenLine,
                    color: 'text-amber-600',
                    bg: 'bg-amber-50',
                },
                {
                    label: 'Suppressions',
                    value: counts.suppressions,
                    icon: Trash2,
                    color: 'text-rose-600',
                    bg: 'bg-rose-50',
                },
            ].map(({ label, value, icon: Icon, color, bg }) => (
                <Card key={label} className="shadow-sm">
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