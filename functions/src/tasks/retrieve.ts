import { Request, Response } from 'express';
import { database } from '../services/firebase';

export async function retrieve(req: Request, res: Response) {
  const { taskId } = req.params;

  const task = await database.collection('tasks').doc(taskId).get();

  res.status(200).send(task.data());
}