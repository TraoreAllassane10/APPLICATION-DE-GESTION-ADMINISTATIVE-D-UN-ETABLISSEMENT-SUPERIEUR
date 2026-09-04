import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    BookOpen,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    LucideProps,
    Phone,
    User,
    Users,
} from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes, useState } from 'react';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';
import Stepper from './steps/Stepper';
import { EtudiantFormData } from '../types/etudiant.types';

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
    photo: null
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

export interface Step {
    id: number;
    label: string;
    description: string;
    icon: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >;
}

const STEPS: Step[] = [
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
            <Stepper current={step} steps={STEPS} />

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
                        disabled={!canNext() && isLoading}
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
