import { BookOpen, GraduationCap, Phone, User, Users } from "lucide-react";
import { ShowTabs } from "../types/etudiant.types";

export const TABS: ShowTabs[] = [
    { id: 'profil', label: 'Profil', icon: User },
    { id: 'academique', label: 'Académique', icon: BookOpen },
    { id: 'contact', label: 'Contact', icon: Phone },
    { id: 'responsable', label: 'Affiliation', icon: Users },
    { id: 'inscriptions', label: 'Inscriptions', icon: GraduationCap },
];