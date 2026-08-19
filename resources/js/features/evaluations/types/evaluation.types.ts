import { Enseignement } from '@/features/enseignement/types/enseignement.types';
import { Periode } from '@/types';

export interface EvaluationStoreData {
    enseignement_id: number;
    periode_academique_id: number;
    type: string;
    titre: string;
    date: string;
    coefficient: number;
    note_maximale: number;
}

export interface EvaluationUpdateData {
    type: string;
    titre: string;
    date: string;
    coefficient: number;
    note_maximale: number;
}

export interface Evaluation {
    id: number;
    enseignement_id: number;
    periode_academique_id: number;
    type: string;
    titre: string;
    date: string;
    coefficient: number;
    note_maximale: number;

    enseignement: Enseignement;
    periode_academique: Periode;
}
