import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
} from '@/components/ui/combobox';
import useEnseignement from '@/features/enseignement/hooks/useEnseignement';
import { Enseignement } from '@/features/enseignement/types/enseignement.types';
import { DataNiveau } from '@/types';
import { router } from '@inertiajs/react';
import { Edit, Loader, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface EditEnseignementModalProps {
    enseignementId: number | null;
    onClose: () => void;
}

export default function EditEnseignementModal({
    enseignementId,
    onClose,
}: EditEnseignementModalProps) {
    const [enseignement, setEnseignement] = useState<Enseignement | null>(null);
    const [niveaux, setNiveaux] = useState<DataNiveau[]>([]);
    const [classes, setClasses] = useState<string[]>([]);

    const { getEnseignement, updateEnseignement, loading } = useEnseignement();

    useEffect(() => {
        async function loadEnseignement() {
            const response = await getEnseignement(enseignementId!);

            setEnseignement(response.enseignement);
            setNiveaux(response.niveaux);

            let NiveauEnseigne: string[] = [];
            response.enseignement.niveaux.forEach((niveau: any) => {
                NiveauEnseigne.push(niveau.pivot.niveau_id);
            });

            setClasses(NiveauEnseigne);
        }

        loadEnseignement();
    }, []);

    const handleSubmit = async () => {
        await updateEnseignement(enseignementId!, {classes});
        onClose();

        router.reload()
    };

    if (enseignementId === null) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/50">
            {loading ? (
                <div>
                    <Loader className="animate-spin text-white" />
                </div>
            ) : (
                <Card className="mx-4 px-4 py-2">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-6">
                        <h1 className="text-md">Editer un enseignement</h1>

                        <Button
                            onClick={onClose}
                            variant={'outline'}
                            size={'sm'}
                        >
                            <X />
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 md:w-md lg:w-lg">
                        <div className="flex items-start rounded-sm bg-muted-foreground/5 px-4 py-1">
                            <p className="text-md font-bold">
                                {enseignement?.cours?.nom}
                            </p>
                        </div>

                        <Combobox
                            items={niveaux}
                            multiple
                            value={classes}
                            onValueChange={setClasses}
                        >
                            <ComboboxChips>
                                <ComboboxValue>
                                    {classes.map((id) => {
                                        const classeTrouvees = niveaux.find(
                                            (niveau) => niveau.id == Number(id),
                                        );

                                        return (
                                            <ComboboxChip key={id}>
                                                {classeTrouvees
                                                    ? classeTrouvees.nom
                                                    : id}
                                            </ComboboxChip>
                                        );
                                    })}
                                </ComboboxValue>
                                <ComboboxChipsInput placeholder="Ajouter une classe" />
                            </ComboboxChips>
                            <ComboboxContent>
                                <ComboboxEmpty>
                                    Aucune classe trouvée.
                                </ComboboxEmpty>
                                <ComboboxList>
                                    {(item) => (
                                        <ComboboxItem
                                            key={item.id}
                                            value={item.id}
                                        >
                                            {item.nom}
                                        </ComboboxItem>
                                    )}
                                </ComboboxList>
                            </ComboboxContent>
                        </Combobox>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end">
                        <Button
                            onClick={handleSubmit}
                            className="transition hover:bg-red-700"
                        >
                            <Edit />
                            Editer
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
}
