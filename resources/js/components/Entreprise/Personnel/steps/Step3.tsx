import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { EtudiantFormData } from '@/types';
import { Plus, Trash, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Field from '../Field';
import { Separator } from '@/components/ui/separator';

export function Step3({
    data,
    setData,
}: {
    data: EtudiantFormData;
    setData: (d: EtudiantFormData) => void;
}) {
    const [openForm, setOpenForm] = useState(false);

    const [dataForm, setDataForm] = useState({
        annee: '',
        diplome: '',
        ecole: '',
    });

    const handleChange = (champs: string, value: string) => {
        setDataForm((prev) => ({ ...prev, [champs]: value }));
    };

    const cannotRegister =
        dataForm.annee === '' ||
        dataForm.diplome === '' ||
        dataForm.ecole === '';

    const handleAddFormation = () => {
        if (cannotRegister) {
            toast.error('Veuillez remplir tous les champs svp ! ', {
                position: 'bottom-right',
            });
            return;
        }

        setData({
            ...data,
            formations: [...data.formations, dataForm],
        });

        setDataForm({
            annee: '',
            diplome: '',
            ecole: '',
        });

        setOpenForm(false);
    };

    const handleDeleteFormation = (index: number) => {
        const formationsUpdated = data.formations.filter(
            (_: any, idx: number) => idx !== index,
        );

        setData({ ...data, formations: formationsUpdated });
    };

    return (
        <div className="space-y-5">
            <Table className="mb-4 w-[50%]">
                <TableHeader>
                    <TableRow>
                        <TableHead>Annee(s)</TableHead>
                        <TableHead>Diplome(s) obtenu(s)</TableHead>
                        <TableHead>Ecole / Université</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.formations.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                Aucune formation ajoutée
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.formations.map((formation: any, index: number) => (
                            <TableRow>
                                <TableCell>{formation.annee}</TableCell>
                                <TableCell>{formation.diplome}</TableCell>
                                <TableCell>{formation.ecole}</TableCell>
                                <TableCell>
                                    <Button
                                        variant={'outline'}
                                        className="text-sm"
                                        onClick={() =>
                                            handleDeleteFormation(index)
                                        }
                                    >
                                        <Trash />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            <Separator />

            {openForm && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                    <Field label="Annee">
                        <Input
                            value={dataForm.annee}
                            onChange={(e) =>
                                handleChange('annee', e.target.value)
                            }
                        />
                    </Field>

                    <Field label="Diplome obtenu">
                        <Input
                            value={dataForm.diplome}
                            onChange={(e) =>
                                handleChange('diplome', e.target.value)
                            }
                        />
                    </Field>

                    <Field label="Ecole / Universite">
                        <Input
                            value={dataForm.ecole}
                            onChange={(e) =>
                                handleChange('ecole', e.target.value)
                            }
                        />
                    </Field>

                    <div className="flex items-end">
                        <Button
                            variant={'outline'}
                            onClick={handleAddFormation}
                            disabled={cannotRegister}
                        >
                            <Plus /> Ajouter
                        </Button>
                    </div>
                </div>
            )}

            <Button
                variant={'outline'}
                onClick={() => setOpenForm((prev) => !prev)}
            >
                {openForm ? (
                    <span className="flex place-items-center gap-1">
                        <X /> Fermer le formulaire
                    </span>
                ) : (
                    <span className="flex place-items-center gap-1">
                        <Plus /> Ajouter une formation
                    </span>
                )}
            </Button>
        </div>
    );
}
