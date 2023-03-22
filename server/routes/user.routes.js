const {Router} = require("express")
const {UserModel} = require("../models/User.model")
const userController = Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken"); 
require("dotenv").config();
const {validateEmail,generateToken}= require("../utils/utils");

// User signup api

userController.post("/signup", async(req, res) => {
    const {email,fullName, password} = req.body;

    const alreadyUser = await UserModel.find({ email });
    const valideMail= validateEmail(email);
    const role= "user"

    if(valideMail===false){
        return res.status(401).send("Invalid email address !");
    }
    else if (alreadyUser.length>0){
        return res.status(403).send("User already exists");
    }
    else{
        bcrypt.hash(password, 5, async function(err, hash) {
          if(err){
             res.status(400).send("Something wentwrong, plz try again later")
          }
          try{
            const user = new UserModel({
                email,
                fullName,
                password : hash,
                userRole: role
            })
             await user.save();
             const token = generateToken({
                email: user.email,
                fullName: user.fullName,
                role:role
              })
             res.status(200).json({msg : "Signup successful",token})
          }
          catch(err){ 
           res.status(400).send("Something went wrong, plz try again")
          }
         
      }); 
      }

});


module.exports = {
    userController
}
