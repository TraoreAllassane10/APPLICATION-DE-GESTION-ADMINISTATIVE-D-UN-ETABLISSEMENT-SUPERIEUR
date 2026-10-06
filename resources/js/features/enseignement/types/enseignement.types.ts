import { Cours } from "@/features/cours/types/cours.types";
import { Professeur } from "@/features/professeur/types/professeur.types";
import { DataNiveau, Meta } from "@/types";

export interface EnseignementNiveauPivot {
    enseignement_id?: number;
    niveau_id?: number;
    coefficient: number | string;
}

export interface EnseignementNiveau extends DataNiveau {
    pivot?: EnseignementNiveauPivot;
}

export interface Enseignement {
    id: number;
    cours: Cours;
    niveaux: EnseignementNiveau[];
    professeur: Professeur;
}

export interface EnseignementData {
    data: Enseignement[];
    links: any;
}

export interface ClasseCoeffPayload {
    niveauId: number;
    coefficient: number;
}