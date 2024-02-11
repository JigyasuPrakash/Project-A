var admin = require('firebase-admin');
var serviceAccount = require("./keys/project-alpha-bb6ae-firebase-adminsdk-5egts-a431f246a6.json")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = { admin, db };