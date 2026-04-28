import {
    BookOpen,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Phone,
    User,
    Users,
} from 'lucide-react';
import { useState } from 'react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

import { EtudiantFormData } from '@/types';

export const emptyForm = (): EtudiantFormData => ({
    ip: '',
    civilite: 'M.',
    genre: 'Masculin',
    nom: '',
    prenom: '',
    date_naissance: '',
    lieu_naissance: '',
    nationnalite: 'Ivoirienne',
    statut: 'Affecté',
    email: null,
    pays_residence: "Côte d'Ivoire",
    etablissement_origine: null,
    annee_obtention_bac: null,
    serie_bac: null,
    numero_table_bac: null,
    contacts: null,
    nature_piece: null,
    numero_piece: null,
    adresse_geographique: null,
    matricule_secondaire: null,
    type_responsable: null,
    nom_responsable: null,
    numero_responsable: null,
    profession_responsable: null,
});

export type Civilite = 'M.' | 'Mme' | 'Mlle';
export type Genre = 'Masculin' | 'Féminin';
export type StatutEtudiant = 'Affecté' | 'Naff' | 'Réaffecté' | 'Transfert';
export type NaturePiece =
    | 'CNI'
    | 'Passeport'
    | 'Titre de séjour'
    | 'Carte consulaire';

// ── Config affichage statuts ──────────────────────────────────────────────────

export const statutConfig: Record<
    StatutEtudiant,
    { className: string; dotClass: string }
> = {
    Affecté: {
        className: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
        dotClass: 'bg-emerald-500',
    },
    Naff: {
        className: 'bg-rose-50 text-rose-700 border border-rose-200',
        dotClass: 'bg-rose-500',
    },
    Réaffecté: {
        className: 'bg-blue-50 text-blue-700 border border-blue-200',
        dotClass: 'bg-blue-500',
    },
    Transfert: {
        className: 'bg-amber-50 text-amber-700 border border-amber-200',
        dotClass: 'bg-amber-500',
    },
};

export const CIVILITES: Civilite[] = ['M.', 'Mme', 'Mlle'];
export const GENRES: Genre[] = ['Masculin', 'Féminin'];
export const STATUTS: StatutEtudiant[] = [
    'Affecté',
    'Naff',
    'Réaffecté',
    'Transfert',
];
export const SERIES_BAC = [
    'A1',
    'A2',
    'B',
    'C',
    'D',
    'E',
    'G1',
    'G2',
    'G3',
    'T1',
    'T2',
];
export const NATURES_PIECE: NaturePiece[] = [
    'CNI',
    'Passeport',
    'Titre de séjour',
    'Carte consulaire',
];
export const TYPES_RESPONSABLE = ['Père', 'Mère', 'Tuteur', 'Autre'];
export const NATIONALITES = [
    'Ivoirienne',
    'Burkinabè',
    'Malienne',
    'Guinéenne',
    'Sénégalaise',
    'Togolaise',
    'Béninoise',
    'Nigériane',
    'Ghanéenne',
    'Autre',
];
export const PAYS = [
    "Côte d'Ivoire",
    'Burkina Faso',
    'Mali',
    'Guinée',
    'Sénégal',
    'Togo',
    'Bénin',
    'Nigeria',
    'Ghana',
    'France',
    'Autre',
];

// ── Stepper ───────────────────────────────────────────────────────────────────

const STEPS = [
    {
        id: 1,
        label: 'Identité',
        description: 'Informations personnelles',
        icon: User,
    },
    {
        id: 2,
        label: 'Académique',
        description: 'Parcours scolaire',
        icon: BookOpen,
    },
    {
        id: 3,
        label: 'Contact',
        description: 'Coordonnées & pièce',
        icon: Phone,
    },
    {
        id: 4,
        label: 'Responsable',
        description: "Contact d'urgence",
        icon: Users,
    },
];

function Stepper({ current }: { current: number }) {
    return (
        <div className="mb-8 flex flex-wrap items-center justify-center gap-y-4">
            {STEPS.map((s, i) => {
                const done = current > s.id;
                const active = current === s.id;
                const Icon = s.icon;
                return (
                    <div key={s.id} className="flex items-center">
                        <div className="flex flex-col items-center gap-1.5">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${done ? 'bg-primary text-primary-foreground' : ''} ${active ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' : ''} ${!done && !active ? 'bg-muted text-muted-foreground' : ''} `}
                            >
                                {done ? (
                                    <CheckCircle2 className="h-5 w-5" />
                                ) : (
                                    <Icon className="h-4 w-4" />
                                )}
                            </div>
                            <div className="text-center">
                                <p
                                    className={`text-xs font-semibold ${active ? 'text-primary' : done ? 'text-foreground' : 'text-muted-foreground'}`}
                                >
                                    {s.label}
                                </p>
                            </div>
                        </div>
                        {i < STEPS.length - 1 && (
                            <div
                                className={`mx-2 mb-5 h-px w-12 transition-colors sm:w-20 ${current > s.id ? 'bg-primary' : 'bg-border'}`}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// ── Champs utilitaires ────────────────────────────────────────────────────────

function Field({
    label,
    required,
    children,
}: {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-1.5">
            <Label className="text-sm">
                {label}
                {required && <span className="ml-0.5 text-destructive">*</span>}
            </Label>
            {children}
        </div>
    );
}

type StrKey = keyof EtudiantFormData;

function TextInput({
    field,
    data,
    setData,
    placeholder,
    type = 'text',
    disabled,
}: {
    field: StrKey;
    data: EtudiantFormData;
    setData: (d: EtudiantFormData) => void;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
}) {
    return (
        <Input
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            value={(data[field] as string) ?? ''}
            onChange={(e) =>
                setData({ ...data, [field]: e.target.value || null })
            }
        />
    );
}

function SelectInput({
    field,
    data,
    setData,
    options,
    placeholder,
}: {
    field: StrKey;
    data: EtudiantFormData;
    setData: (d: EtudiantFormData) => void;
    options: string[];
    placeholder?: string;
}) {
    return (
        <Select
            value={(data[field] as string) ?? ''}
            onValueChange={(v) => setData({ ...data, [field]: v || null })}
        >
            <SelectTrigger>
                <SelectValue placeholder={placeholder ?? 'Sélectionner…'} />
            </SelectTrigger>
            <SelectContent>
                {options.map((o) => (
                    <SelectItem key={o} value={o}>
                        {o}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

// ── Étape 1 : Identité ────────────────────────────────────────────────────────

function Step1({
    data,
    setData,
    isEdit,
}: {
    data: EtudiantFormData;
    setData: (d: EtudiantFormData) => void;
    isEdit: boolean;
}) {
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <Field label="Civilité" required>
                    <SelectInput
                        field="civilite"
                        data={data}
                        setData={setData}
                        options={CIVILITES}
                    />
                </Field>
                <Field label="Genre" required>
                    <SelectInput
                        field="genre"
                        data={data}
                        setData={setData}
                        options={GENRES}
                    />
                </Field>
                <Field label="Statut" required>
                    <SelectInput
                        field="statut"
                        data={data}
                        setData={setData}
                        options={STATUTS}
                    />
                </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Nom" required>
                    <TextInput
                        field="nom"
                        data={data}
                        setData={setData}
                        placeholder="En majuscules"
                    />
                </Field>
                <Field label="Prénom" required>
                    <TextInput
                        field="prenom"
                        data={data}
                        setData={setData}
                        placeholder="Prénom(s)"
                    />
                </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Date de naissance" required>
                    <TextInput
                        field="date_naissance"
                        data={data}
                        setData={setData}
                        type="date"
                    />
                </Field>
                <Field label="Lieu de naissance" required>
                    <TextInput
                        field="lieu_naissance"
                        data={data}
                        setData={setData}
                        placeholder="Ville"
                    />
                </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Nationalité" required>
                    <SelectInput
                        field="nationnalite"
                        data={data}
                        setData={setData}
                        options={NATIONALITES}
                    />
                </Field>
                <Field label="Pays de résidence">
                    <SelectInput
                        field="pays_residence"
                        data={data}
                        setData={setData}
                        options={PAYS}
                        placeholder="Sélectionner un pays"
                    />
                </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="IP (identifiant permanent)" required>
                    <TextInput
                        field="ip"
                        data={data}
                        setData={setData}
                        placeholder="ETU-2024-XXX"
                        disabled={isEdit}
                    />
                    {isEdit && (
                        <p className="mt-1 text-xs text-muted-foreground">
                            L'identifiant permanent ne peut pas être modifié.
                        </p>
                    )}
                </Field>
                <Field label="Matricule secondaire">
                    <TextInput
                        field="matricule_secondaire"
                        data={data}
                        setData={setData}
                        placeholder="Optionnel"
                    />
                </Field>
            </div>
        </div>
    );
}

// ── Étape 2 : Académique ──────────────────────────────────────────────────────

function Step2({
    data,
    setData,
}: {
    data: EtudiantFormData;
    setData: (d: EtudiantFormData) => void;
}) {
    return (
        <div className="space-y-5">
            <Field label="Établissement d'origine">
                <TextInput
                    field="etablissement_origine"
                    data={data}
                    setData={setData}
                    placeholder="Lycée / École de provenance"
                />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field label="Série du BAC">
                    <SelectInput
                        field="serie_bac"
                        data={data}
                        setData={setData}
                        options={SERIES_BAC}
                        placeholder="Série"
                    />
                </Field>
                <Field label="Année d'obtention">
                    <TextInput
                        field="annee_obtention_bac"
                        data={data}
                        setData={setData}
                        placeholder="Ex : 2022"
                        type="number"
                    />
                </Field>
                <Field label="N° de table BAC">
                    <TextInput
                        field="numero_table_bac"
                        data={data}
                        setData={setData}
                        placeholder="Ex : 22-0123-A"
                    />
                </Field>
            </div>

            <Alert className="border-muted bg-muted/40">
                <BookOpen className="h-4 w-4" />
                <AlertDescription className="text-sm text-muted-foreground">
                    Ces informations servent à vérifier l'authenticité du
                    diplôme et à valider l'admission.
                </AlertDescription>
            </Alert>
        </div>
    );
}

// ── Étape 3 : Contact & Pièce ─────────────────────────────────────────────────

function Step3({
    data,
    setData,
}: {
    data: EtudiantFormData;
    setData: (d: EtudiantFormData) => void;
}) {
    return (
        <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Email">
                    <TextInput
                        field="email"
                        data={data}
                        setData={setData}
                        placeholder="etudiant@example.com"
                        type="email"
                    />
                </Field>
                <Field label="Contacts (téléphone)">
                    <TextInput
                        field="contacts"
                        data={data}
                        setData={setData}
                        placeholder="+225 07 XX XX XX"
                    />
                </Field>
            </div>

            <Field label="Adresse géographique">
                <TextInput
                    field="adresse_geographique"
                    data={data}
                    setData={setData}
                    placeholder="Quartier, Ville"
                />
            </Field>

            <Separator />

            <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                Pièce d'identité
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Nature de la pièce">
                    <SelectInput
                        field="nature_piece"
                        data={data}
                        setData={setData}
                        options={NATURES_PIECE}
                        placeholder="Type de pièce"
                    />
                </Field>
                <Field label="Numéro de la pièce">
                    <TextInput
                        field="numero_piece"
                        data={data}
                        setData={setData}
                        placeholder="Ex : CI-24-XXXXXXX"
                    />
                </Field>
            </div>
        </div>
    );
}

// ── Étape 4 : Responsable ─────────────────────────────────────────────────────

function Step4({
    data,
    setData,
}: {
    data: EtudiantFormData;
    setData: (d: EtudiantFormData) => void;
}) {
    return (
        <div className="space-y-5">
            <Alert className="border-muted bg-muted/40">
                <Users className="h-4 w-4" />
                <AlertDescription className="text-sm text-muted-foreground">
                    Ces informations sont optionnelles mais recommandées pour le
                    contact d'urgence.
                </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Type de responsable">
                    <SelectInput
                        field="type_responsable"
                        data={data}
                        setData={setData}
                        options={TYPES_RESPONSABLE}
                        placeholder="Père / Mère / Tuteur…"
                    />
                </Field>
                <Field label="Nom du responsable">
                    <TextInput
                        field="nom_responsable"
                        data={data}
                        setData={setData}
                        placeholder="Nom et prénom"
                    />
                </Field>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Numéro du responsable">
                    <TextInput
                        field="numero_responsable"
                        data={data}
                        setData={setData}
                        placeholder="+225 07 XX XX XX"
                    />
                </Field>
                <Field label="Profession du responsable">
                    <TextInput
                        field="profession_responsable"
                        data={data}
                        setData={setData}
                        placeholder="Ex : Ingénieur"
                    />
                </Field>
            </div>
        </div>
    );
}

// ── Composant principal ───────────────────────────────────────────────────────

interface EtudiantFormProps {
    initialData?: EtudiantFormData;
    isEdit?: boolean;
    onSubmit: (data: EtudiantFormData) => void;
    onCancel: () => void;
    isLoading: boolean;
}

export function EtudiantForm({
    initialData,
    isEdit = false,
    onSubmit,
    onCancel,
    isLoading,
}: EtudiantFormProps) {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<EtudiantFormData>(
        initialData ?? emptyForm(),
    );

    const canNext = () => {
        // Verifie si les champs obligatoire de step 1 sont remplir , envoi true sinon false
        // !! (...) renvoie true si la condition est verifie sinon false
        if (step === 1)
            return !!(
                data.ip &&
                data.nom &&
                data.prenom &&
                data.date_naissance &&
                data.lieu_naissance
            );
        return true;
    };

    const stepTitles: Record<number, { title: string; description: string }> = {
        1: {
            title: "Informations d'identité",
            description:
                "Renseignez les informations personnelles de l'étudiant.",
        },
        2: {
            title: 'Parcours académique',
            description:
                "Informations sur le baccalauréat et l'établissement d'origine.",
        },
        3: {
            title: "Coordonnées & pièce d'identité",
            description: "Contact, adresse et document d'identité.",
        },
        4: {
            title: 'Responsable légal',
            description: "Personne à contacter en cas d'urgence.",
        },
    };

    return (
        <div className="space-y-4">
            <Stepper current={step} />

            <Card className="shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-base">
                        {stepTitles[step].title}
                    </CardTitle>
                    <CardDescription>
                        {stepTitles[step].description}
                    </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="pt-5">
                    {step === 1 && (
                        <Step1 data={data} setData={setData} isEdit={isEdit} />
                    )}
                    {step === 2 && <Step2 data={data} setData={setData} />}
                    {step === 3 && <Step3 data={data} setData={setData} />}
                    {step === 4 && <Step4 data={data} setData={setData} />}
                </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
                <Button
                    variant="outline"
                    onClick={() =>
                        step === 1 ? onCancel() : setStep((s) => s - 1)
                    }
                >
                    {step === 1 ? (
                        'Annuler'
                    ) : (
                        <>
                            <ChevronLeft className="mr-1 h-4 w-4" /> Précédent
                        </>
                    )}
                </Button>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                        Étape {step} / {STEPS.length}
                    </span>
                    <Button
                        onClick={() =>
                            step < STEPS.length
                                ? setStep((s) => s + 1)
                                : onSubmit(data)
                        }
                        disabled={!canNext()}
                    >
                        {step < STEPS.length ? (
                            <>
                                Suivant{' '}
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="mr-1.5 h-4 w-4" />
                                {isEdit
                                    ? 'Enregistrer les modifications'
                                    : "Créer l'étudiant"}
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
