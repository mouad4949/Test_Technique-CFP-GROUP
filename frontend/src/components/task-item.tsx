"use client"

import type React from "react"
import type { Task } from "../types/task"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { tasksApi } from "../api/tasks-api"
import { useState } from "react"
import Swal from "sweetalert2"

interface TaskItemProps {
  task: Task
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const queryClient = useQueryClient() // Accès au client React Query pour invalider le cache
  const [isHovered, setIsHovered] = useState(false) // État pour l'effet de survol
  const [showFullDescription, setShowFullDescription] = useState(false) // État pour afficher la description complète

  // Mutation pour supprimer une tâche
  // J'utilise TanStack Query (React Query) car ça simplifie énormément la gestion des requêtes
  const deleteMutation = useMutation({
    mutationFn: (id: string | number) => tasksApi.deleteTask(id),
    onSuccess: () => {
      // Invalider le cache pour recharger les données après suppression
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
      
      // Notification de succès avec SweetAlert2
      // J'ai ajouté ça pour donner du feedback à l'utilisateur
      Swal.fire({
        title: "Supprimée !",
        text: "La tâche a été supprimée avec succès.",
        icon: "success",
        timer: 2000, // Disparaît après 2 secondes
        timerProgressBar: true,
        showConfirmButton: false,
        background: "#fff",
      })
    },
    onError: (error) => {
      // Notification d'erreur en cas d'échec
      Swal.fire({
        title: "Erreur !",
        text: `Impossible de supprimer la tâche : ${error instanceof Error ? error.message : "Erreur inconnue"}`,
        icon: "error",
        confirmButtonText: "OK",
      })
    },
  })

  // Mutation pour mettre à jour le statut d'une tâche
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string | number; status: "en_attente" | "terminee" }) =>
      tasksApi.updateTaskStatus(id, { status }),
    onSuccess: () => {
      // Invalider le cache pour recharger les données après mise à jour
      queryClient.invalidateQueries({ queryKey: ["tasks"] })
    },
  })

  // Gestion de la suppression avec confirmation
  const handleDelete = () => {
    // J'utilise SweetAlert2 pour une confirmation plus jolie que confirm()
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Voulez-vous vraiment supprimer cette tâche ? Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48", // Couleur destructive explicite
      cancelButtonColor: "#718096",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
      background: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(task.id)
      }
    })
  }

  // Bascule le statut de la tâche entre "en_attente" et "terminee"
  const handleToggleStatus = () => {
    const newStatus = task.status === "en_attente" ? "terminee" : "en_attente"
    updateStatusMutation.mutate({ id: task.id, status: newStatus })
  }

  // Gestion des descriptions longues
  // J'ai ajouté cette fonctionnalité pour améliorer l'UX
  const isLongDescription = task.description.length > 100
  const displayDescription =
    isLongDescription && !showFullDescription ? task.description.substring(0, 100) + "..." : task.description

  return (
    <div
      className={`card p-4 sm:p-5 mb-4 transition-all duration-300 ${isHovered ? "scale-[1.01]" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
        <div className="flex-1">
          <div className="flex items-center">
            {/* Indicateur visuel du statut (point coloré) */}
            <div
              className={`w-3 h-3 rounded-full mr-3 ${task.status === "terminee" ? "bg-green-500" : "bg-amber-500"}`}
            />
            {/* Titre avec style barré si la tâche est terminée */}
            <h3 className={`text-lg font-semibold ${task.status === "terminee" ? "line-through text-gray-500" : ""}`}>
              {task.title}
            </h3>
          </div>
          {/* Description avec gestion des textes longs */}
          <p className={`mt-2 text-gray-600 ${task.status === "terminee" ? "text-gray-400" : ""}`}>
            {displayDescription}
          </p>
          {/* Bouton "Voir plus/moins" pour les descriptions longues */}
          {isLongDescription && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-sm text-primary mt-1 hover:underline focus:outline-none"
            >
              {showFullDescription ? "Voir moins" : "Voir plus"}
            </button>
          )}
        </div>
        <div className="flex items-center space-x-2 mt-3 sm:mt-0 sm:ml-4">
          {/* Badge de statut avec style différent selon l'état */}
          <button
            onClick={handleToggleStatus}
            className={`badge ${
              task.status === "terminee" ? "badge-primary" : "badge-secondary"
            } transition-all duration-200`}
          >
            {task.status === "terminee" ? "Terminée" : "En attente"}
          </button>
          {/* Bouton de suppression */}
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-destructive"
            disabled={deleteMutation.isPending}
            aria-label="Supprimer la tâche"
          >
            {deleteMutation.isPending ? "..." : "Supprimer"}
          </button>
        </div>
      </div>
    </div>
  )
}