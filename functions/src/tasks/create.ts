import {Request, Response} from "express";
import {database} from "../services/firebase";
import {getCreateValidator} from "./validators";

export async function create(req: Request, res: Response) {
  const validator = getCreateValidator();
  const isValid = validator(req.body);
  if (!isValid) {
    res.status(400).send(validator.errors);
    return;
  }

  const task = req.body;

  const entry = await database.collection("tasks").doc();

  task.id = entry.id;

  await entry.set(task);

  res.status(201).send(task);
}
