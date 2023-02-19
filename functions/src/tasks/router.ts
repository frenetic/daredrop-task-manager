import * as express from 'express';
import { create } from './create';
import { list } from './list';

const tasksRouter = express.Router();

tasksRouter.post('/tasks', create);
tasksRouter.get('/tasks', list);

export default tasksRouter;