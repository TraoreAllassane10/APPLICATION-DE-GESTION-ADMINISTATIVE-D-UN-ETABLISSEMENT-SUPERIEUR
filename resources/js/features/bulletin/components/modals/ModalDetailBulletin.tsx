import {
    Dialog,
    DialogClose,
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

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Printer, Save, Trophy } from 'lucide-react';
import { formatRang, getMentionConfig, getMoyenneColor } from '../../helpers';
import { Bulletin } from '../../types/bulletin.types';

type Mention = 'Très Bien' | 'Bien' | 'Assez Bien' | 'Passable' | 'Ajourné';

interface BulletinEtudiant {
    id: number;
    rang: number;
    matricule: string;
    nom: string;
    prenom: string;
    moyenneGenerale: number;
    mention: Mention;
}

interface LigneMatiere {
    matiere: string;
    coefficient: number;
    moyenne: number;
    totalPoints: number;
    appreciation: string;
}

interface DetailBulletin {
    etudiantId: number;
    totalEtudiants: number;
    appreciationGenerale: string;
    matieres: LigneMatiere[];
}

interface ModalDetailBulletinProps {
    isModalOpen: boolean;
    onOpenChange: (open: boolean) => void;
    bulletin: Bulletin | null;
    detailActif: number | null;
    onImprimerPDF: () => void;
    onEnregistrer: () => void;
    appreciationEditable: string;
    onAppreciationEditable: (appreciation: string) => void;
}

const getRangIcon = (rang: number) => {
    if (rang === 1) return <Trophy className="size-4 text-yellow-500" />;
    if (rang === 2) return <Trophy className="size-4 text-slate-400" />;
    if (rang === 3) return <Trophy className="size-4 text-amber-600" />;
    return null;
};

function ModalDetailBulletin({
    isModalOpen,
    onOpenChange,
    bulletin,
    detailActif,
    onImprimerPDF,
    onEnregistrer,
    appreciationEditable,
    onAppreciationEditable,
}: ModalDetailBulletinProps) {
    console.log(bulletin)
    return (
        <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
            <DialogContent className="min-w-[90vw]">
                {bulletin && detailActif && (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-base font-semibold">
                                Détail du Bulletin —{' '}
                                <span className="uppercase">
                                    {bulletin.nom}
                                </span>{' '}
                                {bulletin.prenom}
                                <span className="ml-2 text-sm font-normal text-muted-foreground">
                                    (1ère Année Finance)
                                </span>
                            </DialogTitle>
                        </DialogHeader>

                        {/* Résumé en-tête */}
                        {/* <div className="flex flex-wrap items-center gap-4 rounded-lg border bg-muted/40 px-4 py-3">
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground">
                                    Moyenne Générale
                                </span>
                                <span
                                    className={`text-xl font-bold ${getMoyenneColor(selectedEtudiant.moyenneGenerale)}`}
                                >
                                    {selectedEtudiant.moyenneGenerale.toFixed(
                                        2,
                                    )}
                                    <span className="text-sm font-normal text-muted-foreground">
                                        {' '}
                                        / 20
                                    </span>
                                </span>
                            </div>
                            <Separator
                                orientation="vertical"
                                className="h-10"
                            />
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground">
                                    Rang
                                </span>
                                <span className="flex items-center gap-1 text-xl font-bold">
                                    {getRangIcon(selectedEtudiant.rang)}
                                    {formatRang(selectedEtudiant.rang)}
                                    <span className="text-sm font-normal text-muted-foreground">
                                        / {detailActif.totalEtudiants}
                                    </span>
                                </span>
                            </div>
                            <Separator
                                orientation="vertical"
                                className="h-10"
                            />
                            <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground">
                                    Mention
                                </span>
                                <Badge
                                    className={`mt-1 ${getMentionConfig(selectedEtudiant.mention).className}`}
                                >
                                    {
                                        getMentionConfig(
                                            selectedEtudiant.mention,
                                        ).label
                                    }
                                </Badge>
                            </div>
                        </div> */}

                        {/* Tableau des matières */}
                        <div className="overflow-hidden rounded-lg border">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/50">
                                        <TableHead className="font-semibold">
                                            Matière / Enseignement
                                        </TableHead>
                                        <TableHead className="w-20 text-center font-semibold">
                                            Coeff
                                        </TableHead>
                                        <TableHead className="w-28 text-center font-semibold">
                                            Moyenne / 20
                                        </TableHead>
                                        <TableHead className="w-28 text-center font-semibold">
                                            Total Points
                                        </TableHead>
                                        <TableHead className="font-semibold">
                                            Appréciation
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bulletin.enseignements?.map((ligne) => (
                                        <TableRow key={ligne.id}>
                                            <TableCell className="font-medium">
                                                {ligne.cours.nom}
                                            </TableCell>
                                            <TableCell className="text-center text-muted-foreground">
                                                {ligne.pivot.coefficient ?? 1}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <span
                                                    // className={getMoyenneColor(
                                                    //     ligne.moyenne,
                                                    // )}
                                                >
                                                    {ligne.pivot.moyenne_generale_matiere?? "aucune"}
                                                </span>
                                            </TableCell>
                                            {/* <TableCell className="text-center font-mono text-sm">
                                                {ligne.totalPoints.toFixed(2)}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground italic">
                                                {ligne.appreciation}
                                            </TableCell> */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Appréciation générale */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Appréciation Générale du Conseil
                            </label>
                            <Textarea
                                id="appreciation-generale"
                                value={appreciationEditable}
                                onChange={(e) =>
                                    onAppreciationEditable(e.target.value)
                                }
                                rows={3}
                                placeholder="Saisissez l'appréciation générale du conseil de classe..."
                                className="resize-none"
                            />
                        </div>

                        <DialogFooter className="gap-2 sm:gap-2">
                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    id="btn-modal-annuler"
                                >
                                    Annuler
                                </Button>
                            </DialogClose>
                            <Button
                                id="btn-modal-imprimer"
                                variant="outline"
                                onClick={onImprimerPDF}
                                className="gap-2"
                            >
                                <Printer className="size-4" />
                                Imprimer PDF
                            </Button>
                            <Button
                                id="btn-modal-enregistrer"
                                onClick={onEnregistrer}
                                className="gap-2"
                            >
                                <Save className="size-4" />
                                Enregistrer
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default ModalDetailBulletin;
