import { CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
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

import { PersonnelFormData } from '@/types';
import { Stepper, STEPS } from './Stepper';
import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';
import { Step3 } from './steps/Step3';
import { Step4 } from './steps/Step4';

export const emptyForm = (): PersonnelFormData => ({
    id: '',
    nom: '',
    prenom: '',
    genre: '',
    date_naissance: '',
    lieu_naissance: '',
    nationalite: '',
    matricule: '',
    fonction: '',
    situation_matrimoniale: '',
    nombre_enfant: '',
    nombre_enfant_charge: '',
    telephone: '',
    email: '',
    bp: '',
    rib: '',
    proprietaire: false,
    nom_entreprise: '',
    numero_registre_commerce: '',

    formations: [],
    experiences: [],
});

interface PersonnelFormProps {
    initialData?: PersonnelFormData;
    isEdit?: boolean;
    onSubmit: (data: PersonnelFormData) => void;
    onCancel: () => void;
    isLoading: boolean;
}

export function PersonnelForm({
    initialData,
    isEdit = false,
    onSubmit,
    onCancel,
    isLoading,
}: PersonnelFormProps) {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<PersonnelFormData>(
        initialData ?? emptyForm(),
    );

    const canNext = () => {
        // Verifie si les champs obligatoire de step 1 sont remplir , envoi true sinon false
        if (step === 1)
            // !! (...) renvoie true si la condition est verifie sinon false
            return !!(
                data.nom &&
                data.prenom &&
                data.genre &&
                data.date_naissance &&
                data.lieu_naissance &&
                data.nationalite
            );
        return true;
    };

    const stepTitles: Record<number, { title: string; description: string }> = {
        1: {
            title: "Informations d'identité",
            description:
                'Renseignez les informations personnelles du nouveau personnel.',
        },
        2: {
            title: 'Entreprise',
            description: 'Informations sur son entreprise',
        },
        3: {
            title: 'Formations',
            description: 'Renseigner ses differentes formations.',
        },
        4: {
            title: 'Expériences professionnelles',
            description: 'Renseigner ses expériences professionnelles.',
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
                                    : "Enregistrer l'employé"}
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
