import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Inscription } from '@/features/inscription/types/inscription.types';
import { Link } from '@inertiajs/react';
import { ArrowRight, GraduationCap } from 'lucide-react';

interface DernieresInscriptionCardProps {
dernieres_inscriptions: Inscription[]
}

const DernieresInscriptionCard = ({dernieres_inscriptions} : DernieresInscriptionCardProps) => {
  return (
     <Card className="border-border/60 shadow-xs transition-all hover:shadow-md">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2 text-base font-semibold">
                                <GraduationCap className="h-4 w-4 text-violet-600" />
                                Dernières inscriptions
                            </CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 gap-1 text-xs text-muted-foreground hover:text-foreground"
                                asChild
                            >
                                <Link href="/inscriptions">
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
                                        Niveau
                                    </TableHead>
                                    <TableHead className="py-2.5 text-right text-xs font-semibold">
                                        Date
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dernieres_inscriptions.map((i) => (
                                    <TableRow
                                        key={i.id}
                                        className="border-border/40"
                                    >
                                        <TableCell className="py-3">
                                            <p className="text-sm leading-none font-medium text-foreground">
                                                {i.etudiant?.nom}{' '}
                                                {i.etudiant?.prenom}
                                            </p>
                                            <p className="mt-1 text-xs text-muted-foreground">
                                                <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">
                                                    {i.etudiant?.ip}
                                                </code>
                                            </p>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <Badge
                                                variant="secondary"
                                                className="text-[11px]"
                                            >
                                                {i.niveaux
                                                    ?.map((n: any) => n.nom)
                                                    .join(', ')}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-3 text-right text-xs text-muted-foreground tabular-nums">
                                            {new Date(
                                                i.created_at,
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
  )
}

export default DernieresInscriptionCard
