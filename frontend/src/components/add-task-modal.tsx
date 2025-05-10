"use client"

import type React from "react"
import { useTaskStore } from "../store/task-store"
import { TaskForm } from "./task-form"
import { useEffect, useRef } from "react"

export const AddTaskModal: React.FC = () => {
  const { isAddTaskModalOpen, closeAddTaskModal } = useTaskStore()
  const modalRef = useRef<HTMLDivElement>(null) // Référence pour détecter les clics à l'extérieur

  // Gestion de la fermeture du modal en cliquant à l'extérieur
  // J'ai ajouté ça pour améliorer l'UX
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeAddTaskModal()
      }
    }

    if (isAddTaskModalOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      // Empêcher le défilement du corps lorsque le modal est ouvert
      // Petit détail important pour l'UX sur mobile
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      // Restaurer le défilement du corps lorsque le modal est fermé
      document.body.style.overflow = ""
    }
  }, [isAddTaskModalOpen, closeAddTaskModal])

  // Fermeture du modal avec la touche Échap
  // Encore un détail d'accessibilité que j'aime ajouter
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAddTaskModal()
      }
    }

    if (isAddTaskModalOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isAddTaskModalOpen, closeAddTaskModal])

  // Ne rien rendre si le modal est fermé
  if (!isAddTaskModalOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-xl p-5 w-full max-w-md shadow-xl animate-slide-in max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">Nouvelle Tâche</h2>
          <button
            onClick={closeAddTaskModal}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Fermer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <TaskForm />
      </div>
    </div>
  )
}