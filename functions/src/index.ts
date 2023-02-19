import * as functions from "firebase-functions";
import * as express from 'express';

import tasksRouter from "./tasks/router";

const expressApp = express();

expressApp.use('/', tasksRouter);

export const app = functions.https.onRequest(expressApp);
