import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Field,
    FieldDescription,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import useProfesseur from '@/hooks/useProfesseur';
import AppLayout from '@/layouts/app-layout';
import { Professeur } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

export function champObligatoire() {
    return <span className="ml-1 text-red-500">*</span>;
}

interface ProfesseurProps {
    professeurs: Professeur[];
    [key: string]: unknown;
}

function Create() {
    const { professeurs } = usePage<ProfesseurProps>().props;

    const [option, setOption] = useState('1');

    const [formData, setFormData] = useState({
        matricule: '',
        nom_prenom: '',
        sexe: '',
        date_naissance: '',
        pays: '',
        specialite: '',
        telephone: '',
        diplome: '',
        grade: '',
        statut: '',
        annee_prise_fonction: '',
        formation_continue: '',
        nombre_heure_cours_prevue: '',
        nombre_heure_cours_realise: '',
    });

    const handleChange = useCallback(
        (champs: keyof typeof formData, value: string) => {
            setFormData((prev) => ({ ...prev, [champs]: value }));
        },
        [],
    );

    const canRegister =
        formData.matricule !== '' &&
        formData.nom_prenom !== '' &&
        formData.sexe !== '' &&
        formData.date_naissance !== '' &&
        formData.pays !== '' &&
        formData.specialite !== '' &&
        formData.diplome !== '' &&
        formData.grade !== '' &&
        formData.statut !== '' &&
        formData.annee_prise_fonction !== '';

    const { createProfesseur } = useProfesseur();

    // Creation d'un enseignant
    const handleSubmit = () => {
        if (!canRegister) {
            toast.error('Veuillez renseigner les informations importantes');
            return;
        }

        const data = {
            option: Number(option),
            matricule: formData.matricule,
            nom_prenom: formData.nom_prenom,
            sexe: formData.sexe,
            date_naissance: formData.date_naissance,
            pays: formData.pays,
            specialite: formData.specialite,
            telephone: formData.telephone,
            diplome: formData.diplome,
            grade: Number(formData.grade),
            statut: Number(formData.statut),
            annee_prise_fonction: Number(formData.annee_prise_fonction),
            formation_continue: Number(formData.formation_continue),
            nombre_heure_cours_prevue: Number(
                formData.nombre_heure_cours_prevue,
            ),
            nombre_heure_cours_realise: Number(
                formData.nombre_heure_cours_realise,
            ),
        };

        createProfesseur(data);
    };

    //
    const handleSelectEnseignant = (v: any) => {
        const enseignantSelectionne = professeurs.find(
            (value) => value.id == Number(v),
        );

        if (enseignantSelectionne) {
            setFormData((prev) => ({
                ...prev,
                matricule: enseignantSelectionne.matricule,
                nom_prenom: enseignantSelectionne.nom_prenom,
                sexe: enseignantSelectionne.sexe,
                date_naissance: enseignantSelectionne.date_naissance,
                pays: enseignantSelectionne.pays,
                specialite: enseignantSelectionne.specialite,
                telephone: enseignantSelectionne.telephone || '',
            }));
        }
    };

    return (
        <AppLayout>
            <Head title="Enseignant" />

            <div className="p-6">
                <div className="mb-6">
                    <Link
                        href="/professeur"
                        className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" /> Retour aux
                        enseignants
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Nouvel enseignant
                    </h1>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                        Remplissez les informations pour enregistrer un nouvel
                        enseignant.
                    </p>
                </div>

                <Card className="shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle>Information de l'enseignant</CardTitle>
                        <CardDescription>
                            Renseigner les informations personnelle de
                            l'enseignant
                        </CardDescription>
                    </CardHeader>

                    <Separator />

                    {/* Option d'enregistrement */}
                    <CardContent className="pb-4">
                        <FieldSet className="w-full max-w-xs">
                            <FieldLegend variant="label">
                                Mode d'enregistrement
                            </FieldLegend>
                            <FieldDescription>
                                Choisissez une option d'enregistrement.
                            </FieldDescription>

                            <RadioGroup
                                defaultValue={option}
                                onValueChange={setOption}
                                className="mt-4"
                            >
                                <div className="flex flex-row items-center gap-3">
                                    <RadioGroupItem value="1" id="nouvel" />
                                    <Label htmlFor="nouvel">
                                        Nouvel enseignant
                                    </Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="2" id="existant" />
                                    <Label htmlFor="existant">
                                        Enseignant existant
                                    </Label>
                                </div>
                            </RadioGroup>
                        </FieldSet>
                    </CardContent>

                    <Separator />

                    {/* Choix de l'enseignement existant */}
                    <CardContent>
                        <Field className="w-full">
                            <FieldLabel>Enseignant</FieldLabel>
                            <Select
                                disabled={option == '1'}
                                onValueChange={(v) => handleSelectEnseignant(v)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {professeurs.map((prof) => (
                                            <SelectItem
                                                key={prof.id}
                                                value={prof.id.toString()}
                                            >
                                                {prof.nom_prenom}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FieldDescription>
                                Selectionnez l'enseignant.
                            </FieldDescription>
                        </Field>
                    </CardContent>

                    <Separator />

                    {/* Informations Indentitaire */}
                    <CardContent>
                        <Field className="w-full">
                            <FieldLabel>Informations sur l'identité</FieldLabel>

                            <div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div>
                                        <Label>
                                            Matricule {champObligatoire()}
                                        </Label>
                                        <Input
                                            value={formData.matricule}
                                            onChange={(e) =>
                                                handleChange(
                                                    'matricule',
                                                    e.target.value,
                                                )
                                            }
                                            disabled={option == '2'}
                                        />
                                    </div>

                                    <div>
                                        <Label>
                                            Nom et Prenom {champObligatoire()}
                                        </Label>
                                        <Input
                                            value={formData.nom_prenom}
                                            onChange={(e) =>
                                                handleChange(
                                                    'nom_prenom',
                                                    e.target.value,
                                                )
                                            }
                                            disabled={option == '2'}
                                        />
                                    </div>

                                    <div>
                                        <Label>Sexe {champObligatoire()}</Label>
                                        <Select
                                            value={formData.sexe}
                                            onValueChange={(v) =>
                                                handleChange('sexe', v)
                                            }
                                            disabled={option == '2'}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choisir un sexe" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectItem value="M">
                                                        M
                                                    </SelectItem>
                                                    <SelectItem value="F">
                                                        F
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>
                                            Date de naissance{' '}
                                            {champObligatoire()}
                                        </Label>
                                        <Input
                                            type="date"
                                            value={formData.date_naissance}
                                            onChange={(e) =>
                                                handleChange(
                                                    'date_naissance',
                                                    e.target.value,
                                                )
                                            }
                                            disabled={option == '2'}
                                        />
                                    </div>

                                    <div>
                                        <Label>Pays {champObligatoire()}</Label>
                                        <Input
                                            value={formData.pays}
                                            onChange={(e) =>
                                                handleChange(
                                                    'pays',
                                                    e.target.value,
                                                )
                                            }
                                            disabled={option == '2'}
                                        />
                                    </div>

                                    <div>
                                        <Label>
                                            Spécialité {champObligatoire()}
                                        </Label>
                                        <Input
                                            value={formData.specialite}
                                            onChange={(e) =>
                                                handleChange(
                                                    'specialite',
                                                    e.target.value,
                                                )
                                            }
                                            disabled={option == '2'}
                                        />
                                    </div>

                                    <div>
                                        <Label>Telephone</Label>
                                        <Input
                                            value={formData.telephone}
                                            onChange={(e) =>
                                                handleChange(
                                                    'telephone',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </Field>
                    </CardContent>

                    <Separator />

                    {/* Informations sur la fonction */}
                    <CardContent>
                        <Field className="w-full">
                            <FieldLabel>
                                Informations sur la fonction
                            </FieldLabel>

                            <div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div>
                                        <Label>
                                            Dernier diplôme {champObligatoire()}
                                        </Label>
                                        <Input
                                            value={formData.diplome}
                                            onChange={(e) =>
                                                handleChange(
                                                    'diplome',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label>grade{champObligatoire()}</Label>
                                        <Input
                                            type="number"
                                            value={formData.grade}
                                            onChange={(e) =>
                                                handleChange(
                                                    'grade',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label>
                                            Statut {champObligatoire()}
                                        </Label>
                                        <Input
                                            type="number"
                                            value={formData.statut}
                                            onChange={(e) =>
                                                handleChange(
                                                    'statut',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label>
                                            Année de prise de fonction{' '}
                                            {champObligatoire()}
                                        </Label>
                                        <Input
                                            type="number"
                                            value={
                                                formData.annee_prise_fonction
                                            }
                                            onChange={(e) =>
                                                handleChange(
                                                    'annee_prise_fonction',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label>Formation continue</Label>
                                        <Input
                                            type="number"
                                            value={formData.formation_continue}
                                            onChange={(e) =>
                                                handleChange(
                                                    'formation_continue',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label>
                                            Nombre d'heure de cours prévues / An
                                        </Label>
                                        <Input
                                            type="number"
                                            value={
                                                formData.nombre_heure_cours_prevue
                                            }
                                            onChange={(e) =>
                                                handleChange(
                                                    'nombre_heure_cours_prevue',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <Label>
                                            Nombre d'heure de cours réalisées /
                                            An
                                        </Label>
                                        <Input
                                            type="number"
                                            value={
                                                formData.nombre_heure_cours_realise
                                            }
                                            onChange={(e) =>
                                                handleChange(
                                                    'nombre_heure_cours_realise',
                                                    e.target.value,
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </Field>
                    </CardContent>
                </Card>

                {/* Navigation */}
                <div className="mt-4 flex justify-between">
                    <Button variant="outline">
                        <Link href="/professeur">Retour</Link>
                    </Button>

                    <Button disabled={!canRegister} onClick={handleSubmit}>
                        <CheckCircle />
                        Enregistrer
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}

export default Create;
