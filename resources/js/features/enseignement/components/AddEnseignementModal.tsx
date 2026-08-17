import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import useCours from '@/features/cours/hooks/useCours';
import { Cours } from '@/features/cours/types/cours.types';
import useEnseignement from '@/features/enseignement/hooks/useEnseignement';
import { router } from '@inertiajs/react';
import { Loader, Loader2, PlusCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface EditEnseignementModalProps {
    professeurId: number;
    onClose: () => void;
}

export default function AddEnseignementModal({
    professeurId,
    onClose,
}: EditEnseignementModalProps) {
    const [cours, setCours] = useState<Cours[] | []>([]);
    const [disciple, setDiscipline] = useState<string>('');

    const { getCours, loading: coursLoading } = useCours();
    const { createEnseignement, loading: createEnseignementLoading } = useEnseignement();

    useEffect(() => {
        async function loadCours() {
            const response = await getCours();
            setCours(response);
        }
        loadCours();
    }, []);

    const handleSubmit = async () => {
        await createEnseignement({
            cours: Number(disciple),
            professeurId: professeurId,
        });

        onClose()

        router.reload();
    };

    return (
        <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/50">
            {coursLoading ? (
                <div>
                    <Loader className="animate-spin text-white" />
                </div>
            ) : (
                <Card className="mx-4 px-4 py-2">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-6">
                        <h1 className="text-md">Attribuer un cours</h1>

                        <Button
                            onClick={onClose}
                            variant={'outline'}
                            size={'icon'}
                        >
                            <X />
                        </Button>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 md:w-md lg:w-lg">
                        <div className="space-y-4">
                            <Label>Discipline enseignée</Label>
                            <Select
                                onValueChange={setDiscipline}
                                value={disciple}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Choisir la discipline enseignée" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {cours?.map((cours) => (
                                            <SelectItem
                                                key={cours.id}
                                                value={cours.id.toString()}
                                            >
                                                {cours.nom}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end">
                        <Button
                            onClick={handleSubmit}
                            disabled={!disciple || createEnseignementLoading}
                            className="transition hover:bg-red-700"
                        >
                            {createEnseignementLoading ? (<Loader2 className='animate-spin' />) : (<PlusCircle />)}
                            {createEnseignementLoading ? "Attribution" : "Attribuer"}
                            
                        </Button>
                    </div>
                </Card>
            )}
        </div>
    );
}
