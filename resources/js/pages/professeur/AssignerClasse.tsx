import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
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
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import useProfesseur from '@/features/professeur/hooks/useProfesseur';
import { Professeur } from '@/features/professeur/types/professeur.types';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, DataNiveau } from '@/types';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Professeurs', href: '/professeur' },
    { title: 'Attribuer des classes', href: '/professeur' },
];

interface AssignerClasseProps {
    professeur: Professeur;
    niveaux: DataNiveau[];
    [key: string]: unknown;
}

const AssignerClasse = () => {
    const { professeur, niveaux } = usePage<AssignerClasseProps>().props;
    const [enseignement, setEnseignement] = useState('');
    const [classes, setClasses] = useState<string[]>([]);

    const { assignerClassesProfesseur } = useProfesseur();

    const canSubmit = enseignement && classes.length > 0;

    const handleSubmit = async () => {
        await assignerClassesProfesseur(professeur.id, {
            enseignement,
            classes,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex min-h-[70vh] w-full items-center justify-center">
                <Card className="w-full gap-4 rounded-lg border bg-background shadow-lg duration-200 sm:max-w-lg">
                    <CardHeader>
                        <h4 className="text-xl font-medium tracking-wide">
                            Attribuer des classes à {professeur.nom_prenom}
                        </h4>
                    </CardHeader>

                    <Separator />

                    <CardContent>
                        <div className="space-y-4 py-2">
                            <div className="space-y-2">
                                <Label>Discipline enseignée</Label>
                                <Select
                                    onValueChange={setEnseignement}
                                    value={enseignement}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choisir la discipline enseignée" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {professeur.enseignements.map(
                                                (enseignement) => (
                                                    <SelectItem
                                                        key={enseignement.id}
                                                        value={enseignement.id}
                                                    >
                                                        {enseignement.cours.nom}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Selectionner les classes</Label>
                                <Combobox
                                    items={niveaux}
                                    multiple
                                    value={classes}
                                    onValueChange={setClasses}
                                >
                                    <ComboboxChips>
                                        <ComboboxValue>
                                            {classes.map((id) => {
                                                const classeTrouvee =
                                                    niveaux.find(
                                                        (niveau) =>
                                                            String(
                                                                niveau.id,
                                                            ) === String(id),
                                                    );

                                                return (
                                                    <ComboboxChip key={id}>
                                                        {classeTrouvee
                                                            ? classeTrouvee.nom
                                                            : id}
                                                    </ComboboxChip>
                                                );
                                            })}
                                        </ComboboxValue>
                                        <ComboboxChipsInput placeholder="Ajouter une ou des classes" />
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

                            <Button
                                disabled={!canSubmit}
                                onClick={handleSubmit}
                                className="w-full transition duration-300 hover:bg-red-700"
                            >
                                Attribuer
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default AssignerClasse;
