import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface StepFinancierProps {
    taux_reduction: string;
    montant_reduction: string;
    onTauxReduction: (value: string) => void;
    onMontantReduction: (value: string) => void;
}

/**
 * Étape financière du parcours d'inscription.
 *
 * L'utilisateur peut renseigner soit un taux de réduction (%), soit un montant
 * de réduction fixe, mais jamais les deux simultanément.
 * Lorsqu'un des champs est renseigné, l'autre est automatiquement vidé et désactivé.
 * Si la valeur est effacée, l'autre champ redevient disponible.
 */
export default function StepFinancier({
    taux_reduction,
    montant_reduction,
    onTauxReduction,
    onMontantReduction,
}: StepFinancierProps) {
    const tauxActif    = taux_reduction !== '' && taux_reduction !== null;
    const montantActif = montant_reduction !== '' && montant_reduction !== null;

    const handleTauxChange = (value: string) => {
        onTauxReduction(value);
        // Vide et verrouille le montant dès qu'un taux est saisi
        if (value !== '') {
            onMontantReduction('');
        }
    };

    const handleMontantChange = (value: string) => {
        onMontantReduction(value);
        // Vide et verrouille le taux dès qu'un montant est saisi
        if (value !== '') {
            onTauxReduction('');
        }
    };

    return (
        <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
                Renseignez soit un taux de réduction, soit un montant fixe — pas les deux.
                Laissez les deux champs vides pour une inscription sans réduction.
            </p>

            {/* Taux de réduction */}
            <div className="space-y-2">
                <Label htmlFor="taux_reduction">Taux de réduction (%)</Label>
                <Input
                    id="taux_reduction"
                    type="number"
                    min={0}
                    max={100}
                    step={1}
                    placeholder="Ex: 25"
                    value={taux_reduction}
                    onChange={(e) => handleTauxChange(e.target.value)}
                    disabled={montantActif}
                    className={montantActif ? 'cursor-not-allowed opacity-50' : ''}
                />
                {montantActif && (
                    <p className="text-xs text-muted-foreground">
                        Désactivé car un montant de réduction est déjà saisi.
                    </p>
                )}
            </div>

            {/* Montant de réduction */}
            <div className="space-y-2">
                <Label htmlFor="montant_reduction">Montant de réduction (FCFA)</Label>
                <Input
                    id="montant_reduction"
                    type="number"
                    min={0}
                    step={1}
                    placeholder="Ex: 25000"
                    value={montant_reduction}
                    onChange={(e) => handleMontantChange(e.target.value)}
                    disabled={tauxActif}
                    className={tauxActif ? 'cursor-not-allowed opacity-50' : ''}
                />
                {tauxActif && (
                    <p className="text-xs text-muted-foreground">
                        Désactivé car un taux de réduction est déjà saisi.
                    </p>
                )}
            </div>
        </div>
    );
}
