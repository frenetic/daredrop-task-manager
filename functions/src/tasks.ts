import * as express from 'express';
import { database } from './services/firebase';

const tasksRouter = express.Router();

tasksRouter.post('/tasks', async function(req, res) {
  const task = req.body;

  const entry = await database.collection('tasks').doc();

  task.id = entry.id;

  await entry.set(task);

  res.status(201).send(task);
});

export default tasksRouter;