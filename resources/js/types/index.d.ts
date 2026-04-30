import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface Role {
    name: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    roles?: Role[];
    [key: string]: unknown; // This allows for additional properties...
}

export type Statut = 'Actif' | 'Suspendu' | 'Terminé';
export type TypeInscription = 'Nouvelle' | 'Redoublement' | 'Transfert';

export interface Etudiant {
    ip: string;
    civilite: Civilite;
    genre: string;
    nom: string;
    prenom: string;

    statut: StatutEtudiant;

    email: string | null;
    pays_residence: string | null;
    etablissement_origine: string | null;
    annee_obtention_bac: string | null;
    serie_bac: string | null;
    numero_table_bac: string | null;
    contacts: string | null;
    nature_piece: NaturePiece | null;
    numero_piece: string | null;
    adresse_geographique: string | null;
    matricule_secondaire: string | null;

    type_responsable: string | null;
    nom_responsable: string | null;
    numero_responsable: string | null;
    profession_responsable: string | null;

    inscriptions: Inscription[];

    created_at: string;
    updated_at: string;
}

export type EtudiantFormData = Omit<
    Etudiant,
    'created_at' | 'updated_at' | inscriptions
>;

export interface StatsEtudiant {
    total: number;
    affecte: number;
    naff: number;
    reaffecte: number;
    transfert: number;
}

export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: {
        active: boolean;
        label: string;
        page: number;
        url: string;
    }[];
}

// Types Annee
export interface Annee {
    id: number;
    libelle: string;
    date_debut: string;
    date_fin: string;
}

export interface Annees {
    data: Annee[];
    meta: Meta;
}

// Types Niveau
export interface DataNiveau {
    id: number;
    nom: string;
    filiere: { nom: string };
}

export interface Niveau {
    data: DataNiveau[];
    meta: Meta;
}
export interface FiliereData {
    id: number;
    nom: string;
}

// Type Professeur
export interface Professeur {
    id: number;
    matricule: string;
    nom_prenom: string;
    sexe: string;
    date_naissance: string;
    pays: string;
    specialite: string;
    telephone: string;
    diplome: string;
    grade: number;
    statut: number;
    annee_prise_fonction: number;
    formation_continue: number;
    nombre_heure_cours_prevue: number;
    nombre_heure_cours_realise: number;
    annee_academiques: any;
}

export interface Cours {
    id: number;
    nom: string;
}

// Types Sites
export interface Site {
    id: number;
    nom: string;
}

// Types salle
export interface Salle {
    id: number;
    nom: string;
}

// Type Semaine
export interface Semaine {
    id: number;
    libelle: string;
    date_debut: string;
    date_fin: string;
}

// Type Horaire
export interface Horaire {
    id: number;
    heure_debut: string;
    heure_fin: string;
    index_order: number;
}

// Types Scolarite
export type TypeScolarite = 'Affecté' | 'Naff' | 'Licence';

export interface Scolarite {
    id: number;
    type: TypeScolarite;
    montant: number;
    annee: Annee;
    niveau: DataNiveau;
    annee_universitaire_id: number;
    niveau_id: number;
}

// Types Inscription
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

    etudiant?: Etudiant;
    niveaux?: DataNiveau[];
}

// Types Paiements
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

// Types Dashboard
export interface StatFinanciere {
    totalAttendu: number;
    totalPaye: number;
    resteAPayer: number;
    tauxRecouvrement: number;
}

export interface StatGlobales {
    totalEtudiants: 247;
    totalInscriptions: 231;
    totalEnseignants: 34;
    totalFilieres: 8;
    anneeEnCours: '2024-2025';
}

export interface RepartitionNiveau {
    niveau: string;
    inscrits: number;
    couleur: string;
}

// Historique des actions
export interface Activite {
    id: string;
    user: User;
    user_name: string;
    action: string;
    entite_type: string;
    entite_id: string | null;
    ancienne_valeur: any | null;
    nouvelle_valeur: any | null;
    created_at: string;
}

// ----------Gestion du personnel-------------
export interface Personnel {
    id: string;
    nom: string;
    prenom: string;
    genre: string;
    date_naissance: string;
    lieu_naissance: string;
    nationalite: string;
    matricule?: string;
    fonction: string;
    situation_matrimoniale: string;
    nombre_enfant: string;
    nombre_enfant_charge: string;
    telephone: string;
    email: string;
    bp: string;
    rib: string;
    proprietaire: boolean;
    nom_entreprise: string;
    numero_registre_commerce: string;

    formations: Formation[];
    experiences: Experience[];
    documents: Document[];
}

export type PersonnelFormData = Omit<
    Personnel | formations | experiences | documents
>;


export interface Formation {
    id: string;
    annee: string;
    diplome: string;
    ecole: string;
}

export interface Experience {
    id: number;
    annee: string;
    nom_ecole: string;
    fonction: string;
    nombre_annee_enseignement: string;
    matiere_enseignee: string;
}

export interface Document {
    id: number;
    nom: string;
    chemin: string;
}
