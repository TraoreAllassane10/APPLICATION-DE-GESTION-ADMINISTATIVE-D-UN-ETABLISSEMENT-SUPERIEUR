import { fmt } from '@/utils/util';
import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import usePaiement from '@/hooks/usePaiement';

export default function ModalPaiement({
    open,
    onClose,
    resteAPayer,
    inscriptionId
}: {
    open: boolean;
    onClose: () => void;
    resteAPayer: number;
    inscriptionId: number;
}) {
    const [montant, setMontant] = useState('');
    const [date_paiement, setDatePaiement] = useState('');
    const [methode_paiement, setMethodePaiement] = useState('');
    const [reference, setReference] = useState('');

    const desactiveButtonSumbit =
        !montant ||
        Number(montant) <= 0 ||
        !date_paiement ||
        !methode_paiement ||
        !reference ||
        resteAPayer <= 0 ||
        Number(montant) > resteAPayer;

    const {createPaiement} = usePaiement();

    const handlePayment = async () => {
       await createPaiement(inscriptionId, {date_paiement, methode_paiement, reference, montant: Number(montant)});

        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Enregistrer un paiement</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-2">
                    <div className="flex justify-between rounded-lg bg-muted/50 p-3 text-sm">
                        <span className="text-muted-foreground">
                            Reste à payer
                        </span>
                        <span className="font-bold text-rose-600">
                            {fmt(resteAPayer)}
                        </span>
                    </div>
                    
                    <div className="space-y-2">
                        <Label>Date du paiement</Label>
                        <Input
                            type="date"
                            value={date_paiement}
                            onChange={(e) => setDatePaiement(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Reference du paiement</Label>
                        <Input
                            type="text"
                            placeholder="Ex : REF-2254582154"
                            value={reference}
                            onChange={(e) => setReference(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Methode de paiement</Label>
                        <Input
                            type="text"
                            placeholder="Ex : Wave"
                            value={methode_paiement}
                            onChange={(e) => setMethodePaiement(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Montant (FCFA)</Label>
                        <Input
                            type="number"
                            placeholder="Ex : 50 000"
                            value={montant}
                            onChange={(e) => setMontant(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button
                        onClick={handlePayment}
                        disabled={desactiveButtonSumbit}
                        className="gap-2"
                    >
                        <CheckCircle2 className="h-4 w-4" /> Confirmer
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
