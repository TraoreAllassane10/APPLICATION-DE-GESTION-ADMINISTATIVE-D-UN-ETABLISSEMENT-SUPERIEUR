import { Cours } from '@/features/cours/types/cours.types';
import { Professeur } from '@/features/professeur/types/professeur.types';
import { DataNiveau, Periode } from '@/types';

export interface BulletinStats {
    total_etudiants: number;
    total_admis: number;
    total_ajourne: number;
    moyenne_classe: number;
}

export interface MatiereManquante {
    enseignement_id: number;
    cours_nom: string;
}

export type StatutBulletin = 'BROUILLON' | 'VALIDE' | 'PUBLIE';

export interface LigneEnseignement {
    id: number;
    cours_id: number;
    cours_nom: string;
    code?: string;
    type_enseignement?: string;
    professeur_nom?: string;
    coefficient: number;
    moyenne: number | null;
    appreciation: string;
    rang?: number | null;
    cours?: Cours;
    professeur?: Professeur;
    niveaux?: DataNiveau[];
    pivot?: {
        moyenne_generale_matiere: number | null;
        coefficient: number | null;
        appreciation_professeur: string | null;
    };
}

export interface Bulletin {
    id: number | null;
    inscription_id: number;
    etudiant_ip: string;
    nom: string;
    prenom: string;
    classe_nom?: string;
    periode_libelle?: string;
    annee_libelle?: string;
    moyenne_generale: number | null;
    mention: string | null;
    decision_jury: string | null;
    rang: number | string | null;
    effectif_classe: number | null;
    statut: StatutBulletin;
    is_complet: boolean;
    matieres_manquantes: MatiereManquante[];
    enseignements: LigneEnseignement[];
    periode_academique?: Periode;
}

export interface AnneeUniversitaire {
    id: number;
    libelle: string;
    date_debut: string;
    date_fin: string;
    estActive: boolean;
}
