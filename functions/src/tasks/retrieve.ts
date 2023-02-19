import { Request, Response } from 'express';
import { database } from '../services/firebase';

export async function retrieve(req: Request, res: Response) {
  const { taskId } = req.params;

  const task = await database.collection('tasks').doc(taskId).get();

  if (!task.exists) {
    res.status(404).send();
    return;
  }

  res.status(200).send(task.data());
}