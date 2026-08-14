import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
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
import {
    ProfesseurUpdateData,
    updateProfesseurSchema,
} from '@/features/professeur/validations/updateProfesseurSchema';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { champObligatoire } from './Create';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Professeur',
        href: '/professeur',
    },
    {
        title: 'Modification',
        href: '/edit',
    },
];

interface ProfesseurProps {
    professeur: Professeur;
    [key: string]: unknown;
}

const Edit = () => {
    const { professeur } = usePage<ProfesseurProps>().props;
    console.log(professeur);

    // Gestion du formulaire
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<ProfesseurUpdateData>({
        resolver: zodResolver(updateProfesseurSchema),
        defaultValues: {
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

    useEffect(() => {
        setValue('matricule', professeur.matricule);
        setValue('nom_prenom', professeur.nom_prenom);
        setValue('sexe', professeur.sexe as 'M' | 'F');
        setValue('date_naissance', professeur.date_naissance);
        setValue('pays', professeur.pays);
        setValue('specialite', professeur.specialite);
        setValue('telephone', professeur.telephone);
        setValue('diplome', professeur.annee_academiques[0].pivot.diplome);
        setValue(
            'grade',
            professeur.annee_academiques[0].pivot.grade.toString(),
        );
        setValue(
            'statut',
            professeur.annee_academiques[0].pivot.statut.toString(),
        );
        setValue(
            'annee_prise_fonction',
            String(
                professeur.annee_academiques[0].pivot.annee_prise_fonction.toString(),
            ),
        );
        setValue(
            'formation_continue',
            professeur.annee_academiques[0].pivot.formation_continue.toString(),
        );
        setValue(
            'nombre_heure_cours_prevue',
            professeur.annee_academiques[0].pivot.nombre_heure_cours_prevue.toString(),
        );
        setValue(
            'nombre_heure_cours_realise',
            professeur.annee_academiques[0].pivot.nombre_heure_cours_realise.toString(),
        );
    });

    const { updateProfesseur } = useProfesseur();

    // Creation d'un enseignant
    const onSubmit = async (data: ProfesseurUpdateData) => {
        await updateProfesseur(professeur.id.toString(), {
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
        });
    };
    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <div className="p-6">
                    {/* Entête de la page */}
                    <div className="mb-6">
                        <Link
                            href="/professeur"
                            className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" /> Retour aux
                            enseignants
                        </Link>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Modification des données de l'enseignant
                        </h1>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            Remplissez les informations pour la modification.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Card className="shadow-sm">
                            <CardHeader className="pb-4">
                                <CardTitle>
                                    Information de l'enseignant
                                </CardTitle>
                                <CardDescription>
                                    Renseigner les informations personnelle de
                                    l'enseignant
                                </CardDescription>
                            </CardHeader>

                            <Separator />

                            {/* Informations Indentitaire */}
                            <CardContent>
                                <Field className="w-full">
                                    <FieldLabel>
                                        Informations sur l'identité
                                    </FieldLabel>

                                    <div>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                            <div>
                                                <Label>
                                                    Matricule{' '}
                                                    {champObligatoire()}
                                                </Label>
                                                <Input
                                                    {...register('matricule')}
                                                />
                                                {errors.matricule && (
                                                    <span className="mt-0.5 text-sm text-destructive">
                                                        {
                                                            errors.matricule
                                                                .message
                                                        }
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
                                                />
                                                {errors.nom_prenom && (
                                                    <span className="mt-0.5 text-sm text-destructive">
                                                        {
                                                            errors.nom_prenom
                                                                .message
                                                        }
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
                                                            onValueChange={
                                                                field.onChange
                                                            }
                                                            value={field.value}
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
                                                    {...register(
                                                        'date_naissance',
                                                    )}
                                                />
                                                {errors.date_naissance && (
                                                    <span className="mt-0.5 text-sm text-destructive">
                                                        {
                                                            errors
                                                                .date_naissance
                                                                .message
                                                        }
                                                    </span>
                                                )}
                                            </div>

                                            <div>
                                                <Label>
                                                    Pays {champObligatoire()}
                                                </Label>
                                                <Input {...register('pays')} />
                                                {errors.pays && (
                                                    <span className="mt-0.5 text-sm text-destructive">
                                                        {errors.pays.message}
                                                    </span>
                                                )}
                                            </div>

                                            <div>
                                                <Label>
                                                    Spécialité{' '}
                                                    {champObligatoire()}
                                                </Label>
                                                <Input
                                                    {...register('specialite')}
                                                />
                                                {errors.specialite && (
                                                    <span className="mt-0.5 text-sm text-destructive">
                                                        {
                                                            errors.specialite
                                                                .message
                                                        }
                                                    </span>
                                                )}
                                            </div>

                                            <div>
                                                <Label>Telephone</Label>
                                                <Input
                                                    {...register('telephone')}
                                                />
                                                {errors.telephone && (
                                                    <span className="mt-0.5 text-sm text-destructive">
                                                        {
                                                            errors.telephone
                                                                .message
                                                        }
                                                    </span>
                                                )}
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
                                                    Dernier diplôme{' '}
                                                    {champObligatoire()}
                                                </Label>
                                                <Input
                                                    type="text"
                                                    {...register('diplome')}
                                                />
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
                                                <Label>
                                                    Formation continue
                                                </Label>
                                                <Input
                                                    type="number"
                                                    {...register(
                                                        'formation_continue',
                                                    )}
                                                />
                                                {errors.formation_continue && (
                                                    <span className="mt-0.5 text-sm text-destructive">
                                                        {
                                                            errors
                                                                .formation_continue
                                                                .message
                                                        }
                                                    </span>
                                                )}
                                            </div>

                                            <div>
                                                <Label>
                                                    Nombre d'heure de cours
                                                    prévues / An
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
                                                    Nombre d'heure de cours
                                                    réalisées / An
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

                        {/* Boutons */}
                        <div className="mt-4 flex justify-between">
                            <Button variant="outline">
                                <Link href="/professeur">Retour</Link>
                            </Button>

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="transition duration-300 hover:bg-red-800"
                            >
                                <CheckCircle />
                                {isSubmitting ? 'Modification...' : 'Modifier'}
                            </Button>
                        </div>
                    </form>
                </div>
            </AppLayout>
        </div>
    );
};

export default Edit;
