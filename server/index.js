const express = require("express")
const cors = require('cors');
const {userController}= require("./routes/user.routes")

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

const Connection = require("./config/db");

app.get("/", (req, res) => {
    res.send("Welcome to homepage");
  });

app.use("/user", userController);

app.listen(PORT, async () => {
    try {
      await Connection;
      console.log("Server is connected to database");
      console.log(`server is running on ${PORT}`);
    } catch (err) {
      console.log(err);
    }
  });