import { Request, Response } from 'express';
import { database } from '../services/firebase';
import { CollectionReference, Query } from 'firebase-admin/firestore';

type Task = {
  name: string;
  description: string;
  isDone: boolean;
};

export async function list(req: Request, res: Response) {
  let query: CollectionReference | Query = database
    .collection('tasks');

  if (req.query.hasOwnProperty('isDone')) {
    query = query.where('isDone', '==', req.query.isDone === 'true');
  }

  const results = await query.get();

  const allTasks: Task[] = [];
  results.forEach(task => allTasks.push(task.data() as Task));

  return res.status(200).send(allTasks);
}