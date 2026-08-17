import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAnnee from '@/hooks/useAnnee';
import usePeriodeAcademique from '@/hooks/usePeriodeAcademique';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Periode } from '@/types';
import { usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'annee',
        href: '/annee',
    },
    {
        title: 'Modification',
        href: '/edit',
    },
];


interface PeriodeEditProps {
    periode: Periode;
    [key: string]: unknown;
}

const Edit = () => {
    const {periode } = usePage<PeriodeEditProps>().props;

    const [libelle, setLibelle] = useState(periode.libelle);
    const [date_debut, setDateDebut] = useState(periode.date_debut);
    const [date_fin, setDateFin] = useState(periode.date_fin);

    const { updatePeriode } = usePeriodeAcademique();

    // Mise à jour d'une annné
    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();

        // Verification des données
        if (libelle == '' || date_debut == undefined || date_fin == undefined) {
            toast.error('Veuillez remplir tous les champs svp !');
            return;
        }

        // modification d'une periode
        await updatePeriode(periode.id, {
            libelle,
            date_debut: new Date(date_debut),
            date_fin: new Date(date_fin),
        });

        // Nettoye de l'etat du composant
        setLibelle('');
        setDateDebut('');
        setDateFin('');
    };

    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-4">
                    <Card className="p-4">
                        <h1 className="mb-6 text-xl font-semibold">
                            Modification d'une periode academique
                        </h1>

                        <form action="" className="space-y-6">
                            <div className="flex flex-col gap-4">
                                <Label className="text-md font-semibold">
                                    Libelle
                                </Label>
                                <Input
                                    value={libelle}
                                    onChange={(e) => setLibelle(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-4">
                                <Label className="text-md font-semibold">
                                    Date de Debut
                                </Label>
                                <Input
                                    type="date"
                                    value={date_debut}
                                    onChange={(e) =>
                                        setDateDebut(e.target.value)
                                    }
                                />
                            </div>

                            <div className="flex flex-col gap-4">
                                <Label className="text-md font-semibold">
                                    Date de Fin
                                </Label>
                                <Input
                                    type="date"
                                    value={date_fin}
                                    onChange={(e) => setDateFin(e.target.value)}
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
