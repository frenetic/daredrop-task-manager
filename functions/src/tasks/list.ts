import { Request, Response } from 'express';
import { database } from '../services/firebase';

type Task = {
  name: string;
  description: string;
  isDone: boolean;
};

export async function list (req: Request, res: Response) {
  const tasks = await database.collection('tasks').get();

  const allTasks: Task[] = [];

  tasks.forEach(task => allTasks.push(task.data() as Task));

  res.status(200).send(allTasks);
}