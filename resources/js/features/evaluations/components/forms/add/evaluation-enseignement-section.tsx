import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Enseignement } from '@/features/enseignement/types/enseignement.types';
import { createEvaluationData } from '@/features/evaluations/validations/createEvaluationSchema';
import { BookOpen } from 'lucide-react';
import { Control, Controller } from 'react-hook-form';

interface EvaluationEnseignementSectionProps {
    control: Control<createEvaluationData>;
    enseignements: Enseignement[];
}

const EvaluationEnseignementSection = ({
    control,
    enseignements
}: EvaluationEnseignementSectionProps) => {
 
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                        <BookOpen className="h-4 w-4" />
                    </div>

                    <div>
                        <CardTitle className="text-base">
                            Enseignement
                        </CardTitle>

                        <CardDescription>
                            Sélectionnez l'enseignement concerné par
                            l'évaluation.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="space-y-2">
                    <Controller
                        name="enseignement_id"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Enseignement</FieldLabel>

                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        id={field.name}
                                        className="h-11"
                                        aria-invalid={fieldState.invalid}
                                    >
                                        <SelectValue placeholder="Sélectionner un enseignement" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {enseignements.map((item) => (
                                            <SelectItem
                                                key={item.id}
                                                value={item.id.toString()}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <BookOpen className="h-4 w-4 text-muted-foreground" />

                                                    <span>
                                                        {item.cours.nom} —{' '}
                                                        {item.professeur.nom_prenom}
                                                    </span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default EvaluationEnseignementSection;
