import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Enseignement } from '@/features/enseignement/types/enseignement.types';
import { Periode } from '@/types';
import { router } from '@inertiajs/react';
import { BookOpen, Calendar, Search, X } from 'lucide-react';
import { useState } from 'react';
import useEvaluation from '../hooks/useEvaluation';
import useEvaluationProfesseur from '../hooks/useEvaluationProfesseur';

interface EvaluationFiltresSectionProps {
    enseignements: Enseignement[];
    periodes: Periode[];
}

const EvaluationFiltresSection = ({
    enseignements,
    periodes,
}: EvaluationFiltresSectionProps) => {
    const [filtreEnseignement, setFiltreEnseignement] = useState<string>('all');
    const [filtrePeriode, setFiltrePeriode] = useState<string>('all');

    const hasFilters = filtreEnseignement !== 'all' || filtrePeriode !== 'all';

    const { filterEvaluation } = useEvaluation();
    const {filterEvaluation: filterEvaluationProfesseur} = useEvaluationProfesseur();

    const pathname = window.location.pathname;

    const handleSearch = () => {
        if (pathname.startsWith('/professeur')) {
            filterEvaluationProfesseur(filtreEnseignement, filtrePeriode);
            return ;
        }

        filterEvaluation(filtreEnseignement, filtrePeriode);
    };

    const handleReset = () => {
        setFiltreEnseignement('all');
        setFiltrePeriode('all');

        if (pathname.startsWith('/professeur'))
        {
            router.visit('/professeur/evaluations');
            return ;
        }

        router.visit('/evaluations');
    };

    return (
        <Card className="shadow-sm">
            <CardContent className="p-4">
                <div className="flex flex-col flex-wrap gap-3 sm:flex-row sm:items-center">
                    {/* Enseignement Filter */}
                    <div className="w-full sm:w-[320px]">
                        <Select
                            value={filtreEnseignement}
                            onValueChange={setFiltreEnseignement}
                        >
                            <SelectTrigger id="filter-enseignement">
                                <SelectValue placeholder="Tous les enseignements" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Tous les enseignements
                                </SelectItem>
                                {enseignements.map((ens) => (
                                    <SelectItem key={ens.id} value={String(ens.id)}>
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
                                            <span className="truncate">
                                                {ens.niveaux.map((n) => n.nom).join(', ')} / {ens.cours.nom} - {ens.professeur.nom_prenom}
                                            </span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Période Filter */}
                    <div className="w-full sm:w-[280px]">
                        <Select
                            value={filtrePeriode}
                            onValueChange={setFiltrePeriode}
                        >
                            <SelectTrigger id="filter-periode">
                                <SelectValue placeholder="Toutes les périodes" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Toutes les périodes académiques
                                </SelectItem>
                                {periodes.map((periode) => (
                                    <SelectItem key={periode.id} value={String(periode.id)}>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
                                            <span>{periode.libelle}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={handleSearch}
                            className="gap-1.5"
                        >
                            <Search className="h-4 w-4" />
                            Rechercher
                        </Button>

                        {hasFilters && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleReset}
                                className="gap-1.5 text-muted-foreground hover:text-foreground"
                            >
                                <X className="h-4 w-4" />
                                Réinitialiser
                            </Button>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default EvaluationFiltresSection;