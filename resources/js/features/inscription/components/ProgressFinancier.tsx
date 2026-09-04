import { fmt } from "@/utils/util";
import { Progress } from "../../../components/ui/progress";

export default function ProgressFinanciere({ paye, total }: { paye: number; total: number }) {
    const pct = total > 0 ? Math.round((paye / total) * 100) : 0;
    const color =
        pct >= 100
            ? 'text-emerald-600'
            : pct >= 50
              ? 'text-amber-600'
              : 'text-rose-600';
    return (
        <div className="w-36">
            <div className="mb-1 flex justify-between">
                <span className="text-xs text-muted-foreground">
                    {fmt(paye)}
                </span>
                <span className={`text-xs font-bold ${color}`}>{pct}%</span>
            </div>
            <Progress value={pct} className="h-1.5" />
            <p className="mt-0.5 text-[11px] text-muted-foreground">
                Reste : {fmt(total - paye)}
            </p>
        </div>
    );
}