const { initializeApp, cert, applicationDefault  } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getMessaging } = require('firebase-admin/messaging');

const serviceAccount = require("../serviceAccount.json") 
require('dotenv').config()

const app_data = {
  credential: cert({
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
}

initializeApp(app_data);

const messaging = getMessaging();
const db = getFirestore();

module.exports = {
  db: db,
  messaging: messaging
};