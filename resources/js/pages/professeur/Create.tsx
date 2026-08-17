import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import useProfesseur from '@/features/professeur/hooks/useProfesseur';
import { Professeur } from '@/features/professeur/types/professeur.types';
import {
    createProfesseurSchema,
    ProfesseurData,
} from '@/features/professeur/validations/createProfesseurSchema';
import AppLayout from '@/layouts/app-layout';
import { Cours, DataNiveau } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export function champObligatoire() {
    return <span className="ml-1 text-red-500">*</span>;
}

interface ProfesseurProps {
    professeurs: Professeur[];
    cours: Cours[];
    niveaux: DataNiveau[];
    [key: string]: unknown;
}

function Create() {
    const { professeurs, cours } = usePage<ProfesseurProps>().props;

    // const [option, setOption] = useState('1');
    const [disciplines, setDisciplines] = useState<string[]>([]);

    // Gestion du formulaire
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProfesseurData>({
        resolver: zodResolver(createProfesseurSchema),
        defaultValues: {
            option: '1',
            matricule: '',
            nom_prenom: '',
            sexe: 'M',
            date_naissance: '',
            pays: '',
            specialite: '',
            telephone: '',
            diplome: '',
            grade: '',
            statut: '',
            annee_prise_fonction: new Date().getFullYear().toString(), // ou 0
            formation_continue: '',
            nombre_heure_cours_prevue: '',
            nombre_heure_cours_realise: '',
        },
    });

    // Surveille le Option choisir
    const selectOption = watch('option');

    const { createProfesseur } = useProfesseur();

    // Creation d'un enseignant
    const onSubmit = async (data: ProfesseurData) => {
        await createProfesseur({
            option: Number(data.option),
            matricule: data.matricule,
            nom_prenom: data.nom_prenom,
            sexe: data.sexe,
            date_naissance: data.date_naissance,
            pays: data.pays,
            specialite: data.specialite,
            telephone: data.telephone,
            diplome: data.diplome,
            grade: Number(data.grade),
            statut: Number(data.statut),
            annee_prise_fonction: Number(data.annee_prise_fonction),
            formation_continue: Number(data.formation_continue),
            nombre_heure_cours_prevue: Number(data.nombre_heure_cours_prevue),
            nombre_heure_cours_realise: Number(data.nombre_heure_cours_realise),
            cours_enseignes: disciplines,
        });
    };

    //
    const handleSelectEnseignant = (v: any) => {
        const enseignantSelectionne = professeurs.find(
            (value) => value.id == Number(v),
        );

        if (enseignantSelectionne) {
            setValue('matricule', enseignantSelectionne.matricule);
            setValue('nom_prenom', enseignantSelectionne.nom_prenom);
            setValue('sexe', enseignantSelectionne.sexe as any);
            setValue('date_naissance', enseignantSelectionne.date_naissance);
            setValue('pays', enseignantSelectionne.pays);
            setValue('specialite', enseignantSelectionne.specialite);
            setValue('telephone', enseignantSelectionne.telephone || '');
        }
    };

    return (
        <AppLayout>
            <Head title="Enseignant" />

            <div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6 p-6"
                >
                    <div>
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
                            Remplissez les informations pour enregistrer un
                            nouvel enseignant.
                        </p>
                    </div>

                    <Card className="shadow-sm">
                        {/* Option d'enregistrement */}
                        <CardContent className="pb-4">
                            <FieldSet className="w-full max-w-xs">
                                <FieldLegend variant="label">
                                    Mode d'enregistrement
                                </FieldLegend>
                                <FieldDescription>
                                    Choisissez une option d'enregistrement.
                                </FieldDescription>

                                <Controller
                                    name="option"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            defaultValue={field.value.toString()}
                                            onValueChange={field.onChange}
                                            className="mt-4"
                                        >
                                            <div className="flex flex-row items-center gap-3">
                                                <RadioGroupItem
                                                    value="1"
                                                    id="nouvel"
                                                />
                                                <Label htmlFor="nouvel">
                                                    Nouvel enseignant
                                                </Label>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <RadioGroupItem
                                                    value="2"
                                                    id="existant"
                                                />
                                                <Label htmlFor="existant">
                                                    Enseignant existant
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    )}
                                />
                            </FieldSet>
                        </CardContent>
                    </Card>

                    {/* Choix de l'enseignement existant */}
                    <Card>
                        <CardContent>
                            <Field className="w-full">
                                <FieldLabel className="text-xl">
                                    Enseignant
                                </FieldLabel>
                                <Select
                                    disabled={selectOption == '1'}
                                    onValueChange={(v) =>
                                        handleSelectEnseignant(v)
                                    }
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
                    </Card>

                    {/* Informations Indentitaire */}
                    <Card>
                        <CardContent>
                            <Field className="w-full">
                                <FieldLabel className="mb-2 text-xl">
                                    Informations sur l'identité
                                </FieldLabel>

                                <div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                        <div>
                                            <Label>
                                                Matricule {champObligatoire()}
                                            </Label>
                                            <Input
                                                {...register('matricule')}
                                                disabled={selectOption == '2'}
                                            />
                                            {errors.matricule && (
                                                <span className="mt-0.5 text-sm text-destructive">
                                                    {errors.matricule.message}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <Label>
                                                Nom et Prenom{' '}
                                                {champObligatoire()}
                                            </Label>
                                            <Input
                                                {...register('nom_prenom')}
                                                disabled={selectOption == '2'}
                                            />
                                            {errors.nom_prenom && (
                                                <span className="mt-0.5 text-sm text-destructive">
                                                    {errors.nom_prenom.message}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <Label>
                                                Sexe {champObligatoire()}
                                            </Label>

                                            <Controller
                                                name="sexe"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                        disabled={
                                                            selectOption == '2'
                                                        }
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
                                                )}
                                            />
                                            {errors.sexe && (
                                                <span className="mt-0.5 text-sm text-destructive">
                                                    {errors.sexe.message}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <Label>
                                                Date de naissance{' '}
                                                {champObligatoire()}
                                            </Label>
                                            <Input
                                                type="date"
                                                {...register('date_naissance')}
                                                disabled={selectOption == '2'}
                                            />
                                            {errors.date_naissance && (
                                                <span className="mt-0.5 text-sm text-destructive">
                                                    {
                                                        errors.date_naissance
                                                            .message
                                                    }
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <Label>
                                                Pays {champObligatoire()}
                                            </Label>
                                            <Input
                                                {...register('pays')}
                                                disabled={selectOption == '2'}
                                            />
                                            {errors.pays && (
                                                <span className="mt-0.5 text-sm text-destructive">
                                                    {errors.pays.message}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <Label>
                                                Spécialité {champObligatoire()}
                                            </Label>
                                            <Input
                                                {...register('specialite')}
                                                disabled={selectOption == '2'}
                                            />
                                            {errors.specialite && (
                                                <span className="mt-0.5 text-sm text-destructive">
                                                    {errors.specialite.message}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <Label>Telephone</Label>
                                            <Input {...register('telephone')} />
                                            {errors.telephone && (
                                                <span className="mt-0.5 text-sm text-destructive">
                                                    {errors.telephone.message}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Field>
                        </CardContent>
                    </Card>

                    {/* Informations sur la fonction */}
                    <Card>
                        <CardContent>
                            <Field className="w-full">
                                <FieldLabel className="mb-2 text-xl">
                                    Informations sur la fonction
                                </FieldLabel>

                                <div>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                        <div>
                                            <Label>
                                                Dernier diplôme{' '}
                                                {champObligatoire()}
                                            </Label>
                                            <Input {...register('diplome')} />
                                            {errors.diplome && (
                                                <span className="mt-0.5 text-sm text-destructive">
                                                    {errors.diplome.message}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <Label>
                                                grade{champObligatoire()}
                                            </Label>
                                            <Input
                                                type="number"
                                                {...register('grade')}
                                            />
                                            {errors.grade && (
                                                <span className="mt-0.5 text-sm text-destructive">
                                                    {errors.grade.message}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <Label>
                                                Statut {champObligatoire()}
                                            </Label>
                                            <Input
                                                type="number"
                                                {...register('statut')}
                                            />
                                            {errors.statut && (
                                                <span className="mt-0.5 text-sm text-destructive">
                                                    {errors.statut.message}
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <Label>
                                                Année de prise de fonction{' '}
                                                {champObligatoire()}
                                            </Label>
                                            <Input
                                                type="number"
                                                {...register(
                                                    'annee_prise_fonction',
                                                )}
                                            />
                                            {errors.annee_prise_fonction && (
                                                <span className="mt-0.5 text-sm text-destructive">
                                                    {
                                                        errors
                                                            .annee_prise_fonction
                                                            .message
                                                    }
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <Label>Formation continue</Label>
                                            <Input
                                                type="number"
                                                {...register(
                                                    'formation_continue',
                                                )}
                                            />
                                        </div>

                                        <div>
                                            <Label>
                                                Nombre d'heure de cours prévue /
                                                An
                                            </Label>
                                            <Input
                                                type="number"
                                                {...register(
                                                    'nombre_heure_cours_prevue',
                                                )}
                                            />
                                            {errors.nombre_heure_cours_prevue && (
                                                <span className="mt-0.5 text-sm text-destructive">
                                                    {
                                                        errors
                                                            .nombre_heure_cours_prevue
                                                            .message
                                                    }
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <Label>
                                                Nombre d'heure de cours réalisés
                                                / An
                                            </Label>
                                            <Input
                                                type="number"
                                                {...register(
                                                    'nombre_heure_cours_realise',
                                                )}
                                            />
                                            {errors.nombre_heure_cours_realise && (
                                                <span className="mt-0.5 text-sm text-destructive">
                                                    {
                                                        errors
                                                            .nombre_heure_cours_realise
                                                            .message
                                                    }
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Field>
                        </CardContent>
                    </Card>

                    {/* Discipline enseignées */}
                    <Card>
                        <CardContent>
                            <Field className="w-full">
                                <FieldLabel className="mb-2 text-xl">
                                    Disciplines enseignées
                                </FieldLabel>

                                <div className="grid grid-cols-2 gap-4">
                                    <Combobox
                                        items={cours}
                                        multiple
                                        value={disciplines}
                                        onValueChange={setDisciplines}
                                    >
                                        <ComboboxChips>
                                            <ComboboxValue>
                                                {disciplines.map((id) => {
                                                    const coursTrouve =
                                                        cours.find(
                                                            (cours) =>
                                                                String(
                                                                    cours.id,
                                                                ) ===
                                                                String(id),
                                                        );

                                                    return (
                                                        <ComboboxChip key={id}>
                                                            {coursTrouve
                                                                ? coursTrouve.nom
                                                                : id}
                                                        </ComboboxChip>
                                                    );
                                                })}
                                            </ComboboxValue>
                                            <ComboboxChipsInput placeholder="Selectionner les disciplines" />
                                        </ComboboxChips>
                                        <ComboboxContent>
                                            <ComboboxEmpty>
                                                Aucune discipline trouvée.
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
                            </Field>
                        </CardContent>
                    </Card>

                    {/* Navigation */}
                    <div className="mt-4 flex justify-between">
                        <Button variant="outline">
                            <Link href="/professeur">Retour</Link>
                        </Button>

                        <Button
                            type="submit"
                            className="transition hover:bg-red-800"
                        >
                            <CheckCircle />
                            Enregistrer
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}

export default Create;
