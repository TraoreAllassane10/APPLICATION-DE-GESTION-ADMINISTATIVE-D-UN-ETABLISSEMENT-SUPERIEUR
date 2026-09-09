export interface StatFinanciere {
    totalAttendu: number;
    totalPaye: number;
    resteAPayer: number;
    tauxRecouvrement: number;
}

export interface StatGlobales {
    totalEtudiants: 247;
    totalInscriptions: 231;
    totalEnseignants: 34;
    totalFilieres: 8;
    anneeEnCours: string;
}

export interface RepartitionNiveau {
    niveau: string;
    inscrits: number;
    couleur: string;
}