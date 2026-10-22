import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
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
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatRang } from '@/utils/util';
import {
    AlertTriangle,
    CheckCircle,
    CheckCircle2,
    Clock,
    Download,
    Eye,
    FileText,
    GraduationCap,
    MoreHorizontal,
    RefreshCw,
    Send,
    ShieldAlert,
    ShieldCheck,
    Trophy,
} from 'lucide-react';
import { useState } from 'react';
import { getMentionConfig, getMoyenneColor } from '../helpers';
import { Bulletin } from '../types/bulletin.types';

const getRangIcon = (rang: number | string | null) => {
    if (typeof rang !== 'number') return null;
    if (rang === 1) return <Trophy className="size-4 text-amber-500" />;
    if (rang === 2) return <Trophy className="size-4 text-slate-400" />;
    if (rang === 3) return <Trophy className="size-4 text-amber-700" />;
    return null;
};

const getStatutBadge = (statut: string) => {
    switch (statut) {
        case 'PUBLIE':
            return (
                <Badge className="border-emerald-200 bg-emerald-100 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 gap-1 font-normal">
                    <ShieldCheck className="size-3 text-emerald-600" />
                    Publié
                </Badge>
            );
        case 'VALIDE':
            return (
                <Badge className="border-blue-200 bg-blue-100 text-blue-800 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-400 gap-1 font-normal">
                    <CheckCircle className="size-3 text-blue-600" />
                    Validé
                </Badge>
            );
        default:
            return (
                <Badge variant="outline" className="border-amber-300 bg-amber-50 text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-400 gap-1 font-normal">
                    <Clock className="size-3 text-amber-600" />
                    Brouillon
                </Badge>
            );
    }
};

interface TableBulletinProps {
    bulletins: Bulletin[];
    onOpenDetail: (bulletin: Bulletin) => void;
    onRegenererIndividuel: (bulletin: Bulletin) => void;
    onValider: (bulletin: Bulletin) => void;
    onPublier: (bulletin: Bulletin) => void;
    actionLoadingId: number | null;
}

export default function TableBulletin({
    bulletins,
    onOpenDetail,
    onRegenererIndividuel,
    onValider,
    onPublier,
    actionLoadingId,
}: TableBulletinProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const totalPages = Math.ceil(bulletins.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedBulletins = bulletins.slice(
        startIndex,
        startIndex + itemsPerPage,
    );

    return (
        <Card className="border-border/60 shadow-xs">
            <CardHeader className="flex flex-row items-center justify-between pb-3 pt-4 px-6 border-b">
                <div className="flex items-center gap-2">
                    <GraduationCap className="size-4 text-primary" />
                    <span className="text-sm font-semibold">
                        Liste des étudiants ({bulletins.length})
                    </span>
                </div>
                <div className="text-xs text-muted-foreground">
                    Page {currentPage} sur {totalPages || 1}
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/40 hover:bg-muted/40 text-xs">
                            <TableHead className="w-20 text-center font-semibold">
                                Rang
                            </TableHead>
                            <TableHead className="w-28 font-semibold">
                                Matricule
                            </TableHead>
                            <TableHead className="font-semibold">
                                Nom &amp; Prénoms
                            </TableHead>
                            <TableHead className="text-center font-semibold">
                                Moyenne Gén.
                            </TableHead>
                            <TableHead className="text-center font-semibold">
                                Mention
                            </TableHead>
                            <TableHead className="text-center font-semibold">
                                Décision
                            </TableHead>
                            <TableHead className="text-center font-semibold">
                                Complétude
                            </TableHead>
                            <TableHead className="text-center font-semibold">
                                Statut
                            </TableHead>
                            <TableHead className="text-right font-semibold pr-6">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedBulletins.map((bulletin) => {
                            const mentionConfig = getMentionConfig(
                                bulletin.mention ?? 'Non évalué',
                            );
                            const isActionLoading =
                                actionLoadingId === bulletin.id;

                            return (
                                <TableRow
                                    key={bulletin.inscription_id}
                                    className="group cursor-pointer transition-colors hover:bg-muted/50"
                                    onClick={() => onOpenDetail(bulletin)}
                                >
                                    {/* Rang & Effectif */}
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            {typeof bulletin.rang === 'number' &&
                                                getRangIcon(bulletin.rang)}
                                            <span
                                                className={`text-xs font-bold ${
                                                    typeof bulletin.rang ===
                                                        'number' &&
                                                    bulletin.rang <= 3
                                                        ? 'text-amber-600 dark:text-amber-400'
                                                        : 'text-muted-foreground'
                                                }`}
                                            >
                                                {typeof bulletin.rang === 'number'
                                                    ? `${formatRang(bulletin.rang)} / ${bulletin.effectif_classe ?? '?'}`
                                                    : 'N/A'}
                                            </span>
                                        </div>
                                    </TableCell>

                                    {/* Matricule (IP) */}
                                    <TableCell>
                                        <span className="font-mono text-xs text-muted-foreground">
                                            {bulletin.etudiant_ip}
                                        </span>
                                    </TableCell>

                                    {/* Nom & Prénoms */}
                                    <TableCell>
                                        <div className="font-medium text-xs">
                                            <span className="uppercase text-foreground">
                                                {bulletin.nom}
                                            </span>{' '}
                                            <span className="text-muted-foreground">
                                                {bulletin.prenom}
                                            </span>
                                        </div>
                                    </TableCell>

                                    {/* Moyenne Générale */}
                                    <TableCell className="text-center">
                                        <span
                                            className={`text-xs ${
                                                bulletin.moyenne_generale !== null
                                                    ? getMoyenneColor(
                                                          bulletin.moyenne_generale,
                                                      )
                                                    : 'text-muted-foreground'
                                            }`}
                                        >
                                            {bulletin.moyenne_generale !== null
                                                ? `${bulletin.moyenne_generale} / 20`
                                                : 'Non calculée'}
                                        </span>
                                    </TableCell>

                                    {/* Mention */}
                                    <TableCell className="text-center">
                                        <Badge
                                            className={`${
                                                mentionConfig?.className ??
                                                'bg-muted text-muted-foreground'
                                            } py-0.5 text-[11px] font-normal`}
                                        >
                                            {bulletin.mention ?? 'Non évalué'}
                                        </Badge>
                                    </TableCell>

                                    {/* Décision Jury */}
                                    <TableCell className="text-center text-xs">
                                        <span
                                            className={`font-semibold ${
                                                bulletin.decision_jury === 'Admis'
                                                    ? 'text-emerald-600 dark:text-emerald-400'
                                                    : bulletin.decision_jury ===
                                                      'Ajourné'
                                                    ? 'text-rose-600 dark:text-rose-400'
                                                    : 'text-amber-600 dark:text-amber-400'
                                            }`}
                                        >
                                            {bulletin.decision_jury ?? 'En attente'}
                                        </span>
                                    </TableCell>

                                    {/* Indicateur de Complétude */}
                                    <TableCell className="text-center">
                                        {bulletin.is_complet ? (
                                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                                                <CheckCircle2 className="size-3" />
                                                Complet
                                            </span>
                                        ) : (
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <span className="inline-flex items-center gap-1 cursor-help rounded-md bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-700 dark:text-amber-400">
                                                            <AlertTriangle className="size-3 text-amber-600" />
                                                            {bulletin.matieres_manquantes
                                                                ?.length ?? 1}{' '}
                                                            manquante(s)
                                                        </span>
                                                    </TooltipTrigger>
                                                    <TooltipContent
                                                        side="top"
                                                        className="max-w-xs text-xs"
                                                    >
                                                        <p className="font-semibold text-rose-500">
                                                            Matières non évaluées :
                                                        </p>
                                                        <ul className="mt-1 list-disc pl-4 space-y-0.5">
                                                            {bulletin.matieres_manquantes?.map(
                                                                (m) => (
                                                                    <li
                                                                        key={
                                                                            m.enseignement_id
                                                                        }
                                                                    >
                                                                        {m.cours_nom}
                                                                    </li>
                                                                ),
                                                            )}
                                                        </ul>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )}
                                    </TableCell>

                                    {/* Statut officiel */}
                                    <TableCell className="text-center">
                                        {getStatutBadge(bulletin.statut)}
                                    </TableCell>

                                    {/* Actions */}
                                    <TableCell
                                        className="text-right pr-6"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex items-center justify-end gap-1.5">
                                            {/* Bouton Aperçu */}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() =>
                                                    onOpenDetail(bulletin)
                                                }
                                                className="h-7 px-2 text-xs gap-1"
                                                title="Consulter le relevé détaillé"
                                            >
                                                <Eye className="size-3.5" />
                                                Aperçu
                                            </Button>

                                            {/* Bouton PDF si généré */}
                                            {bulletin.id && (
                                                <a
                                                    href={`/bulletins/${bulletin.id}/telecharger-bulletin-pdf`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="h-7 px-2 text-xs gap-1"
                                                        title="Télécharger le PDF"
                                                    >
                                                        <FileText className="size-3.5" />
                                                        PDF
                                                    </Button>
                                                </a>
                                            )}

                                            {/* Menu contextuel pour les opérations d'état */}
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7"
                                                    >
                                                        <MoreHorizontal className="size-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="end"
                                                    className="w-48 text-xs"
                                                >
                                                    <DropdownMenuLabel>
                                                        Actions académiques
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuSeparator />

                                                    {/* Régénérer individuel */}
                                                    <DropdownMenuItem
                                                        disabled={
                                                            bulletin.statut ===
                                                            'PUBLIE'
                                                        }
                                                        onClick={() =>
                                                            onRegenererIndividuel(
                                                                bulletin,
                                                            )
                                                        }
                                                        className="gap-2"
                                                    >
                                                        <RefreshCw className="size-3.5 text-primary" />
                                                        Régénérer notes
                                                    </DropdownMenuItem>

                                                    {/* Valider si brouillon et complet */}
                                                    {bulletin.statut ===
                                                        'BROUILLON' && (
                                                        <DropdownMenuItem
                                                            disabled={
                                                                !bulletin.is_complet ||
                                                                isActionLoading
                                                            }
                                                            onClick={() =>
                                                                onValider(bulletin)
                                                            }
                                                            className="gap-2"
                                                        >
                                                            <CheckCircle className="size-3.5 text-blue-600" />
                                                            Valider le bulletin
                                                        </DropdownMenuItem>
                                                    )}

                                                    {/* Publier si validé et complet */}
                                                    {bulletin.statut ===
                                                        'VALIDE' && (
                                                        <DropdownMenuItem
                                                            disabled={
                                                                !bulletin.is_complet ||
                                                                isActionLoading
                                                            }
                                                            onClick={() =>
                                                                onPublier(bulletin)
                                                            }
                                                            className="gap-2 text-emerald-600 focus:text-emerald-700"
                                                        >
                                                            <Send className="size-3.5 text-emerald-600" />
                                                            Publier officiellement
                                                        </DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between border-t px-6 py-3">
                        <div className="text-xs text-muted-foreground">
                            Affichage de {startIndex + 1} à{' '}
                            {Math.min(
                                startIndex + itemsPerPage,
                                bulletins.length,
                            )}{' '}
                            sur {bulletins.length} étudiants
                        </div>
                        <div className="flex items-center gap-1">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage((p) => Math.max(1, p - 1))
                                }
                                className="h-7 text-xs"
                            >
                                Précédent
                            </Button>
                            <div className="text-xs font-medium px-2">
                                {currentPage} / {totalPages}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                    setCurrentPage((p) =>
                                        Math.min(totalPages, p + 1),
                                    )
                                }
                                className="h-7 text-xs"
                            >
                                Suivant
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
