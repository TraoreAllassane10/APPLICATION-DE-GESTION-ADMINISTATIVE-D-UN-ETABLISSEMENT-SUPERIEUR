import { Etudiant } from '@/types';
import { Link } from '@inertiajs/react';
import { Briefcase, Phone, User, Users } from 'lucide-react';
import InfoRow from '../InfoRow';
import Section from '../Section';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ResponsableSection = ({ etudiant }: { etudiant: Etudiant }) => {
    return (
        <div className="space-y-6">
            {etudiant.nom_responsable ? (
                <Section title="Contact d'urgence">
                    <InfoRow
                        icon={Users}
                        label="Type"
                        value={etudiant.type_responsable}
                    />
                    <InfoRow
                        icon={User}
                        label="Nom"
                        value={etudiant.nom_responsable}
                    />
                    <InfoRow
                        icon={Phone}
                        label="Téléphone"
                        value={etudiant.numero_responsable}
                    />
                    <InfoRow
                        icon={Briefcase}
                        label="Profession"
                        value={etudiant.profession_responsable}
                    />
                </Section>
            ) : (
                <Alert className="border-muted bg-muted/40">
                    <Users className="h-4 w-4" />
                    <AlertDescription className="text-sm text-muted-foreground">
                        Aucun responsable renseigné.{' '}
                        <Link
                            href={`/etudiants/${etudiant.ip}/edit`}
                            className="underline"
                        >
                            Ajouter un responsable
                        </Link>
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
};

export default ResponsableSection;
