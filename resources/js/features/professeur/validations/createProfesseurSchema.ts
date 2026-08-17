import { z } from 'zod';

export const createProfesseurSchema = z.object({
    option: z.string(),
    matricule: z.string().min(1, 'Le matricule est requis'),
    nom_prenom: z
        .string()
        .min(2, 'Le nom et prénom doit contenir au moins 2 caractères'),
    sexe: z.enum(["M", "F"]),
    date_naissance: z.string().min(1, 'La date de naissance est requise'),
    pays: z.string().min(1, 'Le pays est requis'),
    specialite: z.string().min(1, 'La spécialité est requise'),
    telephone: z.string().min(8, 'Numéro de téléphone invalide'),
    diplome: z.string().min(1, 'Le diplôme est requis'),
    grade: z.string().min(1, 'Le grade est requis'), // number().int().nonnegative()
    statut: z.string().min(1, 'Le statut est requis'), // number().int().nonnegative()
    annee_prise_fonction: z.string(), //
    formation_continue: z.string(),
    nombre_heure_cours_prevue: z.string(),
    nombre_heure_cours_realise: z.string(),
});

export type ProfesseurData = z.infer<typeof createProfesseurSchema>
