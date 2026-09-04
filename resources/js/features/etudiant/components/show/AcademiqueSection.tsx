import { Etudiant } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Calendar, FileText, Hash } from 'lucide-react';

import InfoRow from '../InfoRow';
import Section from '../Section';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AcademiqueSection = ({ etudiant }: { etudiant: Etudiant }) => {
    return (
        <div className="space-y-6">
            <Section title="Baccalauréat">
                <InfoRow
                    icon={BookOpen}
                    label="Établissement d'origine"
                    value={etudiant.etablissement_origine}
                />
                <InfoRow
                    icon={FileText}
                    label="Série"
                    value={etudiant.serie_bac}
                />
                <InfoRow
                    icon={Calendar}
                    label="Année d'obtention"
                    value={etudiant.annee_obtention_bac}
                />
                <InfoRow
                    icon={Hash}
                    label="N° de table"
                    value={etudiant.numero_table_bac}
                />
            </Section>

            {!etudiant.etablissement_origine && !etudiant.serie_bac && (
                <Alert className="border-muted bg-muted/40">
                    <BookOpen className="h-4 w-4" />
                    <AlertDescription className="text-sm text-muted-foreground">
                        Aucune information académique renseignée.{' '}
                        <Link
                            href={`/etudiants/${etudiant.ip}/edit`}
                            className="underline"
                        >
                            Compléter le profil
                        </Link>
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
};

export default AcademiqueSection;
