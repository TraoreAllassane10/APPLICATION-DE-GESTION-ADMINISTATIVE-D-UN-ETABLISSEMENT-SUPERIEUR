import { Calendar, CheckCircle2, Hash, Mail, Phone, User } from "lucide-react";
import { Separator } from "../../../../components/ui/separator";
import StatutInscriptionBadge from "../StatutInscriptionBadge";
import InfoField from "../InfoField";
import { Inscription } from "../../types/inscription.types";

export default function TabGeneral({ ins }: { ins: Inscription }) {
    return (
        <div className="space-y-6">
            <div>
                <p className="mb-3 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    Informations personnelles
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <InfoField
                        icon={User}
                        label="Nom complet"
                        value={`${ins.etudiant?.prenom} ${ins.etudiant?.nom}`}
                    />
                    <InfoField
                        icon={Hash}
                        label="Matricule"
                        value={ins.etudiant?.ip}
                    />
                    <InfoField
                        icon={Mail}
                        label="Email"
                        value={ins.etudiant?.email ?? 'aucun'}
                    />
                    <InfoField
                        icon={Phone}
                        label="Téléphone"
                        value={ins.etudiant?.contacts ?? ''}
                    />
                    <InfoField
                        icon={Calendar}
                        label="Date naissance"
                        value={ins.etudiant?.date_naissance}
                    />
                    <InfoField
                        icon={User}
                        label="Filière"
                        value={ins.niveaux && ins.niveaux[0].filiere.nom}
                    />
                </div>
            </div>

            <Separator />

            <div>
                <p className="mb-3 text-xs font-bold tracking-wider text-muted-foreground uppercase">
                    Informations académiques
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <InfoField
                        icon={Calendar}
                        label="Année universitaire"
                        value={ins.annee.libelle}
                    />
                    {ins.niveaux.map((niveau) => (
                        <InfoField
                            icon={Hash}
                            label="Niveau"
                            value={niveau.nom}
                        />
                    ))}
                    <InfoField
                        icon={User}
                        label="Type d'inscription"
                        value={ins.type_inscription}
                    />
                    <InfoField
                        icon={Calendar}
                        label="Date d'inscription"
                        value={ins.date}
                    />
                    <div className="flex items-start gap-3 rounded-lg bg-muted/40 p-3">
                        <div className="rounded-md border bg-background p-1.5">
                            <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                                Statut
                            </p>
                            <div className="mt-1">
                                <StatutInscriptionBadge statut={ins.status ?? 'Aucun'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}