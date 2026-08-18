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
import { createEvaluationData } from '@/features/evaluations/validations/createEvaluationSchema';
import { CalendarDays } from 'lucide-react';

import { Control, Controller } from 'react-hook-form';

interface EvaluationPeriodeSectionProps {
    control: Control<createEvaluationData>;
}

const EvaluationPeriodeSection = ({
    control,
}: EvaluationPeriodeSectionProps) => {
   
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                        <CalendarDays className="h-4 w-4" />
                    </div>

                    <div>
                        <CardTitle className="text-base">
                            Période académique
                        </CardTitle>

                        <CardDescription>
                            Définissez l'année et la période concernées.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div>
                    {/* Période */}
                    <div className="space-y-2">
                        <Controller
                            name="periode"
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>Période</FieldLabel>

                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger
                                            aria-invalid={fieldState.invalid}
                                            className="h-11"
                                        >
                                            <SelectValue placeholder="Sélectionner une période" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="semestre_1">
                                                Semestre 1
                                            </SelectItem>

                                            <SelectItem value="semestre_2">
                                                Semestre 2
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {fieldState.invalid && (<FieldError errors={[fieldState.error]} />)}
                                </Field>
                            )}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default EvaluationPeriodeSection;
