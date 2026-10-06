import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface FiltreProfesseurProps {
    search: string;
    onChangeSearch: React.Dispatch<React.SetStateAction<string>>;
    hasFilters: string | boolean;
    onSearch: () => void;
    onReset: () => void;
    totalProfesseur: number;
}

const FiltreProfesseur = ({
    search,
    onChangeSearch,
    hasFilters,
    totalProfesseur,
    onSearch,
    onReset,
}: FiltreProfesseurProps) => {
    return (
        <Card className="shadow-sm">
            <CardContent className="flex flex-wrap items-center gap-3 p-4">
                <div className="relative min-w-[220px] flex-1">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Nom, Identifiant permanent..."
                        value={search}
                        onChange={(e) => onChangeSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>

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
                    {totalProfesseur} résultat
                    {totalProfesseur !== 1 ? 's' : ''}
                </span>
            </CardContent>
        </Card>
    );
};

export default FiltreProfesseur;
