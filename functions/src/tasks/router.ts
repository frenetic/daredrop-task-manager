import * as express from "express";

import {create} from "./create";
import {remove} from "./delete";
import {list} from "./list";
import {partialUpdate} from "./partialUpdate";
import {retrieve} from "./retrieve";
import {update} from "./update";

const tasksRouter = express.Router(); // eslint-disable-line new-cap

tasksRouter.post("/tasks", create);
tasksRouter.get("/tasks", list);
tasksRouter.get("/tasks/:taskId", retrieve);
tasksRouter.delete("/tasks/:taskId", remove);
tasksRouter.put("/tasks/:taskId", update);
tasksRouter.patch("/tasks/:taskId", partialUpdate);

export default tasksRouter;
