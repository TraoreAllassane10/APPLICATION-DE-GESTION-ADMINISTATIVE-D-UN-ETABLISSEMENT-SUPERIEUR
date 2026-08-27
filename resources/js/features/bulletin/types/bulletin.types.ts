import { Cours } from '@/features/cours/types/cours.types';
import { Professeur } from '@/features/professeur/types/professeur.types';
import { DataNiveau, Inscription, Periode } from '@/types';

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
    inscription: Inscription;
    periode_academique: Periode;
    enseignements: LigneBulletin[];
    moyenne_generale: number | null;
    mention: string | null;
    decision_jury: string | null;
    rang: number | null;
    effectif_classe: number | null;
    statut: string;
}
