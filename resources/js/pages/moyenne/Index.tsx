import { useEffect, useMemo, useState } from 'react';

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
import useMoyenne from '@/features/moyenne/hooks/useMoyenne';
import { Moyenne } from '@/features/moyenne/types/moyennes.types';
import { formatNote } from '@/features/moyenne/utils';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, DataNiveau, Periode } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    GraduationCap,
    Loader,
    TrendingUp,
    Users,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Evaluation {
    id: number;
    titre: string;
}

interface Enseignement {
    id: number;
    label: string;
    cours: string;
    professeur: string;
    evaluations: Evaluation[];
}

interface Classe {
    id: number;
    nom: string;
}

interface PeriodeAcademique {
    id: number;
    label: string;
}

interface NoteEtudiant {
    evaluation_id: number;
    valeur: number | null;
}

interface Etudiant {
    id: number;
    nom: string;
    prenom: string;
    notes: NoteEtudiant[];
}

// ─── Données mockées ──────────────────────────────────────────────────────────

const ENSEIGNEMENTS: Enseignement[] = [
    {
        id: 1,
        label: 'Mathématiques — Prof. Koné Ibrahima',
        cours: 'Mathématiques',
        professeur: 'Prof. Koné Ibrahima',
        evaluations: [
            { id: 1, titre: 'Évaluation 1' },
            { id: 2, titre: 'Évaluation 2' },
            { id: 3, titre: 'Évaluation 3' },
        ],
    },
    {
        id: 2,
        label: 'Informatique — Prof. Traoré Allassane',
        cours: 'Informatique',
        professeur: 'Prof. Traoré Allassane',
        evaluations: [
            { id: 4, titre: 'Évaluation 1' },
            { id: 5, titre: 'Évaluation 2' },
        ],
    },
    {
        id: 3,
        label: 'Physique — Prof. Coulibaly Seydou',
        cours: 'Physique',
        professeur: 'Prof. Coulibaly Seydou',
        evaluations: [
            { id: 6, titre: 'Évaluation 1' },
            { id: 7, titre: 'Évaluation 2' },
            { id: 8, titre: 'Évaluation 3' },
            { id: 9, titre: 'Évaluation 4' },
        ],
    },
];

function genNotes(etudiantId: number, evaluationIds: number[]): NoteEtudiant[] {
    return evaluationIds.map((evId) => {
        const seed = (etudiantId * 13 + evId * 7) % 21;
        return {
            evaluation_id: evId,
            valeur: seed === 0 ? null : Math.min(20, Math.max(4, seed)),
        };
    });
}

const ETUDIANTS_BASE = [
    { id: 1, nom: 'KONÉ', prenom: 'Aminata' },
    { id: 2, nom: 'TRAORÉ', prenom: 'Boubacar' },
    { id: 3, nom: 'DIALLO', prenom: 'Fatoumata' },
    { id: 4, nom: 'COULIBALY', prenom: 'Ibrahim' },
    { id: 5, nom: 'BAMBA', prenom: 'Mariam' },
    { id: 6, nom: 'SANOGO', prenom: 'Oumar' },
    { id: 7, nom: 'OUÉDRAOGO', prenom: 'Rasmané' },
    { id: 8, nom: 'CISSÉ', prenom: 'Sali' },
    { id: 9, nom: 'DIABATÉ', prenom: 'Tidiane' },
    { id: 10, nom: 'TOURÉ', prenom: 'Yaye' },
    { id: 11, nom: 'SY', prenom: 'Aïssatou' },
    { id: 12, nom: 'BARRY', prenom: 'Mamadou' },
];

function getEtudiants(enseignementId: number): Etudiant[] {
    const ens = ENSEIGNEMENTS.find((e) => e.id === enseignementId);
    if (!ens) return [];
    const evIds = ens.evaluations.map((e) => e.id);
    return ETUDIANTS_BASE.map((e) => ({
        ...e,
        notes: genNotes(e.id, evIds),
    }));
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getMoyenne(notes: NoteEtudiant[]): number | null {
    const valeurs = notes
        .map((n) => n.valeur)
        .filter((v): v is number => v !== null);
    if (valeurs.length === 0) return null;
    return valeurs.reduce((sum, v) => sum + v, 0) / valeurs.length;
}

interface MentionInfo {
    label: string;
    color: string;
}

function getMention(moyenne: number | null): MentionInfo {
    if (moyenne === null)
        return {
            label: 'Absent',
            color: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
        };
    if (moyenne < 10)
        return {
            label: 'Insuffisant',
            color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        };
    if (moyenne < 12)
        return {
            label: 'Assez bien',
            color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
        };
    if (moyenne < 14)
        return {
            label: 'Bien',
            color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        };
    if (moyenne < 16)
        return {
            label: 'Très bien',
            color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        };
    if (moyenne < 18)
        return {
            label: 'Excellent',
            color: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400',
        };
    return {
        label: 'Exceptionnel',
        color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    };
}

// ─── Breadcrumbs ──────────────────────────────────────────────────────────────

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Notes & Moyennes', href: '/moyennes' },
];

// ─── Composant StatCard ───────────────────────────────────────────────────────

function StatCard({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <Card>
            <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {icon}
                </div>
                <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="truncate text-sm font-semibold">{value}</p>
                </div>
            </CardContent>
        </Card>
    );
}

// ─── Composant principal ──────────────────────────────────────────────────────
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

    const selectedEnseignement = useMemo(
        () =>
            ENSEIGNEMENTS.find(
                (e) => e.id === Number(selectedEnseignementId),
            ) ?? null,
        [selectedEnseignementId],
    );

    const etudiants = useMemo(
        () =>
            selectedEnseignement ? getEtudiants(selectedEnseignement.id) : [],
        [selectedEnseignement],
    );

    const isReady = Boolean(
        selectedEnseignementId && selectedClasseId && selectedPeriodeId,
    );

    const stats = useMemo(() => {
        if (!isReady || etudiants.length === 0) return null;
        const moyennes = etudiants.map((e) => getMoyenne(e.notes));
        const valides = moyennes.filter((m): m is number => m !== null);
        const admis = valides.filter((m) => m >= 10).length;
        const moyenneClasse =
            valides.length > 0
                ? valides.reduce((a, b) => a + b, 0) / valides.length
                : 0;
        const max = valides.length > 0 ? Math.max(...valides) : 0;
        const min = valides.length > 0 ? Math.min(...valides) : 0;
        return { admis, total: etudiants.length, moyenneClasse, max, min };
    }, [etudiants, isReady]);

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

                {/* Statistiques */}
                {isReady && stats && (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <StatCard
                            icon={<Users className="h-4 w-4" />}
                            label="Étudiants"
                            value={String(stats.total)}
                        />
                        <StatCard
                            icon={<GraduationCap className="h-4 w-4" />}
                            label="Admis (≥ 10)"
                            value={`${stats.admis} / ${stats.total}`}
                        />
                        <StatCard
                            icon={<TrendingUp className="h-4 w-4" />}
                            label="Moyenne classe"
                            value={`${stats.moyenneClasse.toFixed(2)} / 20`}
                        />
                        <StatCard
                            icon={<BookOpen className="h-4 w-4" />}
                            label="Max / Min"
                            value={`${stats.max.toFixed(2)} / ${stats.min.toFixed(2)}`}
                        />
                    </div>
                )}

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
                                                            {moyenne.rang}{moyenne.rang == "1" ? "er" : "ème"}
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
