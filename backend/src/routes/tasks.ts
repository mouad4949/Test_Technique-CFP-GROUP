import express from 'express';
import { taskSchema, updateStatusSchema } from '../schemas/taskSchema';
import * as taskService from '../services/taskService';

const router = express.Router();
// Route GET /tasks → retourne toutes les tâches
router.get('/', (req, res) => {
  res.json(taskService.getAllTasks());
});

// Route POST /tasks → crée une nouvelle tâche
router.post('/', (req, res) => {
  const parse = taskSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten() });
  }

  const { title, description } = parse.data;
  const task = taskService.addTask(title, description);
  res.status(201).json(task);
});


// Route DELETE /tasks/:id → supprime une tâche par son ID
router.delete('/:id', (req, res) => {
  const deleted = taskService.deleteTask(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Task not found' });
  res.status(204).send();
});


// Route PATCH /tasks/:id → met à jour le statut d'une tâche
router.patch('/:id', (req, res) => {
  const parse = updateStatusSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten() });
  }

  const updated = taskService.updateTaskStatus(req.params.id, parse.data.status);
  if (!updated) return res.status(404).json({ error: 'Task not found' });

  res.status(200).json({ success: true });
});

export default router;
