import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import StepAcademique from '@/features/inscription/components/steps/StepAcademique';
import StepFinancier from '@/features/inscription/components/steps/StepFinancier';
import useInscription from '@/features/inscription/hooks/useInscription';
import {
    Inscription,
    TypeInscription,
} from '@/features/inscription/types/inscription.types';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    ArrowLeft,
    BookOpen,
    CheckCircle2,
    ChevronRight,
    Wallet,
} from 'lucide-react';
import { useState } from 'react';

interface EditInscriptionProps {
    inscription: Inscription;
    [Key: string]: any;
}

export const STEPS = [
    {
        id: 1,
        label: 'Académique',
        description: 'Informations académiques',
        icon: BookOpen,
    },
    {
        id: 2,
        label: 'Financier',
        description: 'Paramètres financiers',
        icon: Wallet,
    },
];

const Edit = () => {
    const { inscription } = usePage<EditInscriptionProps>().props;

    const niveauxEtudiant = inscription.niveaux.map((nv) => nv.id);

    const [step, setStep] = useState(1);
    const [annee, setAnnee] = useState(inscription.annee.id);
    const [niveau, setNiveau] = useState(niveauxEtudiant);
    const [typeInscription, setTypeInscription] = useState<TypeInscription>(
        inscription.type_inscription,
    );
    // Chaînes pour pouvoir gérer l'état vide ("") qui déverrouille l'autre champ
    const [taux_reduction, setTauxReduction] = useState(
        inscription.taux_reduction === 0
            ? ''
            : String(inscription.taux_reduction),
    );
    const [montant_reduction, setMontantReduction] = useState(
        inscription.montant_reduction === null
            ? ''
            : String(inscription.montant_reduction),
    );

    const canNext = () => {
        if (step === 1) return !!annee && !!niveau;
        return true;
    };

    const { updateInscription, isLoading } = useInscription();

    const handleSubmit = async () => {
        updateInscription(inscription.id, {
            annee_id: String(annee),
            niveaux: niveau,
            type_inscription: typeInscription,
            // Envoie null si le champ est vide (aucune réduction saisie)
            taux_reduction:
                taux_reduction !== '' ? Number(taux_reduction) : null,
            montant_reduction:
                montant_reduction !== '' ? Number(montant_reduction) : null,
        });
    };

    return (
        <AppLayout>
            <Head title="Modification d'inscription" />

            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href="/inscriptions"
                        className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" /> Retour aux
                        inscriptions
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Modification d'une inscription
                    </h1>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                        Suivez les étapes pour modifier l'inscription.
                    </p>
                </div>

                <div className="mb-8 flex items-center justify-center">
                    {STEPS.map((currentStep, idx) => {
                        const done = step > currentStep.id;
                        const active = step === currentStep.id;
                        const Icon = currentStep.icon;

                        return (
                            <div
                                key={currentStep.id}
                                className="flex items-center"
                            >
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
                                            {currentStep.label}
                                        </p>
                                        <p className="hidden text-[10px] text-muted-foreground sm:block">
                                            {currentStep.description}
                                        </p>
                                    </div>
                                </div>
                                {idx < STEPS.length - 1 && (
                                    <div
                                        className={`mx-3 mb-5 h-px w-16 transition-colors sm:w-24 ${step > currentStep.id ? 'bg-primary' : 'bg-border'}`}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Contenu de l'étape */}
                <Card className="mb-4 shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-base">
                            {step === 1 && 'Informations académiques'}
                            {step === 2 && 'Paramètres financiers'}
                        </CardTitle>
                        <CardDescription>
                            {step === 1 &&
                                'Renseignez les informations académiques pour cette inscription.'}
                            {step === 2 &&
                                'Vérifiez les paramètres financiers calculés automatiquement.'}
                        </CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-5">
                        {step === 1 && (
                            <StepAcademique
                                annee={annee as any}
                                niveau={niveau as any}
                                typeInscription={typeInscription}
                                setAnnee={setAnnee as any}
                                setNiveau={setNiveau}
                                setTypeInscription={setTypeInscription}
                            />
                        )}
                        {step === 2 && (
                            <StepFinancier
                                taux_reduction={taux_reduction}
                                montant_reduction={montant_reduction}
                                onTauxReduction={setTauxReduction}
                                onMontantReduction={setMontantReduction}
                            />
                        )}
                    </CardContent>
                </Card>

                {/* Navigation */}
                <div className="flex justify-between">
                    <Button
                        variant="outline"
                        onClick={() =>
                            step === 1
                                ? router.visit('/inscriptions')
                                : setStep((s) => s - 1)
                        }
                    >
                        {step === 1 ? (
                            'Annuler'
                        ) : (
                            <>
                                <ArrowLeft className="mr-1.5 h-4 w-4" />{' '}
                                Précédent
                            </>
                        )}
                    </Button>

                    <Button
                        onClick={() =>
                            step < 2 ? setStep((s) => s + 1) : handleSubmit()
                        }
                        disabled={!canNext() || isLoading}
                    >
                        {step < 2 ? (
                            <>
                                Suivant{' '}
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="mr-1.5 h-4 w-4" />{' '}
                                Confirmer l'inscription
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
};

export default Edit;
