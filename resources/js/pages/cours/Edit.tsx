import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import useCours from '@/features/cours/hooks/useCours';
import { Cours } from '@/features/cours/types/cours.types';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cours',
        href: '/cours',
    },
    {
        title: 'Modification',
        href: '/edit',
    },
];

// Type des données du professeur
interface Professeur {
    id: number;
    nom: string;
    prenom: string;
}

interface ProfesseurProps {
    cours: Cours;
    types_enseignement: string[];
    professeurs: {
        data: Professeur[];
    };
    [key: string]: unknown;
}

const Edit = () => {
    const { cours, types_enseignement } = usePage<ProfesseurProps>().props;

    const [nom, setNom] = useState(cours.nom);
    const [type_enseignement, setTypeEnseignement] = useState(cours.type_enseignement);

    const { updateCours } = useCours();

    // Mise à jour d'un cours
    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();

        // Verification des données
        if (nom == '') {
            toast.error('Veuillez remplir tous les champs');
            return;
        }

        // modification d'un cours
        updateCours(cours.id, {
            nom,
            type_enseignement
        });

        // Nettoye de l'etat du composant
        setNom('');
    };

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    <Card className="p-4">
                        <h1 className="mb-6 text-xl font-semibold">
                            Modification d'une filière
                        </h1>

                        <form action="" className="space-y-6">
                            <div className="flex flex-col gap-4">
                                <Label className="text-md font-semibold">
                                    Nom de la filière
                                </Label>
                                <Input
                                    value={nom}
                                    onChange={(e) => setNom(e.target.value)}
                                />
                            </div>
                            
                             <div className="grid gap-3">
                                        <Label>Type d'enseigenement</Label>
                                        <NativeSelect
                                            className="w-full"
                                            value={type_enseignement}
                                            onChange={(e) =>
                                                setTypeEnseignement(
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <NativeSelectOption value="" />
                                            {types_enseignement.map((type) => (
                                                <NativeSelectOption
                                                    key={type}
                                                    value={type}
                                                >
                                                    {type}
                                                </NativeSelectOption>
                                            ))}
                                        </NativeSelect>
                                    </div>

                            <Button
                                onClick={handleUpdate}
                                className="float-right cursor-pointer hover:bg-primary/80"
                            >
                                Mettre à jour
                            </Button>
                        </form>
                    </Card>
                </div>
            </AppLayout>
        </div>
    );
};

export default Edit;
