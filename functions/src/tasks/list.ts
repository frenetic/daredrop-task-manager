import { Request, Response } from 'express';
import { database } from '../services/firebase';

type Task = {
  name: string;
  description: string;
  isDone: boolean;
};

async function listAll(req: Request, res: Response) {
  const tasks = await database.collection('tasks').get();

  const allTasks: Task[] = [];

  tasks.forEach(task => allTasks.push(task.data() as Task));

  return res.status(200).send(allTasks);
}

async function filterList(req: Request, res: Response) {
  let query = database.collection('tasks');

  if (req.query.hasOwnProperty('isDone')) {
    query = query.where('isDone', '==', req.query.isDone === 'true') as any;
  }

  const results = await query.get();

  const allTasks: Task[] = [];
  results.forEach(task => allTasks.push(task.data() as Task));

  return res.status(200).send(allTasks);
}

export async function list(req: Request, res: Response) {
  if (!req.query) {
    return listAll(req, res);
  }

  return filterList(req, res);
}