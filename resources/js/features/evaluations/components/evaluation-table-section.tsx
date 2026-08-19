import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
import { formatDate } from '@/utils/date';
import { Link } from '@inertiajs/react';
import { ChevronDown, ClipboardPen, Edit, Trash2 } from 'lucide-react';
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
        <Card className="overflow-hidden shadow-sm">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                        <TableHead>Titre</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Coefficient</TableHead>
                        <TableHead>Statut Saisie</TableHead>
                        <TableHead className="w-[80px]" />
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {evaluations.data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="h-48 text-center">
                                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                    <ClipboardPen className="h-10 w-10 opacity-20" />
                                    <p className="text-sm">
                                        Aucune evaluation touvée.
                                    </p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        evaluations.data.map((evaluation) => (
                            <TableRow key={evaluation.id} className="group">
                                <TableCell className="text-md font-medium text-muted-foreground">
                                    {evaluation.titre}
                                </TableCell>

                                <TableCell className="text-md text-muted-foreground">
                                    {evaluation.type}
                                </TableCell>

                                <TableCell className="text-md text-muted-foreground">
                                    {formatDate(new Date(evaluation.date))}
                                </TableCell>

                                <TableCell className="text-md text-muted-foreground">
                                    {evaluation.coefficient}
                                </TableCell>

                                <TableCell className="text-md text-muted-foreground">
                                    {/* {evaluation.titre} */}
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
                                                    // href={`/cours/${cours.id}/edit`}
                                                    className="flex cursor-pointer items-center gap-2"
                                                >
                                                    <Edit className="h-4 w-4" />{' '}
                                                    Modifier
                                                </Link>
                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem
                                                onClick={() =>
                                                    handleDelete(evaluation.id)
                                                }
                                                disabled={loading}
                                                className="cursor-pointer gap-2 text-destructive focus:text-destructive"
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

                {/* <PaginationLinks links={cours.meta.links} /> */}
            </Table>
        </Card>
    );
};

export default EvaluationTableSection;
