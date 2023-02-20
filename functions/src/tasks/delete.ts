import {Request, Response} from "express";
import {database} from "../services/firebase";

export async function remove(req: Request, res: Response) {
  const {taskId} = req.params;

  const task = await database.collection("tasks").doc(taskId);

  if (!(await task.get()).exists) {
    return res.status(404).send();
  }

  await task.delete().catch((error) => {
    return res.status(400).send({
      status: "error",
      message: error.message,
    });
  });

  return res.status(200).send();
}
