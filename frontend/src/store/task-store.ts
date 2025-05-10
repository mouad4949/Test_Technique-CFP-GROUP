import { create } from "zustand"
import type { Task } from "../types/task"

// Interface qui définit la structure du store
// J'ai choisi Zustand car c'est beaucoup plus léger que Redux
// et parfait pour ce type d'application
interface TaskStore {
  selectedTask: Task | null // Tâche actuellement sélectionnée (pas utilisé pour l'instant mais prêt pour l'avenir)
  setSelectedTask: (task: Task | null) => void
  isAddTaskModalOpen: boolean // État d'ouverture du modal d'ajout de tâche
  openAddTaskModal: () => void
  closeAddTaskModal: () => void
  filterStatus: "toutes" | "en_attente" | "terminee" // Filtre actif pour les tâches
  setFilterStatus: (status: "toutes" | "en_attente" | "terminee") => void
}

// Création du store avec les valeurs par défaut et les actions
// J'aime la simplicité de Zustand comparé à Redux
export const useTaskStore = create<TaskStore>((set) => ({
  // État initial
  selectedTask: null,
  isAddTaskModalOpen: false,
  filterStatus: "toutes",
  
  // Actions pour modifier l'état
  // Chaque action est une fonction qui appelle "set" pour mettre à jour l'état
  setSelectedTask: (task) => set({ selectedTask: task }),
  openAddTaskModal: () => set({ isAddTaskModalOpen: true }),
  closeAddTaskModal: () => set({ isAddTaskModalOpen: false }),
  setFilterStatus: (status) => set({ filterStatus: status }),
}))