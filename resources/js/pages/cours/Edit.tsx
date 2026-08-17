import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useCours from '@/features/cours/hooks/useCours';
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

interface Cours {
    id: string;
    nom: string;
    professeur_id: string;
}

// Type des données du professeur
interface Professeur {
    id: number;
    nom: string;
    prenom: string;
}

interface ProfesseurProps {
    cours: Cours;
    professeurs: {
        data: Professeur[];
    };
    [key: string]: unknown;
}

const Edit = () => {
    const { cours } = usePage<ProfesseurProps>().props;

    const [nom, setNom] = useState(cours.nom);

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
            nom
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
