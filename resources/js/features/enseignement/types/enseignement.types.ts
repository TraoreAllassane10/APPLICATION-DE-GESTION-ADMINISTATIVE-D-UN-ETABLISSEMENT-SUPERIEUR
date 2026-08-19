import { Cours } from "@/features/cours/types/cours.types";
import { Professeur } from "@/features/professeur/types/professeur.types";
import { DataNiveau } from "@/types";

export interface Enseignement {
    id: number;
    cours: Cours;
    niveaux: DataNiveau[];
    professeur: Professeur;
}