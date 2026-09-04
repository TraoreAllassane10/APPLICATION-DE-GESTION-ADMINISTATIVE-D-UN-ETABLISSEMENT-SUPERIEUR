import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { fmt } from '@/utils/util';
import {  GraduationCap } from 'lucide-react';
import { Inscription } from '@/features/inscription/types/inscription.types';
import { Link } from '@inertiajs/react';

interface InscriptionSectionProps {
    inscriptions: Inscription[];
}
const InscriptionSection = ({ inscriptions }: InscriptionSectionProps) => {
    return  <div className="space-y-4">
                        {inscriptions.length === 0 ? (
                            <Alert className="border-muted bg-muted/40">
                                <GraduationCap className="h-4 w-4" />
                                <AlertDescription className="text-sm text-muted-foreground">
                                    Aucune inscription enregistrée pour cet
                                    étudiant.{' '}
                                    <Link
                                        href="/inscriptions/create"
                                        className="underline"
                                    >
                                        Inscrire l'étudiant
                                    </Link>
                                </AlertDescription>
                            </Alert>
                        ) : (
                            inscriptions.map((ins) => {
                                return (
                                    <Card key={ins.id} className="shadow-sm">
                                        <CardContent className="p-4">
                                            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                                                <div className="space-y-1">
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="text-sm font-semibold">
                                                            {ins.annee.libelle}
                                                        </span>
                                                        {ins.niveaux.map(
                                                            (niveau) => (
                                                                <Badge
                                                                    variant="secondary"
                                                                    className="font-bold"
                                                                >
                                                                    {niveau.nom}
                                                                </Badge>
                                                            ),
                                                        )}
                                                        <span
                                                            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold`}
                                                        >
                                                            <span
                                                                className={`h-1.5 w-1.5 rounded-full`}
                                                            />
                                                            {ins.status}
                                                        </span>
                                                        <span className="text-xs text-muted-foreground">
                                                            {
                                                                ins.type_inscription
                                                            }
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground">
                                                        Scolarité :{' '}
                                                        {fmt(ins.montant_total)}
                                                    </p>
                                                </div>
                                                <Link
                                                    href={`/inscriptions/${ins.id}`}
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="gap-1.5"
                                                    >
                                                        Voir l'inscription
                                                    </Button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })
                        )}

                        <div className="pt-2 text-center">
                            <Link href="/inscriptions/create">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-1.5"
                                >
                                    <GraduationCap className="h-4 w-4" />
                                    Nouvelle inscription
                                </Button>
                            </Link>
                        </div>
                    </div>;
};

export default InscriptionSection;
