import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
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
import { Enseignement } from '@/features/enseignement/types/enseignement.types';
import useMoyenne from '@/features/moyenne/hooks/useMoyenne';
import { Moyenne } from '@/features/moyenne/types/moyennes.types';
import { formatNote } from '@/features/moyenne/utils';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, DataNiveau, Periode } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { BookOpen, Loader } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Notes & Moyennes', href: '/moyennes' },
];

interface MoyenneProps {
    niveaux: DataNiveau[];
    periodes: Periode[];
    [key: string]: unknown;
}

export default function Index() {
    const { niveaux, periodes } = usePage<MoyenneProps>().props;

    const [selectedEnseignementId, setSelectedEnseignementId] =
        useState<string>('');
    const [selectedClasseId, setSelectedClasseId] = useState<string>('');
    const [selectedPeriodeId, setSelectedPeriodeId] = useState<string>('');
    const [enseignements, setEnseignements] = useState<Enseignement[]>([]);
    const [moyennes, setMoyennes] = useState<Moyenne[] | []>([]);
    console.log(moyennes);

    const { getMoyennes, loading } = useMoyenne();

    // Recupere l'enseignement de la classe selectionnée
    useEffect(() => {
        setSelectedEnseignementId('');
        setEnseignements([]);

        const enseignementClasseSelectionnee = niveaux.find(
            (n) => n.id === Number(selectedClasseId),
        )?.enseignements;

        if (enseignementClasseSelectionnee) {
            setEnseignements(enseignementClasseSelectionnee as any);
        }
    }, [selectedClasseId]);

    // Recuperation de la moyenne des etudiants de la classe selectionné
    useEffect(() => {
        if (selectedClasseId && selectedEnseignementId && selectedPeriodeId) {
            async function loadMoyennes() {
                const result = await getMoyennes(
                    Number(selectedClasseId),
                    Number(selectedEnseignementId),
                    Number(selectedPeriodeId),
                );

                setMoyennes(result);
            }

            loadMoyennes();
        }
    }, [selectedClasseId, selectedEnseignementId, selectedPeriodeId]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Notes & Moyennes" />

            <div className="mx-auto w-full max-w-7xl space-y-6 p-6">
                {/* En-tête */}
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Notes &amp; Moyennes
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Consultez les notes et la moyenne des étudiants par
                        enseignement, classe et période académique.
                    </p>
                </div>

                {/* Sélecteurs */}
                <Card>
                    <CardContent className="p-5">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {/* Classe */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium">
                                    Classe
                                </label>
                                <Select
                                    value={selectedClasseId}
                                    onValueChange={setSelectedClasseId}
                                >
                                    <SelectTrigger id="select-classe">
                                        <SelectValue placeholder="Choisir une classe" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {niveaux.map((c) => (
                                            <SelectItem
                                                key={c.id}
                                                value={String(c.id)}
                                            >
                                                {c.nom}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Enseignement */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium">
                                    Enseignement
                                </label>
                                <Select
                                    value={selectedEnseignementId}
                                    onValueChange={setSelectedEnseignementId}
                                    disabled={enseignements.length === 0}
                                >
                                    <SelectTrigger id="select-enseignement">
                                        <SelectValue placeholder="Choisir un enseignement" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {enseignements.map(
                                            (ens: Enseignement) => (
                                                <SelectItem
                                                    key={ens.id}
                                                    value={String(ens.id)}
                                                >
                                                    {ens.cours.nom}
                                                </SelectItem>
                                            ),
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Période académique */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium">
                                    Période académique
                                </label>
                                <Select
                                    value={selectedPeriodeId}
                                    onValueChange={setSelectedPeriodeId}
                                >
                                    <SelectTrigger id="select-periode">
                                        <SelectValue placeholder="Choisir une période" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {periodes.map((p) => (
                                            <SelectItem
                                                key={p.id}
                                                value={String(p.id)}
                                            >
                                                {p.libelle}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {loading ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center text-muted-foreground">
                        <Loader className="h-10 w-10 animate-spin" />
                    </div>
                ) : moyennes?.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-20 text-center text-muted-foreground">
                        <BookOpen className="mb-3 h-12 w-12 opacity-20" />
                        <p className="text-sm font-medium">
                            Sélectionnez un enseignement, une classe et une
                            période
                        </p>
                        <p className="mt-1 text-xs">
                            Les notes et moyennes s'afficheront ici.
                        </p>
                    </div>
                ) : (
                    <Card>
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
                                                moyennes[0].evaluations.map(
                                                    (ev, index) => (
                                                        <TableHead
                                                            key={index}
                                                            className="text-center"
                                                        >
                                                            Evaluation{' '}
                                                            {index + 1}
                                                        </TableHead>
                                                    ),
                                                )}
                                            <TableHead className="text-center">
                                                Total des points (avec
                                                coefficient)
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
                                                            moyenne.moyenne !==
                                                                null &&
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
                                                                    key={
                                                                        evaluation.id
                                                                    }
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
                                                                                evaluation.note
                                                                            }
                                                                        </span>
                                                                        /
                                                                        {
                                                                            evaluation.note_maximale
                                                                        }
                                                                        <span className="ml-2 items-center justify-center rounded-full p-1 text-xs text-amber-600">
                                                                            x
                                                                            {
                                                                                evaluation.coefficient
                                                                            }
                                                                        </span>
                                                                    </Link>
                                                                </TableCell>
                                                            ),
                                                        )}

                                                        {/* Total points des evaluations */}
                                                        <TableCell className="text-center">
                                                            {moyenne.evaluations
                                                                .length > 0
                                                                ? moyenne.total_notes +
                                                                  ' / ' +
                                                                  moyenne.diviseur
                                                                : '—'}{' '}
                                                        </TableCell>

                                                        {/* Moyenne */}
                                                        <TableCell className="text-center">
                                                            <span
                                                                className={`font-medium ${
                                                                    moyenne.moyenne ===
                                                                    null
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
                                                            {moyenne.rang}
                                                            {moyenne.rang == '1'
                                                                ? 'er'
                                                                : 'ème'}
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
                )}
            </div>
        </AppLayout>
    );
}
