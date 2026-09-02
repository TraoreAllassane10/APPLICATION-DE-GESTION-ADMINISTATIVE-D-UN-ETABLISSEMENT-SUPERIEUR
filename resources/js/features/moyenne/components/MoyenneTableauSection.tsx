import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { formatRang } from '@/utils/util';
import { Link } from '@inertiajs/react';
import { Check, Edit2, X } from 'lucide-react';
import { useState } from 'react';
import { Moyenne } from '../types/moyennes.types';
import { formatNote } from '../utils';

interface MoyenneTableauSectionProps {
    moyennes: Moyenne[];
    coefficient: string;
    onChangeCoefficient: React.Dispatch<React.SetStateAction<string>>;
    onUpdateCoefficient: () => Promise<void>;
}

const MoyenneTableauSection = ({
    moyennes,
    coefficient,
    onChangeCoefficient,
    onUpdateCoefficient,
}: MoyenneTableauSectionProps) => {
    const [isEditCoefficient, setIsEditCoefficient] = useState(false);
console.log(moyennes);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <h1 className="text-md font-medium tracking-wide">
                        Coefficient dans le bulletin :{' '}
                    </h1>
                    <Input
                        type="number"
                        value={coefficient}
                        onChange={(e) =>  onChangeCoefficient(e.target.value)}
                        disabled={!isEditCoefficient}
                        className="w-[100px]"
                    />
                    {!isEditCoefficient ? (
                        <Button
                            variant={'outline'}
                            onClick={() => setIsEditCoefficient(true)}
                        >
                            <Edit2 />
                        </Button>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button
                                variant={'outline'}
                                onClick={async () => {
                                    await onUpdateCoefficient();
                                    setIsEditCoefficient(false);
                                }}
                            >
                                <Check />
                            </Button>
                            <Button
                                variant={'outline'}
                                onClick={() => setIsEditCoefficient(false)}
                            >
                                <X />
                            </Button>
                        </div>
                    )}
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/40 hover:bg-muted/40">
                                <TableHead className="w-[52px] text-center">
                                    N°
                                </TableHead>
                                <TableHead>Nom et Prénom</TableHead>
                                {moyennes &&
                                    moyennes[0].evaluations.map((ev, index) => (
                                        <TableHead
                                            key={index}
                                            className="text-center"
                                        >
                                            Evaluation {index + 1}
                                        </TableHead>
                                    ))}
                                <TableHead className="text-center">
                                    Total des points (avec coefficient)
                                </TableHead>

                                <TableHead className="text-center font-semibold">
                                    Moyenne
                                </TableHead>

                                <TableHead className="text-center">
                                    Rang
                                </TableHead>

                                {/* <TableHead className="text-center">
                                                Mention
                                            </TableHead> */}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {moyennes &&
                                moyennes.map((moyenne, index) => {
                                    return (
                                        <TableRow
                                            key={moyenne.id}
                                            className={
                                                moyenne.moyenne !== null &&
                                                moyenne.moyenne < 10
                                                    ? 'bg-red-50/50 dark:bg-red-950/10'
                                                    : ''
                                            }
                                        >
                                            {/* Numéro d'ordre */}
                                            <TableCell className="text-center text-sm text-muted-foreground">
                                                {index + 1}
                                            </TableCell>

                                            {/* Nom & Prénom */}
                                            <TableCell>
                                                <span className="font-medium">
                                                    {moyenne.nom}{' '}
                                                    {moyenne.prenom}
                                                </span>
                                            </TableCell>

                                            {/* Notes par evaluation */}
                                            {moyenne.evaluations.map(
                                                (evaluation) => (
                                                    <TableCell
                                                        key={evaluation.id}
                                                        className="text-center"
                                                    >
                                                        <Link
                                                            href={`/notes/${evaluation.id}/create-note`}
                                                        >
                                                            <span
                                                                className={
                                                                    evaluation.note ===
                                                                    null
                                                                        ? 'text-muted-foreground'
                                                                        : (evaluation.note <
                                                                                10 &&
                                                                                evaluation.note_maximale ===
                                                                                    20) ||
                                                                            (evaluation.note <
                                                                                5 &&
                                                                                evaluation.note_maximale ===
                                                                                    10)
                                                                          ? 'font-medium text-red-600 dark:text-red-400'
                                                                          : 'font-medium'
                                                                }
                                                            >
                                                                {
                                                                    evaluation.note ?? "NC"
                                                                }
                                                            </span>
                                                            
                                                            {
                                                              evaluation.note &&  "/" + evaluation.note_maximale
                                                            }
                                                          {
                                                            evaluation.note && (  <span className="ml-2 items-center justify-center rounded-full p-1 text-xs text-amber-600">
                                                                x
                                                                {
                                                                    evaluation.coefficient
                                                                }
                                                            </span>)
                                                          }
                                                        </Link>
                                                    </TableCell>
                                                ),
                                            )}

                                            {/* Total points des evaluations */}
                                            <TableCell className="text-center">
                                                {moyenne.evaluations.length > 0
                                                    ? moyenne.total_notes +
                                                      ' / ' +
                                                      moyenne.diviseur
                                                    : '—'}{' '}
                                            </TableCell>

                                            {/* Moyenne */}
                                            <TableCell className="text-center">
                                                <span
                                                    className={`font-medium ${
                                                        moyenne.moyenne === null
                                                            ? 'text-muted-foreground'
                                                            : moyenne.moyenne >=
                                                                10
                                                              ? 'text-emerald-600 dark:text-emerald-400'
                                                              : 'text-red-600 dark:text-red-400'
                                                    }`}
                                                >
                                                    {formatNote(
                                                        moyenne.moyenne,
                                                    )}
                                                </span>
                                            </TableCell>

                                            <TableCell className="text-center">
                                                {moyenne.moyenne &&
                                                    formatRang(
                                                        Number(moyenne.rang),
                                                    )}
                                            </TableCell>

                                            {/* Mention */}
                                            {/* <TableCell className="text-center">
                                                        <span
                                                            className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium ${mention.color}`}
                                                        >
                                                            {mention.label}
                                                        </span>
                                                    </TableCell> */}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default MoyenneTableauSection;
