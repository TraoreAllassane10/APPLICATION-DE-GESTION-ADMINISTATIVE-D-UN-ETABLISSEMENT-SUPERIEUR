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

