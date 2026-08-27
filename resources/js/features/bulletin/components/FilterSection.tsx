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
import { RefreshCw } from 'lucide-react';


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

function FilterSection({
    niveaux,
    periodes,
    selectedPeriode,
    onSelectedPeriode,
    selectedClasse,
    onSelectedClasse,
    onRecalculer,
    isRecalculating,
}: FilterSectionProps) {
    return (
        <Card>
            <CardContent className="pt-4 pb-4">
                <div className="flex flex-wrap items-center gap-3">
                       {/* Classe */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-muted-foreground">
                            Classe
                        </label>
                        <Select
                            value={selectedClasse}
                            onValueChange={onSelectedClasse}
                        >
                            <SelectTrigger className="w-56" id="select-classe">
                                <SelectValue placeholder="Sélectionner une classe" />
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

                    {/* Période */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-muted-foreground">
                            Période
                        </label>
                        <Select
                            value={selectedPeriode}
                            onValueChange={onSelectedPeriode}
                        >
                            <SelectTrigger className="w-48" id="select-periode">
                                <SelectValue placeholder="Sélectionner une période" />
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

                    {/* Bouton Recalculer */}
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-transparent select-none">
                            Action
                        </label>
                        <Button
                            id="btn-recalculer"
                            onClick={onRecalculer}
                            disabled={isRecalculating || !selectedClasse || !selectedPeriode}
                            className="gap-2"
                        >
                            <RefreshCw
                                className={`size-4 ${isRecalculating ? 'animate-spin' : ''}`}
                            />
                            {isRecalculating ? 'Génération...' : 'Générer'}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default FilterSection;
