"use client"

import type React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateTaskSchema, type CreateTask } from "../types/task"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { tasksApi } from "../api/tasks-api"
import { useTaskStore } from "../store/task-store"

export const TaskForm: React.FC = () => {
  const queryClient = useQueryClient() // Pour invalider le cache après création
  const closeAddTaskModal = useTaskStore((state) => state.closeAddTaskModal) // Pour fermer le modal après soumission

  // Configuration de React Hook Form avec validation Zod
  // J'adore cette combinaison, c'est super puissant et facile à utiliser
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTask>({
    resolver: zodResolver(CreateTaskSchema), // Validation avec le schéma Zod
    defaultValues: {
      title: "",
      description: "",
      status: "en_attente", // Par défaut, les nouvelles tâches sont en attente
    },
  })

  // Mutation pour créer une nouvelle tâche
  const createTaskMutation = useMutation({
    mutationFn: (newTask: CreateTask) => tasksApi.createTask(newTask),
    onSuccess: () => {
      // Après création réussie:
      queryClient.invalidateQueries({ queryKey: ["tasks"] }) // Recharger la liste
      reset() // Réinitialiser le formulaire
      closeAddTaskModal() // Fermer le modal
    },
  })

  // Fonction appelée lors de la soumission du formulaire
  const onSubmit = (data: CreateTask) => {
    createTaskMutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Champ de titre */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Titre
        </label>
        <input
          id="title"
          type="text"
          {...register("title")} // React Hook Form gère ce champ
          className="input"
          placeholder="Entrez le titre de la tâche"
        />
        {/* Affichage des erreurs de validation */}
        {errors.title && <p className="mt-1 text-sm text-destructive">{errors.title.message}</p>}
      </div>

      {/* Champ de description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          {...register("description")}
          rows={3}
          className="input min-h-[80px]"
          placeholder="Entrez la description de la tâche"
        />
        {errors.description && <p className="mt-1 text-sm text-destructive">{errors.description.message}</p>}
      </div>

      {/* Sélection du statut */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Statut
        </label>
        <select id="status" {...register("status")} className="input">
          <option value="en_attente">En attente</option>
          <option value="terminee">Terminée</option>
        </select>
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-end space-x-3 pt-2">
        {/* Bouton d'annulation */}
        <button type="button" onClick={closeAddTaskModal} className="btn btn-md btn-outline">
          Annuler
        </button>
        {/* Bouton de soumission avec état de chargement */}
        <button
          type="submit"
          disabled={isSubmitting || createTaskMutation.isPending}
          className="btn btn-md btn-primary"
        >
          {createTaskMutation.isPending ? (
            <span className="flex items-center">
              {/* Icône de chargement animée */}
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Ajout...
            </span>
          ) : (
            "Ajouter la tâche"
          )}
        </button>
      </div>
    </form>
  )
}