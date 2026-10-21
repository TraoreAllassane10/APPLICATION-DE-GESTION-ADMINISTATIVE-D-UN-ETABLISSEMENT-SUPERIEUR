export interface StatFinanciere {
    totalAttendu: number;
    totalPaye: number;
    resteAPayer: number;
    tauxRecouvrement: number;
}

export interface StatGlobales {
    totalEtudiants: number;
    totalInscriptions: number;
    totalEnseignants: number;
    totalFilieres: number;
    anneeEnCours: string;
    totalClasses: number;
}

export interface RepartitionNiveau {
    niveau: string;
    inscrits: number;
    couleur: string;
}