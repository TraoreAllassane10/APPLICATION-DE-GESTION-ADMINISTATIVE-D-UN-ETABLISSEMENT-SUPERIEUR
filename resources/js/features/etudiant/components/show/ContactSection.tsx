import { Etudiant } from '@/types';
import { Hash, Mail, MapPin, Phone, Shield } from 'lucide-react';
import InfoRow from '../InfoRow';
import Section from '../Section';

const ContactSection = ({ etudiant }: { etudiant: Etudiant }) => {
    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Section title="Coordonnées">
                <InfoRow icon={Mail} label="Email" value={etudiant.email} />
                <InfoRow
                    icon={Phone}
                    label="Téléphone / Contacts"
                    value={etudiant.contacts}
                />
                <InfoRow
                    icon={MapPin}
                    label="Adresse géographique"
                    value={etudiant.adresse_geographique}
                />
            </Section>

            <Section title="Pièce d'identité">
                <InfoRow
                    icon={Shield}
                    label="Nature de la pièce"
                    value={etudiant.nature_piece}
                />
                <InfoRow
                    icon={Hash}
                    label="Numéro de la pièce"
                    value={etudiant.numero_piece}
                />
            </Section>
        </div>
    );
};

export default ContactSection;
