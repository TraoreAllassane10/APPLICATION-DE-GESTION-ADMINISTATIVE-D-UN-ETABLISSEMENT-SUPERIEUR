import { Button } from '@/components/ui/button';
import useEvaluation from '@/features/evaluations/hooks/useEvaluation';
import { Evaluation } from '@/features/evaluations/types/evaluation.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import EvaluationEditInformationsSection from './evaluation-edit-informations-section';
import { updateEvaluationData, updateEvaluationSchema } from '@/features/evaluations/validations/updateEvaluationSchema';
import dayjs from 'dayjs';

interface EvaluationFormProps {
    evaluation: Evaluation;
    type_evaluations: string[];
}

const EvaluationEditForm = ({
    evaluation,
    type_evaluations,
}: EvaluationFormProps) => {
    const { control, handleSubmit, formState: {isSubmitting} } = useForm<updateEvaluationData>({
        resolver: zodResolver(updateEvaluationSchema),
        values: {
            type: String(evaluation.type ?? ''),
            titre: evaluation.titre ?? '',
            date: evaluation.date ?? '',
            coefficient: evaluation.coefficient ?? 1,
            note_maximale: evaluation.note_maximale ?? 20,
        },
    });

    const { updateEvaluation, loading } = useEvaluation();

    const onSubmit = async (data: updateEvaluationData) => {
        const formattedDate = dayjs(new Date(data.date)).format('YYYY-MM-DD');
        await updateEvaluation(evaluation.id, {
            coefficient: data.coefficient,
            titre: data.titre,
            note_maximale: data.note_maximale,
            type: data.type,
            date: formattedDate,
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <EvaluationEditInformationsSection
                control={control}
                type_evaluations={type_evaluations}
            />

            <div className="flex items-center justify-end gap-3">
                <Button type="button" variant="outline">
                    Annuler
                </Button>

                <Button type="submit" disabled={loading}>
                    {isSubmitting || loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                    )}
                    {isSubmitting || loading
                        ? "Modification d'evaluation..."
                        : "Modifier l'évaluation"}
                </Button>
            </div>
        </form>
    );
};

export default EvaluationEditForm;
