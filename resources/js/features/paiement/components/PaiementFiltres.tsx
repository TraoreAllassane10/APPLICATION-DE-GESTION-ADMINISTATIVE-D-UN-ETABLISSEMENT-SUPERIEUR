import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Search, Sheet, X } from 'lucide-react';

interface PaiementFiltresProps {
    filtrePeriode: string;
    onChangeFiltrePeriode: React.Dispatch<React.SetStateAction<string>>;
    hasFilters: boolean;
    onSearch: () => void;
    onReset: () => void;
    onExport: () => void;
}

const PaiementFiltres = ({
    filtrePeriode,
    onChangeFiltrePeriode,
    hasFilters,
    onSearch,
    onReset,
    onExport,
}: PaiementFiltresProps) => {
    return (
        <Card className="shadow-sm">
            <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="flex items-center">
                    <Select
                        value={filtrePeriode}
                        onValueChange={onChangeFiltrePeriode}
                    >
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Période" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                value="all"
                                disabled={filtrePeriode !== 'all'}
                            >
                                Tout
                            </SelectItem>
                            <SelectItem value="Hebdomadaire">
                                Hebdomadaire
                            </SelectItem>
                            <SelectItem value="Mensuel">Mensuel</SelectItem>
                        </SelectContent>
                    </Select>

                    {hasFilters && (
                        <>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onSearch}
                                className="gap-1.5 text-muted-foreground"
                            >
                                <Search className="h-3.5 w-3.5" /> Rechercher
                            </Button>

                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onReset}
                                className="gap-1.5 text-muted-foreground"
                            >
                                <X className="h-3.5 w-3.5" /> Réinitialiser
                            </Button>
                        </>
                    )}
                </div>

                <Button
                    onClick={onExport}
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                >
                    <Sheet className="h-3.5 w-3.5" /> Exporter la liste des
                    paiements
                </Button>
            </CardContent>
        </Card>
    );
};

export default PaiementFiltres;
