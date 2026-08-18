import { Card } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

const EvaluationTableSection = () => {
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
                    {/* {cours.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={3}
                                            className="h-48 text-center"
                                        >
                                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                                <GraduationCap className="h-10 w-10 opacity-20" />
                                                <p className="text-sm">
                                                    Aucun cours enregistré.
                                                </p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    cours.data.map((cours) => (
                                        <TableRow
                                            key={cours.id}
                                            className="group"
                                        >
                                            <TableCell className="text-md font-medium">
                                                {cours.nom}
                                            </TableCell>

                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
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
                                                        <DropdownMenuItem
                                                            asChild
                                                        >
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
                                                            // onClick={() =>
                                                            //     handleDelete(
                                                            //         cours.id,
                                                            //     )
                                                            // }
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
                                )} */}
                </TableBody>

                {/* <PaginationLinks links={cours.meta.links} /> */}
            </Table>
        </Card>
    );
};

export default EvaluationTableSection;
