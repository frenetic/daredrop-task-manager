import * as functions from "firebase-functions";
import * as express from 'express';


const app = express();
app.get('/', (request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase!");
})
exports.app = functions.https.onRequest(app)