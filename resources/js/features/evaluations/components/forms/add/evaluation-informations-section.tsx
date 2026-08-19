import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { createEvaluationData } from '@/features/evaluations/validations/createEvaluationSchema';
import { GraduationCap } from 'lucide-react';
import { Control, Controller } from 'react-hook-form';

interface EvaluationInformationsSectionProps {
    control: Control<createEvaluationData>;
      type_evaluations: string[];
}

const EvaluationInformationsSection = ({
    control,
    type_evaluations
}: EvaluationInformationsSectionProps) => {

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                        <GraduationCap className="h-4 w-4" />
                    </div>

                    <div>
                        <CardTitle className="text-base">
                            Informations de l'évaluation
                        </CardTitle>

                        <CardDescription>
                            Configurez les caractéristiques de l'évaluation.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-5">
                {/* Type */}
                <Controller
                    name="type"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>
                                Type d'évaluation
                            </FieldLabel>

                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger
                                    aria-invalid={fieldState.invalid}
                                    className="h-11"
                                >
                                    <SelectValue placeholder="Sélectionner un type" />
                                </SelectTrigger>

                                <SelectContent>
                                    {type_evaluations.map((type) => (
                                        <SelectItem
                                            key={type}
                                            value={type}
                                        >
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {/* Titre */}
                <Controller
                    name="titre"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Titre</FieldLabel>

                            <Input
                                id={field.name}
                                {...field}
                                aria-invalid={fieldState.invalid}
                                placeholder="Ex. Examen final de Mathématiques financières"
                                className="h-11"
                            />

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {/* Date */}
                <Controller
                    name="date"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name}>Date</FieldLabel>

                            <Input
                                id={field.name}
                                type="date"
                                {...field}
                                className="h-11"
                            />

                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />

                {/* Coefficient + note maximale */}
                <div className="grid gap-5 sm:grid-cols-2">
                    <Controller
                        name="coefficient"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Coefficient
                                </FieldLabel>

                                <Input
                                    id={field.name}
                                    type="number"
                                    name={field.name}
                                    value={field.value ?? ''}
                                    ref={field.ref}
                                    onBlur={field.onBlur}
                                    onChange={(e) => {
                                        field.onChange(
                                            e.target.value === ''
                                                ? undefined
                                                : Number(e.target.value),
                                        );
                                    }}
                                    className="h-11"
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="note_maximale"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Note maximale
                                </FieldLabel>

                                <Input
                                    id={field.name}
                                    type="number"
                                    name={field.name}
                                    value={field.value ?? ''}
                                    ref={field.ref}
                                    onBlur={field.onBlur}
                                    onChange={(e) => {
                                        field.onChange(
                                            e.target.value === ''
                                                ? 0
                                                : Number(e.target.value),
                                        );
                                    }}
                                    className="h-11"
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default EvaluationInformationsSection;
