import {Request, Response} from "express";
import {database} from "../services/firebase";
import {TaskModel} from "./types";
import {getPartialUpdateValidator} from "./validators";

export async function partialUpdate(req: Request, res: Response) {
  const {taskId} = req.params;

  const validator = getPartialUpdateValidator();
  const isValid = validator(req.body);
  if (!isValid) {
    res.status(400).send(validator.errors);
    return;
  }

  const task = await database.collection("tasks").doc(taskId);
  const currentTask = await task.get();

  if (!currentTask.exists) {
    res.status(404).send();
    return;
  }

  const currentTaskData = currentTask.data() as TaskModel;
  const updatedData: TaskModel = {...currentTaskData, ...req.body, id: currentTaskData.id};

  await task.set(updatedData).catch((error) => {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  });

  res.status(200).send(updatedData);
}
