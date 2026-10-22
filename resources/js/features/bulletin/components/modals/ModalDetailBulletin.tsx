import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatRang } from '@/utils/util';
import {
    AlertTriangle,
    Calendar,
    CheckCircle,
    FileText,
    GraduationCap,
    RefreshCw,
    Send,
    User,
} from 'lucide-react';
import { getMentionConfig, getMoyenneColor } from '../../helpers';
import { Bulletin } from '../../types/bulletin.types';

interface ModalDetailBulletinProps {
    isModalOpen: boolean;
    onOpenChange: (open: boolean) => void;
    bulletin: Bulletin | null;
    classeNom?: string;
    periodeLibelle?: string;
    anneeLibelle?: string;
    onRegenerer: (bulletin: Bulletin) => void;
    onValider: (bulletin: Bulletin) => void;
    onPublier: (bulletin: Bulletin) => void;
    isGenerating: boolean;
    isActionLoading: boolean;
}

export default function ModalDetailBulletin({
    isModalOpen,
    onOpenChange,
    bulletin,
    classeNom,
    periodeLibelle,
    anneeLibelle,
    onRegenerer,
    onValider,
    onPublier,
    isGenerating,
    isActionLoading,
}: ModalDetailBulletinProps) {
    if (!bulletin) return null;

    const mentionConfig = getMentionConfig(bulletin.mention ?? 'Non évalué');

    // Calcul des totaux pour le tableau des notes
    let totalPoints = 0;
    let totalCoefficients = 0;

    bulletin.enseignements?.forEach((ens) => {
        const coef = ens.coefficient || 1;
        if (ens.moyenne !== null && ens.moyenne !== undefined) {
            totalPoints += ens.moyenne * coef;
            totalCoefficients += coef;
        }
    });

    return (
        <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
            <DialogContent className="flex max-h-[92vh] max-w-4xl flex-col gap-0 overflow-hidden p-0">
                {/* Header Modal */}
                <DialogHeader className="border-b bg-card p-6 pb-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-2">
                                <User className="size-5 text-primary" />
                                <DialogTitle className="text-lg font-bold tracking-tight">
                                    {bulletin.nom.toUpperCase()}{' '}
                                    {bulletin.prenom}
                                </DialogTitle>
                                <Badge
                                    variant="outline"
                                    className="font-mono text-xs"
                                >
                                    {bulletin.etudiant_ip}
                                </Badge>
                            </div>

                            <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <GraduationCap className="size-3.5" />
                                    {classeNom ?? 'Classe'}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="size-3.5" />
                                    {periodeLibelle ?? 'Période'} —{' '}
                                    {anneeLibelle ?? 'Année active'}
                                </span>
                            </div>
                        </div>

                        {/* Bloc Statistiques Clés */}
                        <div className="flex items-center gap-3 rounded-lg border bg-muted/40 p-2.5">
                            <div className="text-right">
                                <p className="text-[10px] font-semibold text-muted-foreground uppercase">
                                    Moyenne Générale
                                </p>
                                <p
                                    className={`text-base font-bold ${
                                        bulletin.moyenne_generale !== null
                                            ? getMoyenneColor(
                                                  bulletin.moyenne_generale,
                                              )
                                            : 'text-muted-foreground'
                                    }`}
                                >
                                    {bulletin.moyenne_generale !== null
                                        ? `${bulletin.moyenne_generale} / 20`
                                        : 'N/A'}
                                </p>
                            </div>
                            <div className="h-8 w-px bg-border" />
                            <div className="text-center">
                                <p className="text-[10px] font-semibold text-muted-foreground uppercase">
                                    Rang
                                </p>
                                <p className="text-base font-bold text-foreground">
                                    {typeof bulletin.rang === 'number'
                                        ? `${formatRang(bulletin.rang)} / ${
                                              bulletin.effectif_classe ?? '?'
                                          }`
                                        : 'N/A'}
                                </p>
                            </div>
                            <div className="h-8 w-px bg-border" />
                            <div className="text-left">
                                <p className="text-[10px] font-semibold text-muted-foreground uppercase">
                                    Mention
                                </p>
                                <Badge
                                    className={`${
                                        mentionConfig?.className ?? 'bg-muted'
                                    } py-0.5 text-[11px] font-normal`}
                                >
                                    {bulletin.mention ?? 'Non évalué'}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                {/* Corps Modal */}
                <div className="flex-1 space-y-5 overflow-y-auto p-6">
                    {/* Alerte si bulletin incomplet */}
                    {!bulletin.is_complet && (
                        <div className="flex items-start gap-3 rounded-lg border border-amber-300 bg-amber-50/80 p-3.5 text-xs text-amber-900 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-300">
                            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" />
                            <div className="space-y-1">
                                <p className="font-semibold">
                                    Résultats incomplets : validation et
                                    publication impossibles
                                </p>
                                <p className="text-amber-800 dark:text-amber-400">
                                    Ce bulletin comporte{' '}
                                    {bulletin.matieres_manquantes?.length ?? 1}{' '}
                                    matière(s) sans moyenne enregistrée.
                                    Conformément aux règles académiques, un
                                    bulletin incomplet ne peut pas être validé
                                    ni publié.
                                </p>
                                <ul className="list-disc space-y-0.5 pt-1 pl-4 font-medium">
                                    {bulletin.matieres_manquantes?.map((m) => (
                                        <li key={m.enseignement_id}>
                                            {m.cours_nom}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Tableau des Enseignements */}
                    <div className="overflow-hidden rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50 text-xs">
                                    <TableHead className="font-semibold">
                                        Matière / Cours
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Type
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Enseignant
                                    </TableHead>
                                    <TableHead className="w-16 text-center font-semibold">
                                        Coef
                                    </TableHead>
                                    <TableHead className="w-24 text-center font-semibold">
                                        Moyenne
                                    </TableHead>
                                    <TableHead className="w-24 text-center font-semibold">
                                        Moy × Coef
                                    </TableHead>
                                    <TableHead className="font-semibold">
                                        Appréciation
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bulletin.enseignements?.map((ens) => {
                                    const coef = ens.coefficient || 1;
                                    const moy = ens.moyenne;
                                    const moyCoef =
                                        moy !== null && moy !== undefined
                                            ? (moy * coef).toFixed(2)
                                            : 'NC';

                                    return (
                                        <TableRow
                                            key={ens.id}
                                            className="text-xs"
                                        >
                                            <TableCell className="font-medium">
                                                {ens.cours_nom}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {ens.type_enseignement ??
                                                    'Général'}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {ens.professeur_nom ??
                                                    'Non assigné'}
                                            </TableCell>
                                            <TableCell className="text-center font-semibold">
                                                {coef}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                {moy !== null &&
                                                moy !== undefined ? (
                                                    <span
                                                        className={getMoyenneColor(
                                                            moy,
                                                        )}
                                                    >
                                                        {moy.toFixed(2)}
                                                    </span>
                                                ) : (
                                                    <Badge
                                                        variant="outline"
                                                        className="border-rose-200 text-[10px] text-rose-500"
                                                    >
                                                        Manquante
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center font-mono">
                                                {moyCoef}
                                            </TableCell>
                                            <TableCell className="text-muted-foreground italic">
                                                {ens.appreciation || '—'}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}

                                {/* Ligne Total */}
                                <TableRow className="border-t-2 bg-muted/30 text-xs font-semibold">
                                    <TableCell colSpan={3}>
                                        TOTAL ACADÉMIQUE
                                    </TableCell>
                                    <TableCell className="text-center">
                                        {totalCoefficients}
                                    </TableCell>
                                    <TableCell className="text-center text-primary">
                                        {bulletin.moyenne_generale !== null
                                            ? bulletin.moyenne_generale
                                            : 'NC'}
                                    </TableCell>
                                    <TableCell className="text-center font-mono">
                                        {totalPoints.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        Décision jury :{' '}
                                        <span className="font-bold">
                                            {bulletin.decision_jury ??
                                                'En attente'}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <div className="flex items-center justify-between rounded-md border bg-muted/20 p-3 text-xs text-muted-foreground">
                        <span>
                            Statut actuel du document :{' '}
                            <strong>{bulletin.statut}</strong>
                        </span>
                        <span>
                            Les moyennes des matières proviennent des
                            évaluations officielles et ne sont pas directement
                            modifiables ici.
                        </span>
                    </div>
                </div>

                {/* Footer Modal avec actions */}
                <DialogFooter className="flex flex-col items-center justify-between gap-2 border-t bg-card p-4 sm:flex-row">
                    <div className="flex items-center gap-2">
                        {bulletin.id && (
                            <a
                                href={`/bulletins/${bulletin.id}/telecharger-bulletin-pdf`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1.5 text-xs"
                                >
                                    <FileText className="size-3.5" />
                                    Télécharger le PDF
                                </Button>
                            </a>
                        )}

                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={
                                bulletin.statut === 'PUBLIE' || isGenerating
                            }
                            onClick={() => onRegenerer(bulletin)}
                            className="gap-1.5 text-xs"
                        >
                            <RefreshCw
                                className={`size-3.5 ${
                                    isGenerating ? 'animate-spin' : ''
                                }`}
                            />
                            Régénérer notes
                        </Button>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Bouton Valider si Brouillon */}
                        {bulletin.statut === 'BROUILLON' && (
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={
                                    !bulletin.is_complet || isActionLoading
                                }
                                onClick={() => onValider(bulletin)}
                                className="gap-1.5 text-xs text-blue-600 hover:text-blue-700"
                            >
                                <CheckCircle className="size-3.5" />
                                Valider officiellement
                            </Button>
                        )}

                        {/* Bouton Publier si Validé */}
                        {bulletin.statut === 'VALIDE' && (
                            <Button
                                size="sm"
                                disabled={
                                    !bulletin.is_complet || isActionLoading
                                }
                                onClick={() => onPublier(bulletin)}
                                className="gap-1.5 bg-emerald-600 text-xs text-white hover:bg-emerald-700"
                            >
                                <Send className="size-3.5" />
                                Publier le bulletin
                            </Button>
                        )}

                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => onOpenChange(false)}
                            className="text-xs"
                        >
                            Fermer
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
