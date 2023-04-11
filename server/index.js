const express = require("express")
const cors = require('cors');
const {userController}= require("./routes/user.routes")
const {firebaseController}= require("./routes/poll.firebase.routes")
const {Connection, firebase} = require("./config/db");
const authController=require("./routes/signin.routes");
const {convertPollData}= require("./utils/utils");
const {pollController}=require("./routes/poll.routes");;
const {templateController}=require("./routes/template.routes")
const app = express();
const PORT = process.env.PORT || 8080;
const http = require('http');
const { Server } = require("socket.io");
const server = http.createServer(app);

const swaggerUI= require("swagger-ui-express");
const YAML= require("yamljs");
const swaggerJsDocs= YAML.load("./api.yaml");

const fireDb = firebase.database(); 
const ref = fireDb.ref("polls");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Welcome to homepage");
  });

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
app.use("/user", userController);
app.use("/firebase", firebaseController);
app.use("/auth", authController);
app.use("/poll",pollController);
app.use("/template",templateController);


// ---------------Socket.io setup to get live changes ------->
const io = new Server(server);
ref.on("value", (snapshot) => { 
  io.emit("data", snapshot.val());
});


io.on('connection', (socket) => {
  socket.on('getPollData', (pollId) => {
    const pollRef = fireDb.ref(`polls/${pollId}`);
    pollRef.on('value',async (snapshot) => {
      const pollData = snapshot.val();
      if (!pollData) {
        socket.emit('pollDeleted');
        return;
      }
      const newPollData=await convertPollData(pollData)
      socket.emit('pollData', newPollData);
    }, (error) => {
      console.error(`Error getting poll data with ID ${pollId}: `, error);
    });
  });
});

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

  
