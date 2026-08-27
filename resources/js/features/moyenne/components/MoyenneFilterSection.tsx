import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Enseignement } from '@/features/enseignement/types/enseignement.types';
import { DataNiveau, Periode } from '@/types';

interface MoyenneFilterSectionProps {
    niveaux: DataNiveau[];
    selectedClasseId: string;
    onSelectedClasseId: React.Dispatch<React.SetStateAction<string>>;
    selectedEnseignementId: string;
    onSelectedEnseignementId: React.Dispatch<React.SetStateAction<string>>;
    enseignements: Enseignement[];
    selectedPeriodeId: string;
    onSelectedPeriodeId: React.Dispatch<React.SetStateAction<string>>;
    periodes: Periode[];
}

const MoyenneFilterSection = ({
    niveaux,
    enseignements,
    periodes,
    selectedClasseId,
    onSelectedClasseId,
    selectedEnseignementId,
    onSelectedEnseignementId,
    selectedPeriodeId,
    onSelectedPeriodeId,
}: MoyenneFilterSectionProps) => {
    return (
        <Card>
            <CardContent className="p-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {/* Classe */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">Classe</label>
                        <Select
                            value={selectedClasseId}
                            onValueChange={onSelectedClasseId}
                        >
                            <SelectTrigger id="select-classe">
                                <SelectValue placeholder="Choisir une classe" />
                            </SelectTrigger>
                            <SelectContent>
                                {niveaux.map((c) => (
                                    <SelectItem key={c.id} value={String(c.id)}>
                                        {c.nom}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Enseignement */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">
                            Enseignement
                        </label>
                        <Select
                            value={selectedEnseignementId}
                            onValueChange={onSelectedEnseignementId}
                            disabled={enseignements.length === 0}
                        >
                            <SelectTrigger id="select-enseignement">
                                <SelectValue placeholder="Choisir un enseignement" />
                            </SelectTrigger>
                            <SelectContent>
                                {enseignements.map((ens: Enseignement) => (
                                    <SelectItem
                                        key={ens.id}
                                        value={String(ens.id)}
                                    >
                                        {ens.cours.nom}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Période académique */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium">
                            Période académique
                        </label>
                        <Select
                            value={selectedPeriodeId}
                            onValueChange={onSelectedPeriodeId}
                        >
                            <SelectTrigger id="select-periode">
                                <SelectValue placeholder="Choisir une période" />
                            </SelectTrigger>
                            <SelectContent>
                                {periodes.map((p) => (
                                    <SelectItem key={p.id} value={String(p.id)}>
                                        {p.libelle}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default MoyenneFilterSection;
