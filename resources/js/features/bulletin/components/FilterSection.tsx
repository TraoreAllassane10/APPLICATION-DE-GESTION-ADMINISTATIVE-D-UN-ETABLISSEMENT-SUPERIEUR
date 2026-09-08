import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { DataNiveau, Periode } from '@/types';
import { Filter, RefreshCw } from 'lucide-react';

interface FilterSectionProps {
    niveaux: DataNiveau[];
    periodes: Periode[];
    selectedPeriode: string;
    onSelectedPeriode: (value: string) => void;
    selectedClasse: string;
    onSelectedClasse: (value: string) => void;
    onRecalculer: () => void;
    isRecalculating: boolean;
}

export default function FilterSection({
    niveaux,
    periodes,
    selectedPeriode,
    onSelectedPeriode,
    selectedClasse,
    onSelectedClasse,
    onRecalculer,
    isRecalculating,
}: FilterSectionProps) {
    const isReady = Boolean(selectedClasse && selectedPeriode);

    return (
        <Card className="border-border/60 bg-card/50 backdrop-blur-sm shadow-xs">
            <CardContent className="p-4">
                <div className="flex flex-wrap items-end gap-3 justify-between">
                    <div className="flex flex-wrap items-end gap-3 flex-1">
                        {/* Sélection Classe */}
                        <div className="space-y-1.5 min-w-[200px] flex-1 sm:flex-none">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Classe
                            </label>
                            <Select value={selectedClasse} onValueChange={onSelectedClasse}>
                                <SelectTrigger className="h-9">
                                    <SelectValue placeholder="Choisir une classe..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {niveaux.map((c) => (
                                        <SelectItem key={c.id} value={c.id.toString()}>
                                            {c.nom}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Sélection Période */}
                        <div className="space-y-1.5 min-w-[180px] flex-1 sm:flex-none">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                Période académique
                            </label>
                            <Select value={selectedPeriode} onValueChange={onSelectedPeriode}>
                                <SelectTrigger className="h-9">
                                    <SelectValue placeholder="Choisir une période..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {periodes.map((p) => (
                                        <SelectItem key={p.id} value={p.id.toString()}>
                                            {p.libelle}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Action de calcul */}
                    <Button
                        onClick={onRecalculer}
                        disabled={isRecalculating || !isReady}
                        size="sm"
                        className="h-9 gap-2 shadow-xs"
                    >
                        <RefreshCw className={`size-3.5 ${isRecalculating ? 'animate-spin' : ''}`} />
                        {isRecalculating ? 'Calcul en cours...' : 'Générer les bulletins'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}