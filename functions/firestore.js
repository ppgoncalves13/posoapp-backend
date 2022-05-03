const { initializeApp, cert  } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getMessaging } = require('firebase-admin/messaging');
require('dotenv').config()

const app_data = {
    credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID, // I get no error here
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL, // I get no error here
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') 
  }),
  databaseURL: process.env.FIREBASE_DATABASE_URL
}

initializeApp(app_data);

const messaging = getMessaging();
const db = getFirestore();

module.exports = {
  db: db,
  messaging: messaging
};