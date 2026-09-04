import { Clock } from "lucide-react";
import { Alert, AlertDescription } from "../../../../components/ui/alert";
import { Inscription } from "../../types/inscription.types";

export default function TabResultats({ ins }: { ins: Inscription }) {
    // const { moyenneS1, moyenneS2, decision, ues } = ins.resultats;

    // const moyenneColor = (m: number | null) => {
    //     if (m === null) return 'text-muted-foreground';
    //     return m >= 10 ? 'text-emerald-600' : 'text-rose-600';
    // };

    return (
        <div className="space-y-6">
            <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription className="text-md">
                    Fonctionnalités à venir.
                </AlertDescription>
            </Alert>
            {/* KPI moyennes */}
            {/* <div className="grid grid-cols-3 gap-3">
                {[
                    {
                        label: 'Moyenne S1',
                        value: moyenneS1 !== null ? `${moyenneS1}/20` : '—',
                        color: moyenneColor(moyenneS1),
                    },
                    {
                        label: 'Moyenne S2',
                        value: moyenneS2 !== null ? `${moyenneS2}/20` : '—',
                        color: moyenneColor(moyenneS2),
                    },
                    {
                        label: 'Décision',
                        value: decision ?? '—',
                        color:
                            decision === 'Admis(e)'
                                ? 'text-emerald-600'
                                : decision
                                  ? 'text-rose-600'
                                  : 'text-muted-foreground',
                    },
                ].map((item) => (
                    <Card key={item.label}>
                        <CardContent className="p-4 text-center">
                            <p className="mb-1 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                                {item.label}
                            </p>
                            <p className={`text-xl font-bold ${item.color}`}>
                                {item.value}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div> */}

            {/* Détail UEs */}
            {/* {ues.length > 0 ? (
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-semibold">
                            Détail par UE — Semestre 1
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 hover:bg-muted/30">
                                <TableHead>Code</TableHead>
                                <TableHead>Intitulé</TableHead>
                                <TableHead className="text-center">
                                    Crédits
                                </TableHead>
                                <TableHead className="text-right">
                                    Note
                                </TableHead>
                                <TableHead className="text-center">
                                    Statut
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {ues.map((ue) => (
                                <TableRow key={ue.code}>
                                    <TableCell className="font-mono text-xs text-muted-foreground">
                                        {ue.code}
                                    </TableCell>
                                    <TableCell className="text-sm">
                                        {ue.intitule}
                                    </TableCell>
                                    <TableCell className="text-center text-sm">
                                        {ue.credit}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <span
                                            className={`text-sm font-bold tabular-nums ${ue.note >= 10 ? 'text-emerald-600' : 'text-rose-600'}`}
                                        >
                                            {ue.note}/20
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge
                                            variant={
                                                ue.statut === 'Validé'
                                                    ? 'default'
                                                    : 'destructive'
                                            }
                                            className="text-xs"
                                        >
                                            {ue.statut}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            ) : (
                <Alert>
                    <Clock className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                        Les résultats académiques ne sont pas encore disponibles
                        pour cette inscription.
                    </AlertDescription>
                </Alert>
            )} */}
        </div>
    );
}