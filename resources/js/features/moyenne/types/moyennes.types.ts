export interface Moyenne {
    id: string;
    inscription_id: number;
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
    moyenne_id: number;
    moyenne: number;
    rang: string;
    appreciation: string;
}