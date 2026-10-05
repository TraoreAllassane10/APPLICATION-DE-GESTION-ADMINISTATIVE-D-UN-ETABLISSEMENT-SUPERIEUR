import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';
import { Cours } from '@/features/cours/types/cours.types';
import { Professeur } from '@/features/professeur/types/professeur.types';
import { DataNiveau } from '@/types';
import { Search, SlidersHorizontal, X } from 'lucide-react';

interface FiltreEnseignementProps {
    professeurs: Professeur[];
    cours: Cours[];
    niveaux: DataNiveau[];
    filtreProfesseur: string;
    onChangeProfesseur: React.Dispatch<React.SetStateAction<string>>;
    filtreCours: string;
    onChangeFiltreCours: React.Dispatch<React.SetStateAction<string>>;
    filtreNiveau: string;
    onChangeFiltreNiveau: React.Dispatch<React.SetStateAction<string>>;
    hasFilters: string | boolean;
    onSearch: () => void;
    reset: () => void;
    totalEnseignement: number;
}

const FiltreEnseignement = ({
    professeurs,
    cours,
    niveaux,
    filtreProfesseur,
    onChangeProfesseur,
    filtreCours,
    onChangeFiltreCours,
    filtreNiveau,
    onChangeFiltreNiveau,
    hasFilters,
    onSearch,
    reset,
    totalEnseignement,
}: FiltreEnseignementProps) => {
    const professeurSelectionne =
        professeurs.find(
            (professeur) => String(professeur.id) === filtreProfesseur,
        ) ?? null;
    const coursSelectionne =
        cours.find((item) => String(item.id) === filtreCours) ?? null;
    const niveauSelectionne =
        niveaux.find((item) => String(item.id) === filtreNiveau) ?? null;

    return (
        <Card className="shadow-sm">
            <CardContent className="flex flex-wrap items-center gap-3 p-4">
                <Combobox
                    items={professeurs}
                    value={professeurSelectionne}
                    itemToStringLabel={(item) =>
                        (item as Professeur).nom_prenom
                    }
                    onValueChange={(value) =>
                        onChangeProfesseur(
                            value ? String((value as Professeur).id) : '',
                        )
                    }
                >
                    <ComboboxInput placeholder="Sélectionner un enseignant" />
                    <ComboboxContent>
                        <ComboboxEmpty>Aucun enseignant trouvé.</ComboboxEmpty>
                        <ComboboxList>
                            {(item) => (
                                <ComboboxItem key={item.id} value={item}>
                                    {item.nom_prenom}
                                </ComboboxItem>
                            )}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>

                <Combobox
                    items={cours}
                    value={coursSelectionne}
                    itemToStringLabel={(item) => (item as Cours).nom ?? 'Cours'}
                    onValueChange={(value) =>
                        onChangeFiltreCours(
                            value ? String((value as Cours).id) : '',
                        )
                    }
                >
                    <ComboboxInput placeholder="Sélectionner un cours" />
                    <ComboboxContent>
                        <ComboboxEmpty>Aucun cours trouvé.</ComboboxEmpty>
                        <ComboboxList>
                            {(item) => {
                                const libelle = item.nom ?? 'Cours';

                                return (
                                    <ComboboxItem key={item.id} value={item}>
                                        {libelle}
                                    </ComboboxItem>
                                );
                            }}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>

                <Combobox
                    items={niveaux}
                    value={niveauSelectionne}
                    itemToStringLabel={(item) =>
                        (item as DataNiveau).nom ?? 'Niveau'
                    }
                    onValueChange={(value) =>
                        onChangeFiltreNiveau(
                            value ? String((value as DataNiveau).id) : '',
                        )
                    }
                >
                    <ComboboxInput placeholder="Sélectionner un niveau" />
                    <ComboboxContent>
                        <ComboboxEmpty>Aucun niveau trouvé.</ComboboxEmpty>
                        <ComboboxList>
                            {(item) => {
                                const libelle = item.nom ?? 'Niveau';

                                return (
                                    <ComboboxItem key={item.id} value={item}>
                                        {libelle}
                                    </ComboboxItem>
                                );
                            }}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>

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
                            onClick={reset}
                            className="gap-1.5 text-muted-foreground"
                        >
                            <X className="h-3.5 w-3.5" /> Réinitialiser
                        </Button>
                    </>
                )}

                <span className="ml-auto flex items-center gap-1 text-xs text-muted-foreground">
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    {totalEnseignement} résultat
                    {totalEnseignement !== 1 ? 's' : ''}
                </span>
            </CardContent>
        </Card>
    );
};

export default FiltreEnseignement;
