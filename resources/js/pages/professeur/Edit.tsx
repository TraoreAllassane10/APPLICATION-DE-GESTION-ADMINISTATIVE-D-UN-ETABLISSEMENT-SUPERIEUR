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
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { champObligatoire } from './Create';
import { Professeur } from '@/features/professeur/types/professeur.types';

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

    const [formData, setFormData] = useState({
        matricule: professeur.matricule,
        nom_prenom: professeur.nom_prenom,
        sexe: professeur.sexe,
        date_naissance: professeur.date_naissance,
        pays: professeur.pays,
        specialite: professeur.specialite,
        telephone: professeur.telephone,
        diplome: professeur.annee_academiques[0].pivot.diplome,
        grade: professeur.annee_academiques[0].pivot.grade,
        statut: professeur.annee_academiques[0].pivot.statut,
        annee_prise_fonction:
            professeur.annee_academiques[0].pivot.annee_prise_fonction,
        formation_continue:
            professeur.annee_academiques[0].pivot.formation_continue,
        nombre_heure_cours_prevue:
            professeur.annee_academiques[0].pivot.nombre_heure_cours_prevue,
        nombre_heure_cours_realise:
            professeur.annee_academiques[0].pivot.nombre_heure_cours_realise,
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

    const { updateProfesseur } = useProfesseur();

    // Creation d'un enseignant
    const handleSubmit = () => {
        if (!canRegister) {
            toast.error('Veuillez renseigner les informations importantes');
            return;
        }

        const data = {
            option: Number(0),
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

        updateProfesseur(professeur.id.toString() ,data);
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

                    <Card className="shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle>Information de l'enseignant</CardTitle>
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
                                            />
                                        </div>

                                        <div>
                                            <Label>
                                                Nom et Prenom{' '}
                                                {champObligatoire()}
                                            </Label>
                                            <Input
                                                value={formData.nom_prenom}
                                                onChange={(e) =>
                                                    handleChange(
                                                        'nom_prenom',
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>

                                        <div>
                                            <Label>
                                                Sexe {champObligatoire()}
                                            </Label>
                                            <Select
                                                value={formData.sexe}
                                                onValueChange={(v) =>
                                                    handleChange('sexe', v)
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
                                            />
                                        </div>

                                        <div>
                                            <Label>
                                                Pays {champObligatoire()}
                                            </Label>
                                            <Input
                                                value={formData.pays}
                                                onChange={(e) =>
                                                    handleChange(
                                                        'pays',
                                                        e.target.value,
                                                    )
                                                }
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
                                                Dernier diplôme{' '}
                                                {champObligatoire()}
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
                                            <Label>
                                                grade{champObligatoire()}
                                            </Label>
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
                                                value={
                                                    formData.formation_continue
                                                }
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
                                                Nombre d'heure de cours prévues
                                                / An
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
                                                Nombre d'heure de cours
                                                réalisées / An
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

                    {/* Boutons */}
                    <div className="mt-4 flex justify-between">
                        <Button variant="outline">
                            <Link href="/professeur">Retour</Link>
                        </Button>

                        <Button
                            disabled={!canRegister}
                            onClick={handleSubmit}
                            className="transition duration-300 hover:bg-red-800"
                        >
                            <CheckCircle />
                            Modifier
                        </Button>
                    </div>
                </div>
            </AppLayout>
        </div>
    );
};

export default Edit;
