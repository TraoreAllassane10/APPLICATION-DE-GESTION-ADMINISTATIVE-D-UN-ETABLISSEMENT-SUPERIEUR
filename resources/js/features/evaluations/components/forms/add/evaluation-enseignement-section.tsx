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
import { BookOpen, UserRound } from 'lucide-react';
import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';

interface EvaluationEnseignementSectionProps {
    control: Control<createEvaluationData>;
}

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

const EvaluationEnseignementSection = ({
    control,
}: EvaluationEnseignementSectionProps) => {
    const [enseignement, setEnseignement] = useState('');

    const selectedEnseignement = enseignements.find(
        (item) => item.id === enseignement,
    );

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
                                                value={item.id}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <BookOpen className="h-4 w-4 text-muted-foreground" />

                                                    <span>
                                                        {item.cours} —{' '}
                                                        {item.professeur}
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

                    {selectedEnseignement && (
                        <div className="mt-3 flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                            <UserRound className="h-4 w-4" />

                            <span>
                                Enseignant :{' '}
                                <span className="font-medium text-foreground">
                                    {selectedEnseignement.professeur}
                                </span>
                            </span>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default EvaluationEnseignementSection;
