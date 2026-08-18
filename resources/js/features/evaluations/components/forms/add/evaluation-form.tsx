import { Button } from '@/components/ui/button';
import {
    createEvaluationData,
    createEvaluationSchema,
} from '@/features/evaluations/validations/createEvaluationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import EvaluationEnseignementSection from './evaluation-enseignement-section';
import EvaluationInformationsSection from './evaluation-informations-section';
import EvaluationPeriodeSection from './evaluation-periode-section';
import EvaluationRecapitulatifSection from './evaluation-recapitulatif-section';

const enseignements = [
    {
        id: '1',
        cours: 'Mathématiques financières',
        professeur: 'M. Kouassi',
    },
    {
        id: '2',
        cours: 'Statistiques',
        professeur: 'Mme Yao',
    },
    {
        id: '3',
        cours: 'Comptabilité générale',
        professeur: 'M. Konan',
    },
];

const EvaluationForm = () => {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<createEvaluationData>({
        resolver: zodResolver(createEvaluationSchema),
        defaultValues: {
            enseignement_id: '',
            periode: 'semestre_1',
            type: '',
            titre: '',
            date: '',
            coefficient: 1,
            note_maximale: 20,
        },
    });

    // Recuperer les valeurs des champs pour affichages du recap
    const values = watch();

    const selectedEnseignement = enseignements.find(
        (enseignement) => enseignement.id === values.enseignement_id,
    );

    const onSubmit = (data: createEvaluationData) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <EvaluationEnseignementSection control={control} />

            <EvaluationPeriodeSection control={control} />

            <EvaluationInformationsSection control={control} />

            {values.titre && values.enseignement_id && (
                <EvaluationRecapitulatifSection
                    values={values}
                    selectedEnseignement={selectedEnseignement}
                />
            )}

            <div className="flex items-center justify-end gap-3">
                <Button type="button" variant="outline">
                    Annuler
                </Button>

                <Button type="submit">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Créer l'évaluation
                </Button>
            </div>
        </form>
    );
};

export default EvaluationForm;
