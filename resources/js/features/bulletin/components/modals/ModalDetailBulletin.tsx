import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { formatRang } from '@/utils/util';
import { Award, Printer, Save, User } from 'lucide-react';
import { getMoyenneColor } from '../../helpers';
import { Bulletin } from '../../types/bulletin.types';

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

export default function ModalDetailBulletin({
    isModalOpen,
    onOpenChange,
    bulletin,
    onImprimerPDF,
    onEnregistrer,
    appreciationEditable,
    onAppreciationEditable,
}: ModalDetailBulletinProps) {
    if (!bulletin) return null;

    return (
        <Dialog open={isModalOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
                {/* Header Modal */}
                <DialogHeader className="p-6 pb-4 border-b">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <DialogTitle className="text-lg font-bold flex items-center gap-2">
                                <User className="size-5 text-primary" />
                                {bulletin.nom.toUpperCase()} {bulletin.prenom}
                            </DialogTitle>
                            <p className="text-xs text-muted-foreground mt-1">
                                Matricule : <span className="font-mono">{bulletin.etudiant_ip}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-3 bg-muted/30 p-2.5 rounded-lg border">
                            <div className="text-right">
                                <p className="text-[10px] text-muted-foreground uppercase font-semibold">Moyenne</p>
                                <p className={`text-base font-bold ${getMoyenneColor(bulletin.moyenne_generale!)}`}>
                                    {bulletin.moyenne_generale?.toFixed(2)} / 20
                                </p>
                            </div>
                            <div className="h-8 w-px bg-border" />
                            <div className="text-left">
                                <p className="text-[10px] text-muted-foreground uppercase font-semibold">Rang</p>
                                <p className="text-base font-bold text-foreground">
                                    {formatRang(bulletin.rang!)}
                                </p>
                            </div>
                        </div>
                    </div>
                </DialogHeader>

                {/* Corps Modal */}
                <div className="p-6 space-y-6 overflow-y-auto flex-1">
                    {/* Appréciation Générale */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                            <Award className="size-3.5 text-primary" />
                            Appréciation du Conseil de Classe
                        </label>
                        <Textarea
                            value={appreciationEditable}
                            onChange={(e) => onAppreciationEditable(e.target.value)}
                            placeholder="Saisissez l'appréciation globale de l'étudiant..."
                            className="text-sm min-h-[80px] resize-none"
                        />
                    </div>
                </div>

                {/* Footer Modal */}
                <DialogFooter className="p-4 border-t bg-muted/20 flex items-center justify-between sm:justify-between">
                    <Button variant="outline" size="sm" onClick={onImprimerPDF} className="gap-2">
                        <Printer className="size-4" />
                        Imprimer
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
                            Fermer
                        </Button>
                        <Button size="sm" onClick={onEnregistrer} className="gap-2">
                            <Save className="size-4" />
                            Enregistrer l'appréciation
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}