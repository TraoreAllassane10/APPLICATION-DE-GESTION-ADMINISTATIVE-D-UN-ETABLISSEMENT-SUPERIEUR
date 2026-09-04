import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StepFinancier({ taux_reduction, setTauxReduction }: any) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>Taux de reduction (%)</Label>
                <Input
                    type="number"
                    placeholder="Ex: 25"
                    className="bg-muted text-muted-foreground"
                    value={taux_reduction}
                    onChange={(e) => setTauxReduction(e.target.value)}
                />
            </div>
        </div>
    );
}