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

export function Step4({
    data,
    setData,
}: {
    data: EtudiantFormData;
    setData: (d: EtudiantFormData) => void;
}) {
    const [openForm, setOpenForm] = useState(false);

    const [dataForm, setDataForm] = useState({
        annee: '',
        nom_ecole: '',
        fonction: '',
        nombre_annee_enseignement: '',
        matiere: '',
    });

    const handleChange = (champs: string, value: string) => {
        setDataForm((prev) => ({ ...prev, [champs]: value }));
    };

    const cannotRegister =
        dataForm.annee === '' ||
        dataForm.nom_ecole === '' ||
        dataForm.fonction === '' ||
        dataForm.nombre_annee_enseignement === '' ||
        dataForm.matiere === '';

    const handleAddExperience = () => {
        if (cannotRegister) {
            toast.error('Veuillez remplir tous les champs svp ! ', {
                position: 'bottom-right',
            });
            return;
        }

        setData({
            ...data,
            experiences: [...data.experiences, dataForm],
        });

        setDataForm({
            annee: '',
            nom_ecole: '',
            fonction: '',
            nombre_annee_enseignement: '',
            matiere: '',
        });

        setOpenForm(false);
    };

    const handleDeleteExperience = (index: number) => {
        const experienceUpdated = data.experiences.filter(
            (_: any, idx: number) => idx !== index,
        );

        setData({ ...data, experiences: experienceUpdated });
    };

    return (
        <div className="space-y-5">
            <Table className="mb-4 w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>Annee(s)</TableHead>
                        <TableHead>Nom ecole / Université</TableHead>
                        <TableHead>Fonction</TableHead>
                        <TableHead>Nombre d'annees d'enseignement</TableHead>
                        <TableHead>Matieres enseignées</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.experiences.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                Aucune experiences ajoutée
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.experiences.map((experience: any, index: number) => (
                            <TableRow>
                                <TableCell>{experience.annee}</TableCell>
                                <TableCell>{experience.nom_ecole}</TableCell>
                                <TableCell>{experience.fonction}</TableCell>
                                <TableCell>{experience.nombre_annee_enseignement}</TableCell>
                                  <TableCell>{experience.matiere}</TableCell>
                                <TableCell>
                                    <Button
                                        variant={'outline'}
                                        className="text-sm"
                                        onClick={() =>
                                            handleDeleteExperience(index)
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

            <Separator/>

            {openForm && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 mt-4">
                    <Field label="Annee">
                        <Input
                            value={dataForm.annee}
                            onChange={(e) =>
                                handleChange('annee', e.target.value)
                            }
                        />
                    </Field>

                    <Field label="Nom ecole / Université">
                        <Input
                            value={dataForm.nom_ecole}
                            onChange={(e) =>
                                handleChange('nom_ecole', e.target.value)
                            }
                        />
                    </Field>

                    <Field label="Fonction">
                        <Input
                            value={dataForm.fonction}
                            onChange={(e) =>
                                handleChange('fonction', e.target.value)
                            }
                        />
                    </Field>

                    <Field label="Nombre d'année d'enseignement">
                        <Input
                            value={dataForm.nombre_annee_enseignement}
                            type='number'
                            onChange={(e) =>
                                handleChange('nombre_annee_enseignement', e.target.value)
                            }
                        />
                    </Field>

                       <Field label="Matière">
                        <Input
                            value={dataForm.matiere}
                            onChange={(e) =>
                                handleChange('matiere', e.target.value)
                            }
                        />
                    </Field>

                    <div className="flex items-end">
                        <Button
                            variant={'outline'}
                            onClick={handleAddExperience}
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
                        <Plus /> Ajouter une experience
                    </span>
                )}
            </Button>
        </div>
    );
}
