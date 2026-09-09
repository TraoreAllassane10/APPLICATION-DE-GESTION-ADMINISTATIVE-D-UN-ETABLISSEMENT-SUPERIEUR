import { Card, CardContent } from "../ui/card";

export default function StatCard({
    label,
    value,
    sub,
    icon: Icon,
    color,
    bg,
    trend,
}: {
    label: string;
    value: string | number;
    sub?: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    bg: string;
    trend?: { label: string; up: boolean };
}) {
    return (
        <Card className="shadow-sm border-border/30">
            <CardContent className="p-5">
                <div className="mb-3 flex items-start justify-between">
                    <div className={`rounded-xl p-2.5 ${bg}`}>
                        <Icon className={`h-5 w-5 ${color}`} />
                    </div>
                    {trend && (
                        <span
                            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                trend.up
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-rose-50 text-rose-600'
                            }`}
                        >
                            {trend.up ? '↑' : '↓'} {trend.label}
                        </span>
                    )}
                </div>
                <p className="text-2xl font-bold tracking-tight">{value}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{label}</p>
                {sub && (
                    <p className="mt-0.5 text-xs text-muted-foreground/70">
                        {sub}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}