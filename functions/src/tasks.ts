import Ajv from 'ajv';
import * as express from 'express';
import { database } from './services/firebase';

const tasksRouter = express.Router();

tasksRouter.post('/tasks', async function(req, res) {
  const schema = {
    type: "object",
    properties: {
      name: {type: "string"},
      description: {type: "string"},
      isDone: {type: "boolean"}
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

  const task = req.body;

  const entry = await database.collection('tasks').doc();

  task.id = entry.id;

  await entry.set(task);

  res.status(201).send(task);
});

export default tasksRouter;