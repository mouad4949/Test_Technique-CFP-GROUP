import type { Task, CreateTask, UpdateTask } from "../types/task"

// URL de l'API backend - à mettre dans un .env dans un vrai projet
// Mais pour ce test technique, c'est plus simple comme ça
const API_URL = "http://localhost:3100"

// Fonctions de conversion entre le frontend (français) et le backend (anglais)
// J'ai dû ajouter ça quand j'ai traduit l'interface en français
// Ça permet de garder la compatibilité avec le backend existant
const convertStatusToBackend = (status: "en_attente" | "terminee"): "pending" | "done" => {
  return status === "en_attente" ? "pending" : "done"
}

const convertStatusFromBackend = (status: "pending" | "done"): "en_attente" | "terminee" => {
  return status === "pending" ? "en_attente" : "terminee"
}

// Convertit une tâche du format backend vers le format frontend
// J'ai créé cette fonction pour centraliser la logique de conversion
const convertTaskFromBackend = (task: any): Task => {
  return {
    ...task,
    status: convertStatusFromBackend(task.status),
  }
}

// Convertit une tâche du format frontend vers le format backend
// Utile pour les créations et mises à jour
const convertTaskToBackend = (task: CreateTask): any => {
  return {
    ...task,
    status: convertStatusToBackend(task.status),
  }
}

// J'ai regroupé toutes les fonctions d'API dans un objet pour les organiser
// C'est plus propre que d'exporter des fonctions individuelles
export const tasksApi = {
  // Récupère toutes les tâches
  // J'utilise async/await pour une syntaxe plus propre que les promesses chaînées
  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${API_URL}/tasks`)

    if (!response.ok) {
      // Toujours vérifier si la réponse est OK avant de parser le JSON
      // Ça évite des erreurs cryptiques plus tard
      throw new Error("Impossible de récupérer les tâches")
    }

    const tasks = await response.json()
    // Conversion de chaque tâche du format backend vers le format frontend
    return tasks.map(convertTaskFromBackend)
  },

  // Crée une nouvelle tâche
  async createTask(task: CreateTask): Promise<Task> {
    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Important pour que le serveur comprenne le format
      },
      body: JSON.stringify(convertTaskToBackend(task)), // Conversion avant envoi
    })

    if (!response.ok) {
      throw new Error("Impossible de créer la tâche")
    }

    const createdTask = await response.json()
    return convertTaskFromBackend(createdTask) // Conversion après réception
  },

  // Supprime une tâche par son ID
  async deleteTask(id: string | number): Promise<void> {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`Impossible de supprimer la tâche avec l'ID ${id}`)
    }
    // Pas besoin de retourner quoi que ce soit pour une suppression
  },

  // Met à jour le statut d'une tâche
  async updateTaskStatus(id: string | number, update: UpdateTask): Promise<Task> {
    // Conversion du statut avant envoi
    const backendUpdate = {
      status: convertStatusToBackend(update.status),
    }

    const response = await fetch(`${API_URL}/tasks/${id}`, {
      method: "PATCH", // PATCH est plus approprié que PUT car on ne modifie qu'un champ
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(backendUpdate),
    })

    if (!response.ok) {
      throw new Error(`Impossible de mettre à jour la tâche avec l'ID ${id}`)
    }

    const updatedTask = await response.json()
    return convertTaskFromBackend(updatedTask) // Conversion après réception
  },
}