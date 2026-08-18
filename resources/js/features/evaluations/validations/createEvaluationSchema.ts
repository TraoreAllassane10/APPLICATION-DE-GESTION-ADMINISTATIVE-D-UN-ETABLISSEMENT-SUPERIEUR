import z from "zod";

export const createEvaluationSchema = z.object({
  enseignement_id: z.string().min(1, "Veuillez selectionner un enseignement."),
  periode: z.string().min(1, "Veuillez selectionner la période académique"),
  type: z.string().min(1, "Veuillez selectionner le type d'évaluation"),
  titre: z.string().min(3, "Titre trop court"),
  date: z.string().min(1, "Veuillez selectionner la date d'evaluation"),
  coefficient: z.number().min(1, "Veuillez saisir le coefficient"),
  note_maximale: z.number().min(1, "Veuillez saisir la note maximale"),
});

export type createEvaluationData = z.infer<typeof createEvaluationSchema>;