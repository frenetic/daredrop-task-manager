import { Request, Response } from 'express';
import Ajv from 'ajv';
import { database } from '../services/firebase';

type FirebaseTask = {
  name: string;
  description: string;
  isDone: boolean;
  id: string;
};

export async function update(req: Request, res: Response) {
  const { taskId } = req.params;

  const schema = {
    type: "object",
    properties: {
      name: { type: "string" },
      description: { type: "string" },
      isDone: { type: "boolean" },
      id: {type: "string"},
    },
    required: ["name", "description", "isDone"],
    additionalProperties: false
  }
  const ajv = new Ajv();

  const validate = ajv.compile(schema);

  const isValid = validate(req.body);
  if (!isValid) {
    res.status(400).send(validate.errors);
    return;
  }

  const task = await database.collection('tasks').doc(taskId);
  const currentTask = await task.get();

  if (!currentTask.exists) {
    res.status(404).send();
    return;
  }

  const currentTaskData = currentTask.data() as FirebaseTask;
  const updatedData: FirebaseTask = {...req.body, id: currentTaskData.id}

  await task.set(updatedData).catch(error => {
    return res.status(400).json({
      status: 'error',
      message: error.message
    })
  })

  res.status(200).send(updatedData);
}