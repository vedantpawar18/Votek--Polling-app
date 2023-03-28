const mongoose=require("mongoose");
const firebase = require('firebase');

require("dotenv").config();

mongoose.set("strictQuery", false);

const Connection= mongoose.connect(process.env.MONGO_URL);

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.Auth_Domain,
    databaseURL:process.env.Database_URL,
    projectId: process.env.Project_Id,
    storageBucket: process.env.Storage_Bucket,
    messagingSenderId: process.env.Messagin_Sender_Id,
    appId: process.env.App_Id
  };

firebase.initializeApp(firebaseConfig);

module.exports={Connection,firebase};