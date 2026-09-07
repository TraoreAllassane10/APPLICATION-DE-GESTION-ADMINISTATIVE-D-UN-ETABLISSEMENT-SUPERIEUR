import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { EvaluationData } from '@/pages/evaluation/Index';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    Calendar,
    GraduationCap,
    Pen,
    Trash2,
    User,
} from 'lucide-react';
import useEvaluation from '../hooks/useEvaluation';

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
    return (
        <>
            <div className="grid grid-cols-4 gap-2">
                {evaluations.data.map((evaluation) => (
                    <Card key={evaluation.id}>
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center rounded-full bg-red-50 p-2">
                                    <BookOpen
                                        size={20}
                                        className="text-red-500"
                                    />
                                </div>
                                <h2
                                    title={evaluation.enseignement.cours.nom}
                                    className="truncate text-sm font-bold text-slate-800"
                                >
                                    {evaluation.enseignement.cours.nom} -{' '}
                                </h2>

                                <Link
                                    href={`/evaluations/${evaluation.id}/edit`}
                                    className="cursor-pointer rounded-full text-muted-foreground hover:text-red-500"
                                >
                                    <Pen size={16} />
                                </Link>

                                <Button
                                    variant={'default'}
                                    size={'icon-sm'}
                                    onClick={() => handleDelete(evaluation.id)}
                                    disabled={loading}
                                    className="cursor-pointer rounded-full bg-transparent text-muted-foreground hover:bg-transparent hover:text-red-500"
                                >
                                    <Trash2 />
                                </Button>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-1">
                            <p className="mb-4 truncate text-sm tracking-wide text-muted-foreground">
                                {evaluation.titre}
                            </p>

                            <div className="flex items-center gap-8 text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Calendar size={10} />
                                    <p className="text-xs">{evaluation.date}</p>
                                </div>

                                <div className="flex items-center gap-1">
                                    <GraduationCap size={10} />
                                    <p className="text-xs">
                                        {evaluation.enseignement.niveaux
                                            .map((niveau) => niveau.nom)
                                            .join(', ')}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center text-muted-foreground">
                                <User size={10} />
                                <p className="text-xs">
                                    {
                                        evaluation.enseignement.professeur
                                            .nom_prenom
                                    }
                                </p>
                            </div>
                        </CardContent>

                        <CardContent>
                            <div className="mb-2 flex items-center justify-between gap-4">
                                <div className="flex items-center gap-1">
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Coefficient :{' '}
                                    </p>
                                    <p className="text-sm text-red-500">
                                        {evaluation.coefficient}
                                    </p>
                                </div>

                                <div className="flex items-center gap-1">
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Note maximale :{' '}
                                    </p>
                                    <p className="text-sm text-red-500">
                                        {evaluation.note_maximale}
                                    </p>
                                </div>
                            </div>

                            <Link href={`/notes/${evaluation.id}/create-note`}>
                                <Button
                                    size={'sm'}
                                    className="w-full hover:bg-red-700"
                                >
                                    Saisir les notes
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default EvaluationTableSection;
