import { Etudiant } from "@/features/etudiant/types/etudiant.types";
import { Annee, DataNiveau, Paiement } from "@/types";

export type TypeInscription = 'Nouvelle' | 'Redoublement' | 'Transfert';

export interface Inscription {
    id: number;
    etudiant: Etudiant;
    annee: Annee;
    niveaux: DataNiveau[];
    date: string;
    taux_reduction: number;
    frais_annexe: number;
    montant_scolarite: number;
    montant_total: number;
    status: string | null;
    type_inscription: TypeInscription;
    paiements: Paiement[];
    total_paiements: string;

}

export type Tab = 'general' | 'financier' | 'resultats';

export type ShowTabs = {
    id: Tab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}