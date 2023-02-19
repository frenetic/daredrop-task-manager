import * as express from 'express';

import { create } from './create';
import { list } from './list';
import { retrieve } from './retrieve';

const tasksRouter = express.Router();

tasksRouter.post('/tasks', create);
tasksRouter.get('/tasks', list);
tasksRouter.get('/tasks/:taskId', retrieve);

export default tasksRouter;