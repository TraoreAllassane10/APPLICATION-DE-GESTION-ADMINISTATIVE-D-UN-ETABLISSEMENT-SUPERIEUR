import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const EvaluationRecapitulatifSection = ({ values, selectedEnseignement } : any) => {
    return (
        <Card className="border-dashed">
            <CardHeader>
                <CardTitle className="text-base">Récapitulatif</CardTitle>

                <CardDescription>
                    Vérifiez les informations avant de créer l'évaluation.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">
                            Enseignement
                        </span>

                        <span className="text-right font-medium">
                            {selectedEnseignement?.cours}
                        </span>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">
                            Professeur
                        </span>

                        <span className="font-medium">
                            {selectedEnseignement?.professeur}
                        </span>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">
                            Évaluation
                        </span>

                        <span className="font-medium">{values.titre}</span>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">
                            Coefficient
                        </span>

                        <span className="font-medium">{values.coefficient}</span>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">
                            Note maximale
                        </span>

                        <span className="font-medium">{values.note_maximale}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default EvaluationRecapitulatifSection;
