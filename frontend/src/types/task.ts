import { z } from "zod"

// J'utilise Zod pour la validation - ça me permet de créer des types TS à partir des schémas
// C'est super pratique pour s'assurer que les données sont correctes
export const TaskSchema = z.object({
  id: z.string().or(z.number()), // Je supporte les deux formats d'ID car le backend peut renvoyer les deux
  title: z.string().min(1, "Le titre est obligatoire"), // Un titre vide n'a pas de sens, donc min(1)
  description: z.string(), // La description peut être vide, pas de souci
  status: z.enum(["en_attente", "terminee"]), // J'ai traduit les statuts en français pour l'UI
})

// Pour la création, pas besoin de l'ID puisqu'il est généré côté serveur
// J'utilise omit pour ne pas me répéter
export const CreateTaskSchema = TaskSchema.omit({ id: true })

// Pour les mises à jour, on ne change que le statut pour l'instant
// Si on veut ajouter d'autres champs modifiables plus tard, c'est facile à étendre
export const UpdateTaskSchema = z.object({
  status: z.enum(["en_attente", "terminee"]),
})

// Types TypeScript dérivés des schémas Zod - ça évite de définir les types deux fois
// J'adore cette fonctionnalité de Zod!
export type Task = z.infer<typeof TaskSchema>
export type CreateTask = z.infer<typeof CreateTaskSchema>
export type UpdateTask = z.infer<typeof UpdateTaskSchema>