export interface Moyenne {
    id: string;
    nom: string;
    prenom: string;
    evaluations: {
        id: number;
        note: number;
        note_maximale: number;
        coefficient: number;
    }[];
    total_notes: number;
    diviseur: number;
    moyenne: number;
    rang: string;
}