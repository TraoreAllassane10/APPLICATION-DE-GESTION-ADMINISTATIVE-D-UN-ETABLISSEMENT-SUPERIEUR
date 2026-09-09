import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Paiement } from '@/features/paiement/types/paiement.types';
import { fmt } from '@/utils/util';
import { Link } from '@inertiajs/react';
import { ArrowRight, BadgeDollarSign } from 'lucide-react';

interface DerniersPaiementCardProps {
    derniers_paiements: Paiement[];
}

const DerniersPaiementCard = ({
    derniers_paiements,
}: DerniersPaiementCardProps) => {
    return (
        <Card className="border-border/60 shadow-xs transition-all hover:shadow-md">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base font-semibold">
                        <BadgeDollarSign className="h-4 w-4 text-emerald-600" />
                        Derniers paiements
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1 text-xs text-muted-foreground hover:text-foreground"
                        asChild
                    >
                        <Link href="/paiements">
                            Tout voir
                            <ArrowRight className="h-3 w-3" />
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border/40 bg-muted/40 hover:bg-muted/40">
                            <TableHead className="py-2.5 text-xs font-semibold">
                                Étudiant
                            </TableHead>
                            <TableHead className="py-2.5 text-xs font-semibold">
                                Montant
                            </TableHead>
                            <TableHead className="py-2.5 text-right text-xs font-semibold">
                                Date
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {derniers_paiements.map((p) => (
                            <TableRow key={p.id} className="border-border/40">
                                <TableCell className="py-3">
                                    <p className="text-sm leading-none font-medium text-foreground">
                                        {p.inscription?.etudiant?.nom}{' '}
                                        {p.inscription?.etudiant?.prenom}
                                    </p>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
                                            {p.inscription?.etudiant?.ip}
                                        </code>
                                        {p.inscription?.niveaux?.length
                                            ? ' · '
                                            : ''}
                                        {p.inscription?.niveaux
                                            ?.map((n: any) => n.nom)
                                            .join(', ')}
                                    </p>
                                </TableCell>
                                <TableCell className="py-3">
                                    <span className="text-sm font-bold text-emerald-600 tabular-nums dark:text-emerald-400">
                                        +{fmt(p.montant)}
                                    </span>
                                    <p className="text-[11px] text-muted-foreground">
                                        {p.methode_paiement}
                                    </p>
                                </TableCell>
                                <TableCell className="py-3 text-right text-xs text-muted-foreground tabular-nums">
                                    {new Date(
                                        p.date_paiement,
                                    ).toLocaleDateString('fr-FR', {
                                        day: '2-digit',
                                        month: 'short',
                                    })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default DerniersPaiementCard;
