const express = require("express")
const cors = require('cors');
const {userController}= require("./routes/user.routes")
const {firebaseController}= require("./routes/poll.firebase.routes")
const {Connection, firebase} = require("./config/db");
const authController=require("./routes/signin.routes")
const app = express();
const PORT = process.env.PORT || 8080;
const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);

const fireDb = firebase.database(); 
const ref = fireDb.ref("polls");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to homepage");
  });

app.use("/user", userController);
app.use("/firebase", firebaseController);
app.use("/auth", authController);

// ---------------Socket.io setup to get live changes ------->
ref.on("value", (snapshot) => { 
  io.emit("data", snapshot.val());
});
const io = new Server(server);
// ----------------------------------------------------------->

server.listen(PORT, async () => {
    try {
      await Connection;
      await firebase;
      console.log("Server is connected to database");
      console.log(`server is running on ${PORT}`);
    } catch (err) {
      console.log(err);
    }
  });

  
