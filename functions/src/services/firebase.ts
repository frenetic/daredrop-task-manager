import * as firebaseAdmin from "firebase-admin";

firebaseAdmin.initializeApp();

export const database = firebaseAdmin.firestore();
