import { Cours, DataNiveau } from "@/types";

export interface Enseignement {
    id: number;
    cours: Cours;
    niveaux: DataNiveau[];
}