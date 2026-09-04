import { Inscription } from "@/features/inscription/types/inscription.types";
import { Meta, User } from "@/types";

export interface Paiement {
    id: string;
    reference: string;
    date_paiement: string;
    methode_paiement: string;
    montant: number;
    receveur?: User;
    inscription?: Inscription;
    nom_receveur: string;
}

export interface paiementData {
    data: Paiement[];
    meta: Meta;
    links: any;
}