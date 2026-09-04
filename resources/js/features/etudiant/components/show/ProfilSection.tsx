import { Calendar, Clock, Globe, Hash, MapPin, User } from 'lucide-react';
import InfoRow from '../InfoRow';
import Section from '../Section';
import { Etudiant } from '../../types/etudiant.types';

const ProfilSection = ({ etudiant }: { etudiant: Etudiant }) => {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Section title="État civil">
                <InfoRow
                    icon={User}
                    label="Nom complet"
                    value={`${etudiant.civilite} ${etudiant.nom} ${etudiant.prenom} `}
                />
                <InfoRow
                    icon={Calendar}
                    label="Date de naissance"
                    value={new Date(etudiant.date_naissance).toLocaleDateString(
                        'fr-FR',
                    )}
                />
                <InfoRow
                    icon={MapPin}
                    label="Lieu de naissance"
                    value={etudiant.lieu_naissance}
                />
                <InfoRow
                    icon={Globe}
                    label="Nationalité"
                    value={etudiant.nationnalite}
                />
                <InfoRow
                    icon={Globe}
                    label="Pays de résidence"
                    value={etudiant.pays_residence}
                />
            </Section>

            <Section title="Identifiant">
                <InfoRow
                    icon={Hash}
                    label="IP (identifiant permanent)"
                    value={etudiant.ip}
                />
                <InfoRow
                    icon={Hash}
                    label="Matricule secondaire"
                    value={etudiant.matricule_secondaire}
                />
                <InfoRow icon={User} label="Statut" value={etudiant.statut} />
                <InfoRow
                    icon={Clock}
                    label="Enregistré le"
                    value={new Date(etudiant.created_at).toLocaleDateString(
                        'fr-FR',
                        {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                        },
                    )}
                />
            </Section>
        </div>
    );
};

export default ProfilSection;
