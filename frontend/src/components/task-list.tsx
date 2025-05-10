import type React from "react"
import { useQuery } from "@tanstack/react-query"
import { tasksApi } from "../api/tasks-api"
import { TaskItem } from "./task-item"
import type { Task } from "../types/task"
import { useTaskStore } from "../store/task-store"
import { TaskFilter } from "./task-filter"

export const TaskList: React.FC = () => {
  // Récupération du filtre actif depuis le store
  const { filterStatus } = useTaskStore()

  // Récupération des tâches avec React Query
  // J'adore comment React Query gère les états de chargement et d'erreur
  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tasks"], // Clé de cache
    queryFn: tasksApi.getTasks, // Fonction qui récupère les données
  })

  // Filtrage des tâches selon le statut sélectionné
  // Je fais ça côté client pour éviter des appels API supplémentaires
  const filteredTasks = tasks?.filter((task) => {
    if (filterStatus === "toutes") return true
    return task.status === filterStatus
  })

  // Affichage pendant le chargement
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Affichage en cas d'erreur
  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg my-6">
        <div className="flex flex-col sm:flex-row">
          <div className="py-1 sm:mr-3">
            <svg className="h-6 w-6 text-red-500 mx-auto sm:mx-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text-center sm:text-left mt-2 sm:mt-0">
            <p className="font-medium">Erreur lors du chargement des tâches</p>
            <p className="text-sm">{error instanceof Error ? error.message : "Erreur inconnue"}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Composant de filtrage des tâches */}
      <TaskFilter />

      {/* Affichage conditionnel: liste vide ou liste de tâches */}
      {!filteredTasks || filteredTasks.length === 0 ? (
        // État vide - message adapté selon le filtre actif
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">
            {filterStatus === "toutes"
              ? "Aucune tâche trouvée"
              : filterStatus === "en_attente"
                ? "Aucune tâche en attente"
                : "Aucune tâche terminée"}
          </h3>
          <p className="mt-1 text-gray-500">
            {filterStatus === "toutes"
              ? "Commencez par créer votre première tâche !"
              : "Changez de filtre pour voir d'autres tâches."}
          </p>
        </div>
      ) : (
        // Liste des tâches avec animation
        <div className="space-y-4 animate-fade-in">
          {filteredTasks.map((task: Task) => (
            <div key={task.id} className="animate-slide-in">
              <TaskItem task={task} />
            </div>
          ))}
          {/* Compteur de tâches - petit détail sympa pour l'UX */}
          <p className="text-sm text-gray-500 text-center mt-4">
            {filteredTasks.length} tâche{filteredTasks.length > 1 ? "s" : ""} affichée
            {filteredTasks.length > 1 ? "s" : ""}
          </p>
        </div>
      )}
    </>
  )
}