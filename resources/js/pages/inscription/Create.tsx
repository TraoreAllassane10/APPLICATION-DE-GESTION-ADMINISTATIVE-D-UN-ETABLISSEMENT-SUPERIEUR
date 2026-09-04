import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, ChevronRight } from 'lucide-react';
import { useState } from 'react';
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
import StepEtudiant from '@/features/inscription/components/steps/StepEtudiant';
import StepFinancier from '@/features/inscription/components/steps/StepFinancier';
import Stepper from '@/features/inscription/components/steps/Stepper';
import useInscription from '@/features/inscription/hooks/useInscription';
import { Etudiant } from '@/features/etudiant/types/etudiant.types';
import { TypeInscription } from '@/features/inscription/types/inscription.types';

interface CreateInscriptionProps {
    etudiants: Etudiant[];
    [Key: string]: any;
}

export default function Create() {
    const { etudiants } = usePage<CreateInscriptionProps>().props;

    const [step, setStep] = useState(1);
    const [etudiant, setEtudiant] = useState<Etudiant | null>(null);
    const [annee, setAnnee] = useState('');
    const [niveau, setNiveau] = useState([]);
    const [typeInscription, setTypeInscription] =
        useState<TypeInscription>('Nouvelle');
    const [taux_reduction, setTauxReduction] = useState(0);

    const canNext = () => {
        if (step === 1) return !!etudiant;
        if (step === 2) return !!annee && !!niveau;
        return true;
    };

    const { createEtudiant } = useInscription();

    const handleSubmit = async () => {
        await createEtudiant({
            etudiant_ip: etudiant?.ip,
            annee_id: annee,
            niveaux: niveau,
            type_inscription: typeInscription,
            taux_reduction: Number(taux_reduction),
        });
    };

    return (
        <AppLayout>
            <Head title="Nouvelle inscription" />

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
                        Nouvelle inscription
                    </h1>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                        Suivez les étapes pour inscrire un étudiant.
                    </p>
                </div>

                <Stepper currentStep={step} />

                {/* Contenu de l'étape */}
                <Card className="mb-4 shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-base">
                            {step === 1 && 'Sélectionner un étudiant'}
                            {step === 2 && 'Informations académiques'}
                            {step === 3 && 'Paramètres financiers'}
                        </CardTitle>
                        <CardDescription>
                            {step === 1 &&
                                "Recherchez et sélectionnez l'étudiant à inscrire."}
                            {step === 2 &&
                                'Renseignez les informations académiques pour cette inscription.'}
                            {step === 3 &&
                                'Vérifiez les paramètres financiers calculés automatiquement.'}
                        </CardDescription>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-5">
                        {step === 1 && (
                            <StepEtudiant
                                etudiants={etudiants}
                                selected={etudiant}
                                onSelect={setEtudiant}
                            />
                        )}
                        {step === 2 && etudiant && (
                            <StepAcademique
                                annee={annee}
                                niveau={niveau}
                                typeInscription={typeInscription}
                                setAnnee={setAnnee}
                                setNiveau={setNiveau}
                                setTypeInscription={setTypeInscription}
                            />
                        )}
                        {step === 3 && etudiant && (
                            <StepFinancier
                                taux_reduction={taux_reduction}
                                setTauxReduction={setTauxReduction}
                                niveau={niveau}
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
                            step < 3 ? setStep((s) => s + 1) : handleSubmit()
                        }
                        disabled={!canNext()}
                    >
                        {step < 3 ? (
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
}
