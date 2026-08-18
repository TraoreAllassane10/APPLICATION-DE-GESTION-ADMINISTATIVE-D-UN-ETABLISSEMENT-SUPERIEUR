import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const EvaluationFiltresSection = () => {
    return (
        <Card className="shadow-sm">
            <CardContent className="flex flex-wrap items-center gap-3 p-4">
                <div className="relative min-w-[220px] flex-1">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Nom, Identifiant permanent..."
                        // value={search}
                        // onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>

                <Select
                // value={filtreStatut}
                // onValueChange={setFiltreStatut}
                >
                    <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tous statuts</SelectItem>
                        <SelectItem value="Affecté">Affecté</SelectItem>
                        <SelectItem value="Naff">Naff</SelectItem>
                        <SelectItem value="Réaffecté">Réaffecté</SelectItem>
                        <SelectItem value="Transfert">Transfert</SelectItem>
                    </SelectContent>
                </Select>

                <Select
                // value={filtreGenre}
                // onValueChange={setFiltreGenre}
                >
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Genre" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tous genres</SelectItem>
                        <SelectItem value="Masculin">Masculin</SelectItem>
                        <SelectItem value="Féminin">Féminin</SelectItem>
                    </SelectContent>
                </Select>

                {true && (
                    <>
                        <Button
                            variant="ghost"
                            size="sm"
                            // onClick={handleSearch}
                            className="gap-1.5 text-muted-foreground"
                        >
                            <Search className="h-3.5 w-3.5" /> Rechercher
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            // onClick={reset}
                            className="gap-1.5 text-muted-foreground"
                        >
                            <X className="h-3.5 w-3.5" /> Réinitialiser
                        </Button>
                    </>
                )}

                <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    {/* {etudiants.data.length} résultat
                            {etudiants.data.length !== 1 ? 's' : ''} */}
                </span>
            </CardContent>
        </Card>
    );
};

export default EvaluationFiltresSection;
