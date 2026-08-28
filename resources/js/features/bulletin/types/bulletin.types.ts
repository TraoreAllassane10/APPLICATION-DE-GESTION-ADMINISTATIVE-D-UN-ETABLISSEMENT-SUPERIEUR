import { Cours } from '@/features/cours/types/cours.types';
import { Professeur } from '@/features/professeur/types/professeur.types';
import { DataNiveau, Periode } from '@/types';

export interface BulletinStats {
    total_etudiants: number;
    total_admis: number;
    total_ajourne: number;
    moyenne_classe: number;
}

export type LigneBulletin = {
    id: number;
    cours: Cours;
    niveaux: DataNiveau[];
    professeur: Professeur;
    pivot: {
        moyenne_generale_matiere: number | null;
        coefficient: number | null;
        appreciation_professeur: string | null;
    };
};

export interface Bulletin {
    id: number;
    etudiant_ip: string;
    nom: string;
    prenom: string;
    periode_academique: Periode;
    enseignements: LigneBulletin[];
    moyenne_generale: number | null;
    mention: string | null;
    decision_jury: string | null;
    rang: number | null;
    effectif_classe: number | null;
    statut: string;
}
