import { Enseignement } from "@/features/enseignement/types/enseignement.types";

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
    enseignements: Enseignement[]
}