import { BarChart2, User, Wallet } from "lucide-react";
import { ShowTabs } from "../types/inscription.types";

export const TABS: ShowTabs[] = [
    { id: 'general', label: 'Informations générales', icon: User },
    { id: 'financier', label: 'Situation financière', icon: Wallet },
    { id: 'resultats', label: 'Résultats académiques', icon: BarChart2 },
];