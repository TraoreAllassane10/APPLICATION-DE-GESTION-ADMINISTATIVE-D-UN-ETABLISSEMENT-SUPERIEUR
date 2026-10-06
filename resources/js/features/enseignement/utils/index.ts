import { Enseignement } from "../types/enseignement.types";

export     const getEnseignementLabel = (item: Enseignement | null) => {
        if (!item) return '';
        const prof = item.professeur?.nom_prenom ?? 'Professeur inconnu';
        const coursNom = item.cours?.nom ?? 'Cours inconnu';
        return `${prof} - ${coursNom}`;
    };