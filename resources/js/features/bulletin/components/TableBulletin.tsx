import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Download, Eye, FileText, LockOpen, Trophy } from 'lucide-react';
import { formatRang, getMentionConfig, getMoyenneColor } from '../helpers';
import { Bulletin } from '../types/bulletin.types';

const getRangIcon = (rang: number) => {
    if (rang === 1) return <Trophy className="size-4 text-yellow-500" />;
    if (rang === 2) return <Trophy className="size-4 text-slate-400" />;
    if (rang === 3) return <Trophy className="size-4 text-amber-600" />;
    return null;
};


interface TableBulletinProps {
    bulletins: Bulletin[];
    onTelechargerTous: () => void;
    onOpenDetail: (bulletin: Bulletin) => void;
    onTelechargerPDF: (etudiant: Bulletin, e: React.MouseEvent) => void;
}

const TableBulletin = ({
    bulletins,
    onTelechargerTous,
    onOpenDetail,
    onTelechargerPDF,
}: TableBulletinProps) => {
    return (
        <Card>
            <CardHeader className="pb-0">
                {/* Barre statut + actions */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <LockOpen className="size-4 text-amber-500" />
                        <span className="text-sm font-medium">Statut :</span>
                        <Badge className="border-amber-200 bg-amber-100 text-amber-800 dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                            Brouillon (Non verrouillé)
                        </Badge>
                    </div>

                    <Button
                        id="btn-telecharger-tous"
                        variant="outline"
                        onClick={onTelechargerTous}
                        className="gap-2"
                    >
                        <Download className="size-4" />
                        Télécharger Tous (ZIP/PDF)
                    </Button>
                </div>

                {/* Sous-titre contextuel */}
                <p className="mt-2 text-xs text-muted-foreground">
                    Semestre 1 —1ère Année Finance
                </p>
            </CardHeader>

            <CardContent className="pt-4">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="w-16 text-center font-semibold">
                                Rang
                            </TableHead>
                            <TableHead className="font-semibold">
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
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bulletins.map((bulletin) => {
                            // const mentionConfig = getMentionConfig(
                            //     bulletin.mention?? "Passable",
                            // );
                            return (
                                <TableRow
                                    key={bulletin.id}
                                    className="group cursor-pointer transition-colors hover:bg-muted/60"
                                    onClick={() => onOpenDetail(bulletin)}
                                >
                                    {/* Rang */}
                                    <TableCell className="text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            {/* {getRangIcon(bulletin.rang!)} */}
                                            <span
                                                // className={`text-sm font-bold ${
                                                //     bulletin.rang <= 3
                                                //         ? 'text-amber-600 dark:text-amber-400'
                                                //         : 'text-muted-foreground'
                                                // }`}
                                            >
                                                {/* {formatRang(etudiant.rang)} */} 1
                                            </span>
                                        </div>
                                    </TableCell>

                                    {/* Matricule */}
                                    <TableCell>
                                        <span className="font-mono text-sm text-muted-foreground">
                                            {bulletin.etudiant_ip}
                                        </span>
                                    </TableCell>

                                    {/* Nom & Prénoms */}
                                    <TableCell>
                                        <div className="font-medium">
                                            <span className="uppercase">
                                                {bulletin.nom}
                                            </span>{' '}
                                            <span className="text-muted-foreground">
                                                {bulletin.prenom}
                                            </span>
                                        </div>
                                    </TableCell>

                                    {/* Moyenne */}
                                    <TableCell className="text-center">
                                        <span
                                            className={getMoyenneColor(
                                                bulletin.moyenne_generale!,
                                            )}
                                        >
                                            {bulletin.moyenne_generale}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {' '}
                                            / 20
                                        </span>
                                    </TableCell>

                                    {/* Mention */}
                                    {/* <TableCell className="text-center">
                                        <Badge
                                            className={mentionConfig.className}
                                        >
                                            {mentionConfig.label}
                                        </Badge>
                                    </TableCell> */}

                                    {/* Actions */}
                                    {/* <TableCell
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div className="flex items-center justify-center gap-2">
                                            <Button
                                                id={`btn-apercu-${etudiant.id}`}
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    onOpenDetail(etudiant)
                                                }
                                                className="h-7 gap-1.5 text-xs"
                                            >
                                                <Eye className="size-3" />
                                                Aperçu
                                            </Button>
                                            <Button
                                                id={`btn-pdf-${etudiant.id}`}
                                                variant="default"
                                                size="sm"
                                                onClick={(e) =>
                                                    onTelechargerPDF(
                                                        etudiant,
                                                        e,
                                                    )
                                                }
                                                className="h-7 gap-1.5 text-xs"
                                            >
                                                <FileText className="size-3" />
                                                PDF
                                            </Button>
                                        </div>
                                    </TableCell> */}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>

                {bulletins.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <FileText className="mb-3 size-12 text-muted-foreground/30" />
                        <p className="text-sm text-muted-foreground">
                            Aucun bulletin disponible pour cette sélection.
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                            Sélectionnez une période et une classe, puis cliquez
                            sur <strong>Recalculer</strong>.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default TableBulletin;
