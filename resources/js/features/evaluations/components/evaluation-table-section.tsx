import PaginationLinks from '@/components/Pagination';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    Calendar,
    GraduationCap,
    Pencil,
    Trash2,
    User,
} from 'lucide-react';
import useEvaluation from '../hooks/useEvaluation';
import { EvaluationData } from '@/pages/evaluation/Index';

interface EvaluationTableSectionProps {
    evaluations: EvaluationData;
}

const EvaluationTableSection = ({
    evaluations,
}: EvaluationTableSectionProps) => {
    const { deleteEvaluation, loading } = useEvaluation();

    const handleDelete = async (id: number) => {
        await deleteEvaluation(id);
    };

    if (!evaluations.data || evaluations.data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16 text-center text-muted-foreground">
                <BookOpen className="mb-3 h-12 w-12 opacity-20" />
                <p className="text-sm font-medium">Aucune évaluation trouvée</p>
                <p className="mt-1 text-xs">
                    Modifiez vos filtres ou créez une nouvelle évaluation.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {evaluations.data.map((evaluation) => (
                    <Card
                        key={evaluation.id}
                        className="flex flex-col justify-between shadow-sm transition-shadow hover:shadow-md"
                    >
                        <CardHeader className="p-4 pb-2">
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex min-w-0 items-center gap-2.5">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <BookOpen className="h-5 w-5" />
                                    </div>
                                    <h2
                                        title={
                                            evaluation.enseignement.cours.nom
                                        }
                                        className="truncate text-sm font-semibold text-foreground"
                                    >
                                        {evaluation.enseignement.cours.nom}
                                    </h2>
                                </div>

                                <div className="flex shrink-0 items-center gap-1">
                                    <Link
                                        href={`/evaluations/${evaluation.id}/edit`}
                                    >
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                disabled={loading}
                                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Supprimer l'évaluation ?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Cette action est
                                                    irréversible. Les notes
                                                    associées à cette évaluation
                                                    seront également impactées.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Annuler
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() =>
                                                        handleDelete(
                                                            evaluation.id,
                                                        )
                                                    }
                                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                >
                                                    Supprimer
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-3 p-4 pt-2">
                            <p className="line-clamp-2 min-h-[32px] text-xs font-medium text-muted-foreground">
                                {evaluation.titre}
                            </p>

                            <div className="space-y-1.5 text-xs text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-3.5 w-3.5 shrink-0" />
                                    <span>{evaluation.date}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <GraduationCap className="h-3.5 w-3.5 shrink-0" />
                                    <span className="truncate">
                                        {evaluation.enseignement.niveaux
                                            .map((niveau) => niveau.nom)
                                            .join(', ')}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <User className="h-3.5 w-3.5 shrink-0" />
                                    <span className="truncate">
                                        {
                                            evaluation.enseignement.professeur
                                                .nom_prenom
                                        }
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between border-t pt-2 text-xs">
                                <span className="text-muted-foreground">
                                    Coeff :{' '}
                                    <strong className="text-foreground">
                                        {evaluation.coefficient}
                                    </strong>
                                </span>
                                <Badge variant="outline">
                                    Sur {evaluation.note_maximale}
                                </Badge>
                            </div>
                        </CardContent>

                        <CardFooter className="p-4 pt-0">
                            <Link
                                href={`/notes/${evaluation.id}/create-note`}
                                className="w-full"
                            >
                                <Button
                                    size="sm"
                                    variant="default"
                                    className="w-full"
                                >
                                    Saisir les notes
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {evaluations.links && (
                <div className="flex justify-center pt-4">
                    <PaginationLinks links={evaluations.links} />
                </div>
            )}
        </div>
    );
};

export default EvaluationTableSection;
