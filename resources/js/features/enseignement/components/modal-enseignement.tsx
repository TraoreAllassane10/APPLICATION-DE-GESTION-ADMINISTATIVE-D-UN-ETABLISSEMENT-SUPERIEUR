import { Button } from '@/components/ui/button';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import { DataNiveau } from '@/types';
import { router } from '@inertiajs/react';
import { CheckCircle2, Loader2, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import useEnseignement from '../hooks/useEnseignement';
import { Enseignement, EnseignementNiveau } from '../types/enseignement.types';
import { getEnseignementLabel } from '../utils';

// Structure d'une association classe / coefficient dans le formulaire
interface LigneClasseCoeff {
    niveau: DataNiveau | null;
    coefficient: string;
}

interface ModalEnseignementProps {
    open: boolean;
    onClose: () => void;
    enseignements: Enseignement[];
    niveaux: DataNiveau[];
    enseignementId?: number | null;
}

const ModalEnseignement = ({
    open,
    onClose,
    enseignements,
    niveaux,
    enseignementId,
}: ModalEnseignementProps) => {
    const [enseignementSelectionne, setEnseignementSelectionne] =
        useState<Enseignement | null>(null);
    const [fetching, setFetching] = useState<boolean>(false);

    const {
        getEnseignement,
        updateEnseignement,
        loading: submitting,
    } = useEnseignement();

    // Liste dynamique des paires (Classe / Coefficient)
    const [lignes, setLignes] = useState<LigneClasseCoeff[]>([]);

    // Chargement de l'enseignement dès que le modal s'ouvre ou que l'id change
    useEffect(() => {
        if (!open) {
            setEnseignementSelectionne(null);
            setLignes([]);
            setFetching(false);
            return;
        }

        if (enseignementId) {
            const foundInList = enseignements.find(
                (e) => e.id === enseignementId,
            );
            if (foundInList) {
                setEnseignementSelectionne(foundInList);
            }

            const fetchDetails = async () => {
                setFetching(true);
                try {
                    const response = await getEnseignement(enseignementId);
                    const ens: Enseignement =
                        response?.enseignement ?? foundInList;
                    if (ens) {
                        setEnseignementSelectionne(ens);
                        const initialLignes = (ens.niveaux || []).map(
                            (n: EnseignementNiveau) => ({
                                niveau:
                                    niveaux.find((item) => item.id === n.id) ??
                                    n,
                                coefficient: String(
                                    n.pivot?.coefficient ?? '1',
                                ),
                            }),
                        );
                        setLignes(initialLignes);
                    }
                } catch (error) {
                    console.error(
                        "Erreur lors du chargement de l'enseignement :",
                        error,
                    );
                } finally {
                    setFetching(false);
                }
            };

            fetchDetails();
        } else {
            setEnseignementSelectionne(null);
            setLignes([]);
        }
    }, [open, enseignementId]);

    // Sélection manuelle d'un enseignement via le Combobox (quand ouvert sans ID pré-sélectionné)
    const handleSelectEnseignement = async (ens: Enseignement | null) => {
        setEnseignementSelectionne(ens);
        if (!ens) {
            setLignes([]);
            return;
        }

        setFetching(true);
        try {
            const response = await getEnseignement(ens.id);
            const detailedEns: Enseignement = response?.enseignement ?? ens;
            setEnseignementSelectionne(detailedEns);

            const initialLignes = (detailedEns.niveaux || []).map(
                (n: EnseignementNiveau) => ({
                    niveau: niveaux.find((item) => item.id === n.id) ?? n,
                    coefficient: String(n.pivot?.coefficient ?? '1'),
                }),
            );
            setLignes(initialLignes);
        } catch (error) {
            const initialLignes = (ens.niveaux || []).map(
                (n: EnseignementNiveau) => ({
                    niveau: niveaux.find((item) => item.id === n.id) ?? n,
                    coefficient: String(n.pivot?.coefficient ?? '1'),
                }),
            );
            setLignes(initialLignes);
        } finally {
            setFetching(false);
        }
    };

    // Réinitialisation du formulaire à la fermeture
    const handleClose = () => {
        setEnseignementSelectionne(null);
        setLignes([]);
        onClose();
    };

    // Gestion de l'ajout d'une nouvelle ligne
    const handleAddLigne = () => {
        const premierNiveauDispo = niveaux.find(
            (n) => !lignes.some((l) => l.niveau?.id === n.id),
        );
        setLignes((prev) => [
            ...prev,
            { niveau: premierNiveauDispo ?? null, coefficient: '1' },
        ]);
    };

    // Gestion de la suppression d'une ligne
    const handleRemoveLigne = (index: number) => {
        setLignes((prev) => prev.filter((_, i) => i !== index));
    };

    // Modification du niveau sur une ligne donnée
    const handleNiveauChange = (index: number, niveau: DataNiveau | null) => {
        setLignes((prev) =>
            prev.map((item, i) => (i === index ? { ...item, niveau } : item)),
        );
    };

    // Modification du coefficient sur une ligne donnée
    const handleCoefficientChange = (index: number, coefficient: string) => {
        setLignes((prev) =>
            prev.map((item, i) =>
                i === index ? { ...item, coefficient } : item,
            ),
        );
    };

    // Validation du formulaire
    const isFormValid =
        !!enseignementSelectionne &&
        lignes.every(
            (ligne) =>
                ligne.niveau !== null &&
                ligne.coefficient.trim() !== '' &&
                Number(ligne.coefficient) > 0,
        );

    // Soumission du formulaire
    const handleSubmit = async () => {
        if (!isFormValid || !enseignementSelectionne) return;

        const payload = {
            classes: lignes
                .filter((ligne) => ligne.niveau !== null)
                .map((ligne) => ({
                    niveauId: ligne.niveau!.id,
                    coefficient: Number(ligne.coefficient),
                })),
        };

        try {
            await updateEnseignement(enseignementSelectionne.id, payload);
            handleClose();
            router.reload();
        } catch (error) {
            console.error('Erreur lors de la mise à jour :', error);
        }
    };

    const toutesClassesAssignees =
        niveaux.length > 0 &&
        lignes.filter((l) => l.niveau !== null).length >= niveaux.length;

    return (
        <Sheet open={open} onOpenChange={handleClose}>
            <SheetContent side="right" className="overflow-y-auto sm:max-w-xl">
                <SheetHeader>
                    <SheetTitle>
                        {enseignementId
                            ? "Gérer les classes de l'enseignement"
                            : 'Assigner des classes à un enseignement'}
                    </SheetTitle>
                    <SheetDescription>
                        Consultez, ajoutez ou supprimez les classes associées à
                        cet enseignement ainsi que leurs coefficients.
                    </SheetDescription>
                </SheetHeader>

                <div className="space-y-6 px-4">
                    {/* Si l'enseignement est fixé depuis la table ou choisi */}
                    {enseignementId && enseignementSelectionne ? (
                        <div className="space-y-2 rounded-lg border bg-muted/40 p-4">
                            <div className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                                Enseignement sélectionné
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="text-base font-bold text-foreground">
                                    {enseignementSelectionne.cours?.nom ??
                                        'Matière'}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    Enseignant :{' '}
                                    <span className="font-medium text-foreground">
                                        {enseignementSelectionne.professeur
                                            ?.nom_prenom ?? 'Non renseigné'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Sélection manuelle de l'enseignement */
                        <div className="space-y-2">
                            <Label>Enseignement</Label>
                            <Combobox
                                items={enseignements}
                                value={enseignementSelectionne}
                                itemToStringLabel={(item) =>
                                    getEnseignementLabel(item as Enseignement)
                                }
                                onValueChange={(value) =>
                                    handleSelectEnseignement(
                                        (value as Enseignement | null) ?? null,
                                    )
                                }
                            >
                                <ComboboxInput placeholder="Sélectionner un enseignement" />
                                <ComboboxContent className="pointer-events-auto z-[60]">
                                    <ComboboxEmpty>
                                        Aucun enseignement trouvé.
                                    </ComboboxEmpty>
                                    <ComboboxList>
                                        {(item) => (
                                            <ComboboxItem
                                                key={item.id}
                                                value={item}
                                            >
                                                {getEnseignementLabel(item)}
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                        </div>
                    )}

                    {/* État de chargement initial des données */}
                    {fetching ? (
                        <div className="flex flex-col items-center justify-center gap-3 py-12 text-muted-foreground">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p className="text-sm">
                                Chargement des classes associées...
                            </p>
                        </div>
                    ) : enseignementSelectionne ? (
                        /* Section dynamique des classes / coefficients */
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <Label className="text-base font-semibold">
                                        Classes et Coefficients
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                        {lignes.length}{' '}
                                        {lignes.length > 1
                                            ? 'classes assignées'
                                            : 'classe assignée'}
                                    </p>
                                </div>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handleAddLigne}
                                    disabled={toutesClassesAssignees}
                                    className="gap-1"
                                >
                                    <Plus className="h-4 w-4" /> Ajouter une
                                    classe
                                </Button>
                            </div>

                            {lignes.length === 0 ? (
                                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center text-muted-foreground">
                                    <p className="text-sm font-medium">
                                        Aucune classe n'est actuellement
                                        assignée à cet enseignement.
                                    </p>
                                    <p className="mt-1 text-xs">
                                        Cliquez sur "Ajouter une classe" pour
                                        démarrer l'attribution.
                                    </p>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleAddLigne}
                                        className="mt-4 gap-1.5"
                                    >
                                        <Plus className="h-4 w-4" /> Ajouter une
                                        classe
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {lignes.map((ligne, index) => {
                                        const niveauxDisponibles =
                                            niveaux.filter(
                                                (n) =>
                                                    n.id === ligne.niveau?.id ||
                                                    !lignes.some(
                                                        (l) =>
                                                            l.niveau?.id ===
                                                            n.id,
                                                    ),
                                            );

                                        return (
                                            <div
                                                key={index}
                                                className="flex items-end gap-3 rounded-lg border bg-card p-3 shadow-sm transition hover:border-muted-foreground/30"
                                            >
                                                {/* Choix du niveau */}
                                                <div className="flex-1 space-y-1.5">
                                                    <Label className="text-xs text-muted-foreground">
                                                        Classe #{index + 1}
                                                    </Label>
                                                    <Combobox
                                                        items={
                                                            niveauxDisponibles
                                                        }
                                                        value={ligne.niveau}
                                                        itemToStringLabel={(
                                                            item,
                                                        ) =>
                                                            (item as DataNiveau)
                                                                ?.nom ?? ''
                                                        }
                                                        onValueChange={(
                                                            value,
                                                        ) =>
                                                            handleNiveauChange(
                                                                index,
                                                                (value as DataNiveau | null) ??
                                                                    null,
                                                            )
                                                        }
                                                    >
                                                        <ComboboxInput placeholder="Sélectionner une classe" />
                                                        <ComboboxContent className="pointer-events-auto z-[60]">
                                                            <ComboboxEmpty>
                                                                Aucune classe
                                                                disponible.
                                                            </ComboboxEmpty>
                                                            <ComboboxList>
                                                                {(item) => (
                                                                    <ComboboxItem
                                                                        key={
                                                                            item.id
                                                                        }
                                                                        value={
                                                                            item
                                                                        }
                                                                    >
                                                                        {
                                                                            item.nom
                                                                        }
                                                                    </ComboboxItem>
                                                                )}
                                                            </ComboboxList>
                                                        </ComboboxContent>
                                                    </Combobox>
                                                </div>

                                                {/* Saisie du coefficient */}
                                                <div className="w-28 space-y-1.5">
                                                    <Label className="text-xs text-muted-foreground">
                                                        Coefficient
                                                    </Label>
                                                    <Input
                                                        type="number"
                                                        min="1"
                                                        step="1"
                                                        placeholder="Ex: 2"
                                                        value={
                                                            ligne.coefficient
                                                        }
                                                        onChange={(e) =>
                                                            handleCoefficientChange(
                                                                index,
                                                                e.target.value,
                                                            )
                                                        }
                                                    />
                                                </div>

                                                {/* Bouton de suppression */}
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    title="Supprimer cette classe"
                                                    className="text-destructive hover:bg-destructive/10"
                                                    onClick={() =>
                                                        handleRemoveLigne(index)
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                            Veuillez sélectionner un enseignement ci-dessus pour
                            gérer ses classes et ses coefficients.
                        </div>
                    )}
                </div>

                <SheetFooter className="mt-8 flex gap-2">
                    <Button
                        onClick={handleSubmit}
                        disabled={!isFormValid || submitting || fetching}
                        className="gap-2"
                    >
                        {submitting ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Enregistrement...
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="h-4 w-4" /> Enregistrer
                                les modifications
                            </>
                        )}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        disabled={submitting}
                    >
                        Annuler
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default ModalEnseignement;
