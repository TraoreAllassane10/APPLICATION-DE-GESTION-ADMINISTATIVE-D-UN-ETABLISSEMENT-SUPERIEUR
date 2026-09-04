import { Inscription } from "@/features/inscription/types/inscription.types";
import { Meta } from "@/types";

export type StatutEtudiant = 'Affecté' | 'Naff' | 'Réaffecté' | 'Transfert';

export interface Etudiant {
    ip: string;
    civilite: string;
    genre: string;
    nom: string;
    prenom: string;
    date_naissance: string;
    lieu_naissance: string;
    nationnalite: string;
    statut: StatutEtudiant;
    email: string | null;
    pays_residence: string | null;
    etablissement_origine: string | null;
    annee_obtention_bac: string | null;
    serie_bac: string | null;
    numero_table_bac: string | null;
    contacts: string | null;
    nature_piece: string | null;
    numero_piece: string | null;
    adresse_geographique: string | null;
    matricule_secondaire: string | null;

    type_responsable: string | null;
    nom_responsable: string | null;
    numero_responsable: string | null;
    profession_responsable: string | null;

    photo: File | string | null;

    inscriptions: Inscription[];

    created_at: string;
    updated_at: string;
}

export type EtudiantFormData = Omit<
    Etudiant,
    'created_at' | 'updated_at'| 'photo' 
>;

export interface StatsEtudiant {
    total: number;
    affecte: number;
    naff: number;
    reaffecte: number;
    transfert: number;
}

export interface EtudiantData {
    data: Etudiant[];
    meta: Meta;
}

export type Tab = 'profil' | 'academique' | 'contact' | 'responsable' | 'inscriptions'; 
export type ShowTabs = {
    id: Tab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
}