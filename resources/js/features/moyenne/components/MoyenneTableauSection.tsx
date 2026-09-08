import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatRang } from '@/utils/util';
import { Link } from '@inertiajs/react';
import { Check, Edit2, X } from 'lucide-react';
import { useState } from 'react';
import { Moyenne } from '../types/moyennes.types';
import { formatNote } from '../utils';

interface MoyenneTableauSectionProps {
    moyennes: Moyenne[];
    coefficient: string;
    onChangeCoefficient: (value: string) => void;
    onUpdateCoefficient: () => Promise<void>;
}

const MoyenneTableauSection = ({
    moyennes,
    coefficient,
    onChangeCoefficient,
    onUpdateCoefficient,
}: MoyenneTableauSectionProps) => {
    const [isEditCoefficient, setIsEditCoefficient] = useState(false);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <h1 className="text-md font-medium tracking-wide">
                        Coefficient dans le bulletin :
                    </h1>
                    <Input
                        type="number"
                        value={coefficient}
                        onChange={(e) => onChangeCoefficient(e.target.value)}
                        disabled={!isEditCoefficient}
                        className="w-[100px]"
                    />
                    {!isEditCoefficient ? (
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setIsEditCoefficient(true)}
                        >
                            <Edit2 className="h-4 w-4" />
                        </Button>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={async () => {
                                    await onUpdateCoefficient();
                                    setIsEditCoefficient(false);
                                }}
                            >
                                <Check className="h-4 w-4 text-emerald-600" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setIsEditCoefficient(false)}
                            >
                                <X className="h-4 w-4 text-red-600" />
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
                                <TableHead className="w-[52px] text-center">N°</TableHead>
                                <TableHead>Nom et Prénom</TableHead>

                                {moyennes[0]?.evaluations?.map((_, index) => (
                                    <TableHead key={index} className="text-center">
                                        Évaluation {index + 1}
                                    </TableHead>
                                ))}

                                <TableHead className="text-center">
                                    Total des points (avec coeff.)
                                </TableHead>
                                <TableHead className="text-center font-semibold">
                                    Moyenne
                                </TableHead>
                                <TableHead className="text-center">Rang</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {moyennes.map((moyenne, index) => (
                                <TableRow
                                    key={moyenne.id}
                                    className={
                                        moyenne.moyenne !== null && moyenne.moyenne < 10
                                            ? 'bg-red-50/50 dark:bg-red-950/10'
                                            : ''
                                    }
                                >
                                    <TableCell className="text-center text-sm text-muted-foreground">
                                        {index + 1}
                                    </TableCell>

                                    <TableCell>
                                        <span className="font-medium">
                                            {moyenne.nom} {moyenne.prenom}
                                        </span>
                                    </TableCell>

                                    {moyenne.evaluations.map((evaluation) => {
                                        const isEliminatoire =
                                            (evaluation.note !== null &&
                                                evaluation.note < 10 &&
                                                evaluation.note_maximale === 20) ||
                                            (evaluation.note !== null &&
                                                evaluation.note < 5 &&
                                                evaluation.note_maximale === 10);

                                        return (
                                            <TableCell key={evaluation.id} className="text-center">
                                                <Link href={`/notes/${evaluation.id}/create-note`}>
                                                    <span
                                                        className={
                                                            evaluation.note === null
                                                                ? 'text-muted-foreground'
                                                                : isEliminatoire
                                                                ? 'font-medium text-red-600 dark:text-red-400'
                                                                : 'font-medium'
                                                        }
                                                    >
                                                        {evaluation.note ?? 'NC'}
                                                    </span>

                                                    {evaluation.note !== null && (
                                                        <>
                                                            <span>/{evaluation.note_maximale}</span>
                                                            <span className="ml-1.5 inline-flex items-center text-xs font-semibold text-amber-600">
                                                                x{evaluation.coefficient}
                                                            </span>
                                                        </>
                                                    )}
                                                </Link>
                                            </TableCell>
                                        );
                                    })}

                                    <TableCell className="text-center">
                                        {moyenne.evaluations.length > 0
                                            ? `${moyenne.total_notes} / ${moyenne.diviseur}`
                                            : '—'}
                                    </TableCell>

                                    <TableCell className="text-center">
                                        <span
                                            className={`font-medium ${
                                                moyenne.moyenne === null
                                                    ? 'text-muted-foreground'
                                                    : moyenne.moyenne >= 10
                                                    ? 'text-emerald-600 dark:text-emerald-400'
                                                    : 'text-red-600 dark:text-red-400'
                                            }`}
                                        >
                                            {formatNote(moyenne.moyenne)}
                                        </span>
                                    </TableCell>

                                    <TableCell className="text-center">
                                        {moyenne.moyenne !== null
                                            ? formatRang(Number(moyenne.rang))
                                            : '—'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default MoyenneTableauSection;