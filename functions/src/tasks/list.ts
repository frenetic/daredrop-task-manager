import { Request, Response } from 'express';
import { database } from '../services/firebase';

export async function list (req: Request, res: Response) {
  const tasks = await database.collection('tasks').get();

  const allTasks: any[] = [];

  tasks.forEach(task => allTasks.push(task.data()));

  res.status(200).send(allTasks);
}