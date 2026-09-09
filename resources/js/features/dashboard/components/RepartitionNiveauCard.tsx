import { Badge } from "@/components/ui/badge";
import { RepartitionNiveau } from "../types/dashboard.types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
interface RepartitionNiveauCardProps {
    anneeActive: string;
    repartitionNiveaux: RepartitionNiveau[];
}

const RepartitionNiveauCard = ({anneeActive, repartitionNiveaux} : RepartitionNiveauCardProps) => {
    return (
        <Card className="flex flex-col justify-between border-border/60 shadow-xs transition-all hover:shadow-md">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">
                        Inscriptions par niveau
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                        {anneeActive}
                    </Badge>
                </div>
                <CardDescription className="text-xs">
                    Distribution des étudiants inscrits par cycle d'étude
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {(() => {
                    const max = Math.max(
                        ...repartitionNiveaux.map((r) => r.inscrits),
                        1,
                    );
                    return repartitionNiveaux.map(
                        ({ niveau, inscrits, couleur }) => (
                            <div key={niveau} className="space-y-1.5">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium text-foreground">
                                        {niveau}
                                    </span>
                                    <span className="text-xs font-semibold text-muted-foreground tabular-nums">
                                        {inscrits} étudiant
                                        {inscrits > 1 ? 's' : ''}
                                    </span>
                                </div>
                                <div className="h-2.5 overflow-hidden rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full transition-all duration-700 ease-out"
                                        style={{
                                            width: `${Math.round((inscrits / max) * 100)}%`,
                                            backgroundColor: couleur,
                                        }}
                                    />
                                </div>
                            </div>
                        ),
                    );
                })()}
            </CardContent>
        </Card>
    );
};

export default RepartitionNiveauCard;
