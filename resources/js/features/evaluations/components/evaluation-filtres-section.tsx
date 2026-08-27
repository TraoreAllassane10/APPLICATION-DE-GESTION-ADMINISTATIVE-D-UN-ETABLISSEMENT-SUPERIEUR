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

interface EvaluationFiltresSectionProps {
    enseignements: Enseignement[];
    periodes: Periode[];
}

const EvaluationFiltresSection = ({
    enseignements,
    periodes,
}: EvaluationFiltresSectionProps) => {
    const [filtreEnseignement, setFiltreEnseignement] = useState('all');
    const [filtrePeriode, setFiltrePeriode] = useState('all');

    const hasFilters = filtreEnseignement !== 'all' || filtrePeriode !== 'all';

    const { filterEvaluation } = useEvaluation();
    const handleSearch = () => {
        filterEvaluation(filtreEnseignement, filtrePeriode);
    };

    const reset = () => {
        setFiltreEnseignement('');
        setFiltrePeriode('');

        router.visit('/evaluations');
    };

    return (
        <Card className="shadow-sm">
            <CardContent className="flex flex-wrap items-center gap-3 p-4">
                <Select
                    value={filtreEnseignement}
                    onValueChange={setFiltreEnseignement}
                >
                    <SelectTrigger className="w-[350px]">
                        <SelectValue placeholder="Enseignement" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">
                            Tous les enseignements
                        </SelectItem>
                        {enseignements.map((ens) => (
                            <SelectItem value={ens.id.toString()}>
                                <BookOpen/>
                                {ens.niveaux.map((niveau) => (
                                    <span>{niveau.nom}</span>
                                ))} / {ens.cours.nom} - {ens.professeur.nom_prenom}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={filtrePeriode} onValueChange={setFiltrePeriode}>
                    <SelectTrigger className="w-[350px]">
                        <SelectValue placeholder="Période académique" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">
                            Toutes les periodes académiques
                        </SelectItem>
                        {periodes.map((periode) => (
                            <SelectItem value={periode.id.toString()}>
                                <Calendar/>
                                {periode.libelle}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {hasFilters && (
                    <>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleSearch}
                            className="gap-1.5 text-muted-foreground"
                        >
                            <Search className="h-3.5 w-3.5" /> Rechercher
                        </Button>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={reset}
                            className="gap-1.5 text-muted-foreground"
                        >
                            <X className="h-3.5 w-3.5" /> Réinitialiser
                        </Button>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default EvaluationFiltresSection;
