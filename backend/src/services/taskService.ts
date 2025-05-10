import { Task } from '../types/task';          // Type pour les tâches
import { randomUUID } from 'crypto';           // Génère un identifiant unique
import { taskSchema, updateStatusSchema } from '../schemas/taskSchema'; // Import des schémas Zod

// Tableau en mémoire pour stocker les tâches
let tasks: Task[] = [];

/**
 * Récupère toutes les tâches
 * @returns Liste des tâches
 */
export const getAllTasks = (): Task[] => tasks;

/**
 * Ajoute une nouvelle tâche après validation avec Zod
 * @param title - Titre de la tâche
 * @param description - Description de la tâche
 * @returns La tâche nouvellement créée
 * @throws Erreur si les données sont invalides
 */
export const addTask = (title: string, description: string): Task => {
  // Validation des données d'entrée
  const parsed = taskSchema.safeParse({ title, description });

  if (!parsed.success) {
    throw new Error('Invalid task data'); // Données invalides : titre ou description vide
  }

  // Création de la nouvelle tâche
  const newTask: Task = {
    id: randomUUID(),                      // ID unique
    title,                                 // Titre validé
    description,                           // Description validée
    status: 'pending'                      // Statut par défaut
  };

  tasks.push(newTask);                     // Ajoute la tâche au tableau
  return newTask;                          // Retourne la tâche créée
};

/**
 * Supprime une tâche selon son ID
 * @param id - L'ID de la tâche à supprimer
 * @returns true si la tâche a été supprimée, false sinon
 */
export const deleteTask = (id: string): boolean => {
  const index = tasks.findIndex(t => t.id === id); // Recherche l’index de la tâche
  if (index === -1) return false;                  // Si tâche introuvable
  tasks.splice(index, 1);                          // Supprime la tâche
  return true;                                     // Indique succès
};

/**
 * Met à jour le statut d'une tâche après validation avec Zod
 * @param id - L'ID de la tâche
 * @param status - Le nouveau statut ('pending' ou 'done')
 * @returns true si la mise à jour a réussi, false sinon
 * @throws Erreur si le statut est invalide
 */
export const updateTaskStatus = (id: string, status: Task['status']): boolean => {
  // Validation du statut
  const parsed = updateStatusSchema.safeParse({ status });
  if (!parsed.success) {
    throw new Error('Invalid status value'); // Statut invalide
  }

  const task = tasks.find(t => t.id === id);       // Cherche la tâche
  if (!task) return false;                         // Si tâche introuvable
  task.status = status;                            // Mise à jour du statut
  return true;                                     // Indique succès
};
