import { z } from 'zod'; 
// Import de la bibliothèque Zod pour valider les données de manière déclarative

// Schéma Zod pour valider les données lors de la création d'une tâche
export const taskSchema = z.object({
  title: z.string().min(1),                     // Le titre doit être une chaîne non vide
  description: z.string().min(1),               // La description doit aussi être une chaîne non vide
  status: z.enum(['pending', 'done']).default('pending'), // Le statut doit être 'pending' ou 'done' (valeur par défaut : 'pending')
});

// Schéma Zod pour valider uniquement le statut lors d'une mise à jour partielle
export const updateStatusSchema = z.object({
  status: z.enum(['pending', 'done']),          // Le statut doit être soit 'pending', soit 'done'
});

// Typage TypeScript basé sur le schéma de création de tâche
export type TaskInput = z.infer<typeof taskSchema>;         
// TaskInput correspond au type validé par taskSchema

// Typage TypeScript basé sur le schéma de mise à jour de statut
export type StatusInput = z.infer<typeof updateStatusSchema>;
// StatusInput correspond au type validé par updateStatusSchema
