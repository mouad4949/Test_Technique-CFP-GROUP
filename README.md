# Application de Gestion de Tâches (Fullstack TypeScript)

## 📌 Description du Projet

Application fullstack de gestion de tâches développée avec :
* **Backend**: Express + TypeScript
* **Frontend**: React + TypeScript

Fonctionnalités principales :
* CRUD complet pour les tâches
* Filtrage par statut
* Interface responsive et moderne
* Validation des données côté client et serveur

## 🚀 Installation et Lancement

### Prérequis
* Node.js (v18+)
* npm ou yarn
* TypeScript (installé globalement si nécessaire)

### Backend (Express)
1. **Se placer dans le dossier backend**:
   ```bash
   cd backend
   ```
2. **Installer les dépendances**:
   ```bash
   npm install # ou yarn install
   ```
3. **Lancer le serveur** (port 3100 par défaut):
   ```bash
   npm run dev # ou yarn dev
   ```

### Frontend (React)
1. **Se placer dans le dossier frontend**:
   ```bash
   cd frontend
   ```
2. **Installer les dépendances**:
   ```bash
   npm install # ou yarn install
   ```
3. **Lancer l'application** (port 5173 par défaut):
   ```bash
   npm run dev # ou yarn dev
   ```

## 🌐 Accès à l'application
* Frontend: http://localhost:5173
* Backend (API): http://localhost:3100

## 🛠 Stack Technique

### Backend
* **Framework**: Express.js
* **Langage**: TypeScript
* **Validation**: Zod
* **Gestion d'erreurs**: Middleware personnalisé
* **CORS**: Activation pour le développement

### Frontend
* **Framework**: React 18
* **Build Tool**: Vite
* **Gestion d'état**: Zustand
* **Requêtes API**: TanStack Query
* **Formulaires**: React Hook Form + Zod
* **Styling**: Tailwind CSS
* **Alertes**: SweetAlert2
* **Animations**: CSS transitions

## 🏗 Architecture du Projet

### Backend
```
backend/
├── src/
│   ├── app.ts               # Configuration Express
│   ├── server.ts            # Point d'entrée
│   ├── routes/              # Définition des routes
│   ├── controllers/         # Logique métier
│   ├── schemas/             # Schémas Zod
│   ├── models/              # Types TS
│   └── middlewares/         # Middlewares
```

### Frontend
```
frontend/
├── src/
│   ├── api/                 # Services API
│   ├── components/          # Composants React
│   ├── store/               # Zustand store
│   ├── types/               # Types TS
│   ├── App.tsx              # Composant principal
│   └── main.tsx             # Point d'entrée
```

## 🔄 Endpoints API

| Méthode | Endpoint    | Description                |
|---------|------------|----------------------------|
| GET     | /tasks     | Liste toutes les tâches    |
| POST    | /tasks     | Crée une nouvelle tâche    |
| DELETE  | /tasks/:id | Supprime une tâche         |
| PATCH   | /tasks/:id | Met à jour le statut d'une tâche |

## 🎨 Fonctionnalités Frontend

1. **Affichage des tâches**
   * Liste filtrée par statut
   * Cartes animées avec effets de survol
   * Gestion des descriptions longues

2. **Gestion des tâches**
   * Ajout via modal
   * Basculement de statut
   * Suppression avec confirmation

3. **UI/UX**
   * Interface entièrement en français
   * Feedback visuel pour toutes les actions
   * Design responsive (mobile, tablette, desktop)
   * Alertes personnalisées avec SweetAlert2

## ✅ Bonnes Pratiques Implémentées

* Typage strict TypeScript
* Validation des données côté client et serveur
* Gestion centralisée des erreurs
* Architecture modulaire
* Code lisible et bien documenté
* Optimisation des performances
* Accessibilité (ARIA, contrastes)

## 📝 Notes Techniques

1. **Conversion de statuts**:
   * Le backend utilise "pending"/"done" (anglais)
   * Le frontend utilise "en_attente"/"terminee" (français)
   * Conversion automatique dans le service API

2. **Stockage des données**:
   * Backend: tableau en mémoire
   * Frontend: cache via TanStack Query

3. **Styles**:
   * Utilisation intensive de Tailwind CSS
   * Personnalisation des composants
   * Animations CSS fluides

## 🚀 Améliorations Possibles

* Ajout d'un système d'authentification
* Persistance des données (base de données)
* Mode sombre
* Système de priorités/dates d'échéance
* Fonctionnalité de recherche
* Tests unitaires/intégration
