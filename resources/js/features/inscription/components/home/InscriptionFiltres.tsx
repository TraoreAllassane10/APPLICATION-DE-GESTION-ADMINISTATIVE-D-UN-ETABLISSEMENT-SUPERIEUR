import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DataNiveau } from '@/types';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface InscriptionFiltresProps {
    search: string;
    onChangeSearch: (value: React.SetStateAction<string>) => void;
    filtreNiveau: string;
    onChangeFiltreNiveau: React.Dispatch<React.SetStateAction<string>>;
    niveaux: DataNiveau[];
    filtreStatut: string;
    onChangeFiltreStatut: React.Dispatch<React.SetStateAction<string>>;
    hasFilters: string | boolean;
    onSearch: () => void;
    onReset: () => void;
    total_inscription: number;
}
const InscriptionFiltres = ({
    search,
    onChangeSearch,
    filtreNiveau,
    onChangeFiltreNiveau,
    niveaux,
    filtreStatut,
    onChangeFiltreStatut,
    hasFilters,
    onSearch,
    onReset,
    total_inscription,
}: InscriptionFiltresProps) => {
    return (
        <Card className="shadow-sm">
            <CardContent className="flex flex-wrap items-center gap-3 p-4">
                <div className="relative min-w-[220px] flex-1">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Nom, prénom ou Identifiant permanent…"
                        value={search}
                        onChange={(e) => onChangeSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>

                <Select value={filtreNiveau} onValueChange={onChangeFiltreNiveau}>
                    <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Niveau" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tous niveaux</SelectItem>
                        {niveaux.map((n) => (
                            <SelectItem key={n.id} value={n.id.toString()}>
                                {n.nom}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={filtreStatut} onValueChange={onChangeFiltreStatut}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tous statuts</SelectItem>
                        {['Solde', 'En cours'].map((s) => (
                            <SelectItem key={s} value={s}>
                                {s}
                            </SelectItem>
                        ))}
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

                <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    {total_inscription} résultat
                    {total_inscription !== 1 ? 's' : ''}
                </span>
            </CardContent>
        </Card>
    );
};

export default InscriptionFiltres;
