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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { EvaluationData } from '@/pages/evaluation/Index';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    Calendar,
    ChevronDown,
    GraduationCap,
    Pen,
    Pencil,
    Trash2,
    User,
} from 'lucide-react';
import useEvaluation from '../hooks/useEvaluation';
import useEvaluationProfesseur from '../hooks/useEvaluationProfesseur';

interface EvaluationTableSectionProps {
    evaluations: EvaluationData;
}

const EvaluationTableSection = ({
    evaluations,
}: EvaluationTableSectionProps) => {
    const { deleteEvaluation, loading } = useEvaluation();
    const { deleteEvaluation: professeurDeleteEvaluation, loading: loadingProfesseur } = useEvaluationProfesseur();

    const pathname = window.location.pathname;

    const handleDelete = async (id: number) => {
        if (pathname.startsWith('/professeur')) {
              await professeurDeleteEvaluation(id);

              return ;
        }
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
        <>
            <Card className="overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/40 hover:bg-muted/40">
                            <TableHead>Titre</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Note maximale</TableHead>
                            <TableHead>Coefficient</TableHead>
                            <TableHead>Matière</TableHead>
                            <TableHead>Période</TableHead>

                            <TableHead className="w-[100px]" />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {evaluations.data.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={7}
                                    className="h-48 text-center"
                                >
                                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                        <GraduationCap className="h-10 w-10 opacity-20" />
                                        <p className="text-sm">
                                            Aucune evaluation trouvée.
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            evaluations.data.map((evaluation) => (
                                <TableRow key={evaluation.id} className="group">
                                    <TableCell className="space-x-1">
                                        {evaluation.titre}
                                    </TableCell>

                                    <TableCell>{evaluation.type}</TableCell>

                                    <TableCell>{evaluation.date}</TableCell>

                                    <TableCell>
                                        {evaluation.note_maximale}
                                    </TableCell>

                                    <TableCell>
                                        {evaluation.coefficient}
                                    </TableCell>

                                    <TableCell>
                                        {evaluation.enseignement.cours.nom}
                                    </TableCell>

                                    <TableCell>
                                        {evaluation.periode_academique.libelle}
                                    </TableCell>

                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 gap-1 opacity-0 transition-opacity group-hover:opacity-100"
                                                >
                                                    Actions{' '}
                                                    <ChevronDown className="h-3 w-3" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="w-48"
                                            >
                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={`/professeur/evaluations/${evaluation.id}/edit`}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                        Modifier
                                                    </Link>
                                                </DropdownMenuItem>

                                                <DropdownMenuItem asChild>
                                                    <Link
                                                        href={`/notes/${evaluation.id}/create-note`}
                                                        className="w-full"
                                                    >
                                                        <Pen />
                                                        Saisir les notes
                                                    </Link>
                                                </DropdownMenuItem>

                                                <DropdownMenuSeparator />

                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleDelete(
                                                            evaluation.id,
                                                        )
                                                    }
                                                    className="cursor-pointer gap-2 text-destructive focus:text-destructive"
                                                    disabled={loadingProfesseur || loading}
                                                >
                                                    <Trash2 className="h-4 w-4" />{' '}
                                                    Supprimer
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>

                    <PaginationLinks links={evaluations.links!} />
                </Table>
            </Card>
        </>
    );
};

export default EvaluationTableSection;
