import { useState } from 'react';
import { fmt } from '@/utils/util';
import { ChevronDown, Download, PlusCircle } from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '../../../../components/ui/dropdown-menu';
import { Progress } from '../../../../components/ui/progress';
import { Separator } from '../../../../components/ui/separator';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../../../components/ui/table';
import ModalPaiement from '../../../paiement/components/ModalPaiement';
import { Inscription } from '../../types/inscription.types';
export default function TabFinancier({ ins }: { ins: Inscription }) {
    const [modalOpen, setModalOpen] = useState(false);

    const progression =
        ins.montant_total > 0
            ? Math.round(
                  (Number(ins.total_paiements) / ins.montant_total) * 100,
              )
            : 0;
    const reste = ins.montant_total - Number(ins.total_paiements);

    return (
        <div className="space-y-6">
            {/* KPI cards */}
            <div className="grid grid-cols-3 gap-3">
                {[
                    {
                        label: 'Total à payer',
                        value: fmt(ins.montant_total),
                        color: 'text-blue-600',
                        bg: 'bg-blue-50',
                    },
                    {
                        label: 'Montant payé',
                        value: fmt(Number(ins.total_paiements)),
                        color: 'text-emerald-600',
                        bg: 'bg-emerald-50',
                    },
                    {
                        label: 'Reste à payer',
                        value: fmt(reste),
                        color: reste > 0 ? 'text-rose-600' : 'text-emerald-600',
                        bg: reste > 0 ? 'bg-rose-50' : 'bg-emerald-50',
                    },
                ].map((item) => (
                    <div
                        key={item.label}
                        className={`rounded-xl p-4 ${item.bg} text-center`}
                    >
                        <p className="mb-1 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                            {item.label}
                        </p>
                        <p className={`text-lg font-bold ${item.color}`}>
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Barre de progression */}
            <Card>
                <CardContent className="space-y-2 p-4">
                    <div className="flex justify-between text-sm">
                        <span className="font-medium">
                            Progression des paiements
                        </span>
                        <span
                            className={`font-bold tabular-nums ${progression >= 100 ? 'text-emerald-600' : 'text-primary'}`}
                        >
                            {progression}%
                        </span>
                    </div>
                    <Progress value={progression} className="h-2.5" />
                </CardContent>
            </Card>

            {/* Historique */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-3">
                    <CardTitle className="text-sm font-semibold">
                        Historique des paiements
                    </CardTitle>

                    <div className="flex shrink-0 gap-2 place-items-center">
                        {reste === 0 ? (
                            <span className="font-bold text-red-500">
                                Solde
                            </span>
                        ) : (
                            <Button
                                size="sm"
                                className="h-8 gap-1.5"
                                onClick={() => setModalOpen(true)}
                            >
                                <PlusCircle className="h-3.5 w-3.5" /> Ajouter
                            </Button>
                        )}
                        <a
                            href={`/inscriptions/${ins.id}/recap-paiements`}
                            target="_blank"
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-1.5"
                            >
                                <Download className="h-3.5 w-3.5" /> Imprimer le
                                recap
                            </Button>
                        </a>
                    </div>
                </CardHeader>
                <Separator />
                {ins.paiements.length === 0 ? (
                    <CardContent className="py-8 text-center text-sm text-muted-foreground">
                        Aucun paiement enregistré.
                    </CardContent>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 hover:bg-muted/30">
                                <TableHead>Référence</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Mode de paiement</TableHead>
                                <TableHead className="text-right">
                                    Montant
                                </TableHead>
                                <TableHead className="text-right">
                                    Receveur
                                </TableHead>
                                <TableHead className="w-[100px]" />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ins.paiements.map((p) => (
                                <TableRow key={p.id} className="group">
                                    <TableCell className="font-mono text-xs text-muted-foreground">
                                        {p.reference}
                                    </TableCell>
                                    <TableCell className="text-md tabular-nums">
                                        {p.date_paiement}
                                    </TableCell>
                                    <TableCell className="text-md">
                                        {p.methode_paiement}
                                    </TableCell>
                                    <TableCell className="text-md text-right font-semibold text-emerald-600 tabular-nums">
                                        +{fmt(p.montant)}
                                    </TableCell>
                                    <TableCell className="text-md text-right">
                                        {p.nom_receveur}
                                    </TableCell>

                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 gap-1 opacity-0 transition-opacity group-hover:opacity-100"
                                                >
                                                    Reçu{' '}
                                                    <ChevronDown className="h-3 w-3" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="w-48"
                                            >
                                                <DropdownMenuItem asChild>
                                                    <a
                                                        href={`/paiements/${p.id}/recu`}
                                                        className="flex cursor-pointer items-center gap-2"
                                                        target="_blank"
                                                    >
                                                        <Download className="h-4 w-4" />{' '}
                                                        Télécharger le reçu
                                                    </a>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Card>

            <ModalPaiement
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                resteAPayer={reste}
                inscriptionId={ins.id}
            />
        </div>
    );
}
