"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { TaskList } from "./components/task-list"
import { AddTaskModal } from "./components/add-task-modal"
import { useTaskStore } from "./store/task-store"
import "./App.css"

// Création du client React Query
// Je configure un client unique pour toute l'application
const queryClient = new QueryClient()

function App() {
  // Récupération de la fonction pour ouvrir le modal depuis le store
  const openAddTaskModal = useTaskStore((state) => state.openAddTaskModal)

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
          {/* En-tête de l'application */}
          <header className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestion de Tâches</h1>
                <p className="text-gray-600 mt-1">Gérez vos tâches efficacement</p>
              </div>
              {/* Bouton pour ajouter une nouvelle tâche */}
              <button
                onClick={openAddTaskModal}
                className="btn btn-lg btn-primary group w-full sm:w-auto"
                aria-label="Ajouter une nouvelle tâche"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nouvelle Tâche
              </button>
            </div>
          </header>

          {/* Contenu principal */}
          <main>
            <TaskList />
          </main>

          {/* Pied de page */}
          <footer className="mt-12 text-center text-gray-500 text-sm py-4">
            <p>Application de Gestion de Tâches &copy; {new Date().getFullYear()}</p>
          </footer>
        </div>
      </div>
      {/* Modal d'ajout de tâche (rendu conditionnellement) */}
      <AddTaskModal />
    </QueryClientProvider>
  )
}

export default App