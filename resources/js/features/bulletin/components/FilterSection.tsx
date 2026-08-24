import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { RefreshCw } from 'lucide-react';

const PERIODES_MOCK = [
    { id: '1', libelle: 'Semestre 1' },
    { id: '2', libelle: 'Semestre 2' },
    { id: '3', libelle: 'Année complète' },
];

const CLASSES_MOCK = [
    { id: '1', libelle: '1ère Année Finance' },
    { id: '2', libelle: '1ère Année Informatique' },
    { id: '3', libelle: '2ème Année Finance' },
    { id: '4', libelle: '2ème Année Marketing' },
    { id: '5', libelle: '3ème Année Comptabilité' },
];

interface FilterSectionProps {
    selectedPeriode: string;
    onSelectedPeriode: (value: string) => void;
    selectedClasse: string;
    onSelectedClasse: (value: string) => void;
    onRecalculer: () => void;
    isRecalculating: boolean;
}

function FilterSection({
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
                                {PERIODES_MOCK.map((p) => (
                                    <SelectItem key={p.id} value={p.id}>
                                        {p.libelle}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

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
                                {CLASSES_MOCK.map((c) => (
                                    <SelectItem key={c.id} value={c.id}>
                                        {c.libelle}
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
                            disabled={isRecalculating}
                            className="gap-2"
                        >
                            <RefreshCw
                                className={`size-4 ${isRecalculating ? 'animate-spin' : ''}`}
                            />
                            {isRecalculating ? 'Recalcul...' : 'Recalculer'}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default FilterSection;
