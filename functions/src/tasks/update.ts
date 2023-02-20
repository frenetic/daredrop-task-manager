import {Request, Response} from "express";
import {database} from "../services/firebase";
import {TaskModel} from "./types";
import {getUpdateValidator} from "./validators";

export async function update(req: Request, res: Response) {
  const {taskId} = req.params;

  const validator = getUpdateValidator();
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
  const updatedData: TaskModel = {...req.body, id: currentTaskData.id};

  await task.set(updatedData).catch((error) => {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  });

  res.status(200).send(updatedData);
}
