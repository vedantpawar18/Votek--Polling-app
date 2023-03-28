const mongoose=require("mongoose");
const firebase = require('firebase');

require("dotenv").config();

mongoose.set("strictQuery", false);

const Connection= mongoose.connect(process.env.MONGO_URL);

const firebaseConfig = {
    apiKey: "AIzaSyDaYMQg8o74wmFW0OwHv6wKZAb6fMD8D-k",
    authDomain: "polling-app-c55a5.firebaseapp.com",
    databaseURL: "https://polling-app-c55a5-default-rtdb.firebaseio.com",
    projectId: "polling-app-c55a5",
    storageBucket: "polling-app-c55a5.appspot.com",
    messagingSenderId: "450291384541",
    appId: "1:450291384541:web:822e82cb89a8f00abd5b34"
  };

firebase.initializeApp(firebaseConfig);

module.exports={Connection,firebase};