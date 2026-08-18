import { Check, ClipboardList, Save, Users } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

type Student = {
    id: string;
    nom: string;
    note: number | null;
    absent: boolean;
};

const initialStudents: Student[] = [
    {
        id: '1',
        nom: 'Jean Kouassi',
        note: 14,
        absent: false,
    },
    {
        id: '2',
        nom: 'Marie Yao',
        note: 16,
        absent: true,
    },
    {
        id: '3',
        nom: 'Koffi Traoré',
        note: 12,
        absent: false,
    },
    {
        id: '4',
        nom: 'Aya Konan',
        note: 9,
        absent: false,
    },
];

const classes = [
    {
        id: 'all',
        label: 'Toutes',
    },
    {
        id: 'ida1',
        label: 'IDA 1',
    },
    {
        id: 'fc1',
        label: 'FC 1',
    },
];

function getAppreciation(note: number | null, absent: boolean) {
    if (absent) return 'Absent';

    if (note === null) return '—';

    if (note < 10) return 'Insuffisant';

    if (note < 12) return 'Passable';

    if (note < 14) return 'Assez bien';

    if (note < 16) return 'Bien';

    if (note < 18) return 'Très bien';

    return 'Excellent';
}

export default function SaisirNotes() {
    const [students, setStudents] = useState<Student[]>(initialStudents);

    const [selectedClass, setSelectedClass] = useState('all');

    const updateNote = (studentId: string, value: string) => {
        setStudents((current) =>
            current.map((student) => {
                if (student.id !== studentId) {
                    return student;
                }

                if (value === '') {
                    return {
                        ...student,
                        note: null,
                    };
                }

                const note = Number(value);

                if (Number.isNaN(note)) {
                    return student;
                }

                return {
                    ...student,
                    note: Math.min(20, Math.max(0, note)),
                };
            }),
        );
    };

    const updateAbsence = (studentId: string, absent: boolean) => {
        setStudents((current) =>
            current.map((student) =>
                student.id === studentId
                    ? {
                          ...student,
                          absent,
                          note: absent ? null : student.note,
                      }
                    : student,
            ),
        );
    };

    const statistics = useMemo(() => {
        const presentStudents = students.filter(
            (student) => !student.absent && student.note !== null,
        );

        const total = presentStudents.reduce(
            (sum, student) => sum + (student.note ?? 0),
            0,
        );

        const moyenne =
            presentStudents.length > 0 ? total / presentStudents.length : 0;

        return {
            moyenne: moyenne.toFixed(2),
            total: students.length,
            absents: students.filter((student) => student.absent).length,
        };
    }, [students]);

    const handleSave = () => {
        const payload = students.map((student) => ({
            student_id: student.id,
            note: student.absent ? null : student.note,
            absent: student.absent,
        }));

        console.log(payload);

        // mutation.mutate(payload)
    };

    return (
        <AppLayout>
            <Head title="Saisir de notes" />

            <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-start gap-3">
                        {/* <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <ClipboardList className="h-5 w-5 text-primary" />
                        </div> */}

                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Saisie des notes
                            </h1>

                            <p className="mt-1 text-sm text-muted-foreground">
                                Examen final — Mathématiques financières
                            </p>

                            <p className="text-sm text-muted-foreground">
                                15 janvier 2026
                            </p>
                        </div>
                    </div>

                    <Button onClick={handleSave} className="w-full md:w-auto">
                        <Save className="mr-2 h-4 w-4" />
                        Enregistrer
                    </Button>
                </div>

                {/* Filtres */}
                <Card>
                    <CardContent className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-3">
                            <Users className="h-4 w-4 text-muted-foreground" />

                            <div>
                                <p className="text-sm font-medium">Classe</p>

                                <p className="text-xs text-muted-foreground">
                                    Filtrer les étudiants
                                </p>
                            </div>
                        </div>

                        <Select
                            value={selectedClass}
                            onValueChange={setSelectedClass}
                        >
                            <SelectTrigger className="w-full md:w-[220px]">
                                <SelectValue placeholder="Sélectionner une classe" />
                            </SelectTrigger>

                            <SelectContent>
                                {classes.map((classe) => (
                                    <SelectItem
                                        key={classe.id}
                                        value={classe.id}
                                    >
                                        {classe.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                {/* Tableau */}
                <Card>
                    <CardHeader className="border-b">
                        <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="font-semibold">
                                    Liste des étudiants
                                </h2>

                                <p className="text-sm text-muted-foreground">
                                    Saisissez les notes sur 20 et indiquez les
                                    absences.
                                </p>
                            </div>

                            <div className="flex gap-4 text-sm">
                                <div>
                                    <span className="text-muted-foreground">
                                        Étudiants :
                                    </span>{' '}
                                    <span className="font-medium">
                                        {statistics.total}
                                    </span>
                                </div>

                                <div>
                                    <span className="text-muted-foreground">
                                        Absents :
                                    </span>{' '}
                                    <span className="font-medium">
                                        {statistics.absents}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[60px] text-center">
                                            #
                                        </TableHead>

                                        <TableHead>Étudiant</TableHead>

                                        <TableHead className="w-[150px]">
                                            Note
                                        </TableHead>

                                        <TableHead className="w-[120px] text-center">
                                            Absent
                                        </TableHead>

                                        <TableHead>Appréciation</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {students.map((student, index) => {
                                        const appreciation = getAppreciation(
                                            student.note,
                                            student.absent,
                                        );

                                        return (
                                            <TableRow key={student.id}>
                                                {/* Numéro */}
                                                <TableCell className="text-center text-muted-foreground">
                                                    {index + 1}
                                                </TableCell>

                                                {/* Étudiant */}
                                                <TableCell>
                                                    <span className="font-medium">
                                                        {student.nom}
                                                    </span>
                                                </TableCell>

                                                {/* Note */}
                                                <TableCell>
                                                    <div className="relative w-[100px]">
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            max={20}
                                                            step={0.5}
                                                            value={
                                                                student.note ??
                                                                ''
                                                            }
                                                            disabled={
                                                                student.absent
                                                            }
                                                            onChange={(event) =>
                                                                updateNote(
                                                                    student.id,
                                                                    event.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="pr-8 text-center"
                                                            placeholder="—"
                                                        />

                                                        <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs text-muted-foreground">
                                                            /20
                                                        </span>
                                                    </div>
                                                </TableCell>

                                                {/* Absent */}
                                                <TableCell>
                                                    <div className="flex justify-center">
                                                        <Checkbox
                                                            checked={
                                                                student.absent
                                                            }
                                                            onCheckedChange={(
                                                                checked,
                                                            ) =>
                                                                updateAbsence(
                                                                    student.id,
                                                                    checked ===
                                                                        true,
                                                                )
                                                            }
                                                            aria-label={`Absent - ${student.nom}`}
                                                        />
                                                    </div>
                                                </TableCell>

                                                {/* Appréciation */}
                                                <TableCell>
                                                    <span
                                                        className={
                                                            student.absent
                                                                ? 'text-muted-foreground'
                                                                : student.note !==
                                                                        null &&
                                                                    student.note >=
                                                                        10
                                                                  ? 'font-medium'
                                                                  : 'text-muted-foreground'
                                                        }
                                                    >
                                                        {appreciation}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Résumé */}
                <div className="flex flex-col gap-4 rounded-lg border bg-muted/30 p-4 md:flex-row md:items-center md:justify-between">
                    <div className="text-sm">
                        <span className="text-muted-foreground">
                            Moyenne de la classe :
                        </span>{' '}
                        <span className="font-semibold">
                            {statistics.moyenne}/20
                        </span>
                    </div>

                    <Button onClick={handleSave} className="w-full md:w-auto">
                        <Check className="mr-2 h-4 w-4" />
                        Enregistrer les notes
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
