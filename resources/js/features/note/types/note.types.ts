export interface EtudiantNote {
    id: number;
    nom: string;
    note: number | null;
    absent: boolean;
}

export interface NoteUpdate {
    evaluation_id: number;
    notes: {
        inscription_id: number;
        valeur: number | null;
        est_absent: boolean;
    }[];
}

export interface Note {
    id: number;
    inscription_id: number;
    valeur: number | null;
    est_absent: boolean;
}
