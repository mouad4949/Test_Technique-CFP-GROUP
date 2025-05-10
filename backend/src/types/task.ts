// Définition des valeurs possibles pour le statut d'une tâche
export type TaskStatus = 'pending' | 'done';     
// Un statut ne peut être que 'pending' ou 'done'

// Interface représentant une tâche
export interface Task {
  id: string;               // Identifiant unique de la tâche
  title: string;            // Titre de la tâche
  description: string;      // Description de la tâche
  status: TaskStatus;       // Statut de la tâche ('pending' ou 'done')
}
