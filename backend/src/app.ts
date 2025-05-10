import express from 'express';
import taskRoutes from './routes/tasks';// Importe les routes liées aux tâches
import cors from "cors";// Importe le middleware CORS
const app = express();// Initialise l'application Express

app.use(cors({
  origin: "http://localhost:5173"
}));
// Autorise uniquement les requêtes provenant du frontend React (localhost:5173)
app.use(express.json());// Permet à Express de comprendre le JSON dans les requêtes entrantes

app.use('/tasks', taskRoutes);// Monte les routes de tâches sur le chemin "/tasks"

export default app;
// Exporte l'application pour être utilisée dans server.ts