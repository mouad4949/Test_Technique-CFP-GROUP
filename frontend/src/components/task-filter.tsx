"use client"

import type React from "react"
import { useTaskStore } from "../store/task-store"

export const TaskFilter: React.FC = () => {
  // Récupération du filtre actif et de la fonction pour le modifier depuis le store
  const { filterStatus, setFilterStatus } = useTaskStore()

  return (
    <div className="mb-6 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <h2 className="text-sm font-medium text-gray-700 mb-3">Filtrer par statut</h2>
      <div className="flex flex-wrap gap-2">
        {/* Bouton pour afficher toutes les tâches */}
        <button
          onClick={() => setFilterStatus("toutes")}
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
            filterStatus === "toutes" ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Toutes
        </button>
        {/* Bouton pour afficher les tâches en attente */}
        <button
          onClick={() => setFilterStatus("en_attente")}
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
            filterStatus === "en_attente" ? "bg-amber-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          En attente
        </button>
        {/* Bouton pour afficher les tâches terminées */}
        <button
          onClick={() => setFilterStatus("terminee")}
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
            filterStatus === "terminee" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Terminées
        </button>
      </div>
    </div>
  )
}