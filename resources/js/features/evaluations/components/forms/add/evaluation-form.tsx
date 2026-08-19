import { Button } from '@/components/ui/button';
import { Enseignement } from '@/features/enseignement/types/enseignement.types';
import useEvaluation from '@/features/evaluations/hooks/useEvaluation';
import {
    createEvaluationData,
    createEvaluationSchema,
} from '@/features/evaluations/validations/createEvaluationSchema';
import { Periode } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import daysjs from 'dayjs';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import EvaluationEnseignementSection from './evaluation-enseignement-section';
import EvaluationInformationsSection from './evaluation-informations-section';
import EvaluationPeriodeSection from './evaluation-periode-section';
import EvaluationRecapitulatifSection from './evaluation-recapitulatif-section';

interface EvaluationFormProps {
    enseignements: Enseignement[];
    periodes: Periode[];
    type_evaluations: string[];
}

const EvaluationForm = ({
    enseignements,
    periodes,
    type_evaluations,
}: EvaluationFormProps) => {
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
        (enseignement) => enseignement.id === Number(values.enseignement_id),
    );

    const { createEvaluation, loading } = useEvaluation();
    const onSubmit = async (data: createEvaluationData) => {
        const formattedDate = daysjs(new Date(data.date)).format('YYYY-MM-DD');

        await createEvaluation({
            enseignement_id: Number(data.enseignement_id),
            periode_academique_id: Number(data.periode),
            coefficient: data.coefficient,
            titre: data.titre,
            note_maximale: data.note_maximale,
            type: data.titre,
            date: formattedDate,
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <EvaluationEnseignementSection
                control={control}
                enseignements={enseignements}
            />

            <EvaluationPeriodeSection control={control} periodes={periodes} />

            <EvaluationInformationsSection
                control={control}
                type_evaluations={type_evaluations}
            />

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

                <Button type="submit" disabled={loading}>
                    {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                    )}
                    {loading
                        ? "Création d'evaluation..."
                        : "Créer l'évaluation"}
                </Button>
            </div>
        </form>
    );
};

export default EvaluationForm;
