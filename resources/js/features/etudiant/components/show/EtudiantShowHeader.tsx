import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { Calendar, Hash, Mail, Pencil, Printer } from 'lucide-react';
import { Etudiant } from '../../types/etudiant.types';
import StatutBadge from '../StatutBadge';

const EtudiantShowHeader = ({ etudiant }: { etudiant: Etudiant }) => {
   
    const age =
        new Date().getFullYear() -
        new Date(etudiant.date_naissance).getFullYear();

    return (
        <Card className="overflow-hidden shadow-sm">
            <div className="h-1.5 bg-gradient-to-r from-primary to-primary/30" />
            <CardContent className="p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    {/* Avatar */}
                    <div
                        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold ${etudiant.genre === 'Féminin' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'} `}
                    >
                        {etudiant.photo ? (
                            <img
                                src={`/storage/${etudiant.photo}`}
                                className="h-16 w-16 rounded-full object-cover"
                            />
                        ) : (
                            <p>
                                {etudiant.nom[0]}
                                {etudiant.prenom[0]}
                            </p>
                        )}
                    </div>

                    {/* Infos principales */}
                    <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                            <h1 className="text-xl font-bold tracking-tight">
                                {etudiant.civilite} {etudiant.nom}{' '}
                                {etudiant.prenom}
                            </h1>
                            <StatutBadge statut={etudiant.statut} />
                            <Badge variant="outline" className="text-xs">
                                {etudiant.genre}
                            </Badge>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                <Hash className="h-3 w-3" />
                                <code className="font-mono text-xs">
                                    {etudiant.ip}
                                </code>
                            </span>
                            {etudiant.email && (
                                <span className="flex items-center gap-1">
                                    <Mail className="h-3 w-3" />{' '}
                                    {etudiant.email}
                                </span>
                            )}
                            <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(
                                    etudiant.date_naissance,
                                ).toLocaleDateString('fr-FR')}{' '}
                                ({age} ans)
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="shrink-0 space-x-2">
                        <a
                            href={`/etudiants/${etudiant.ip}/fiche`}
                            target="_blank"
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-1.5"
                            >
                                <Printer className="h-3.5 w-3.5" /> Fiche
                                d'identification
                            </Button>
                        </a>

                        <a
                            href={`/etudiants/${etudiant.ip}/certificat-scolarite`}
                            target="_blank"
                        >
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-1.5"
                            >
                                <Printer className="h-3.5 w-3.5" /> Certificat
                                de scolarité
                            </Button>
                        </a>

                        <Link href={`/etudiants/${etudiant.ip}/edit`}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="gap-1.5"
                            >
                                <Pencil className="h-3.5 w-3.5" /> Modifier
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default EtudiantShowHeader;
