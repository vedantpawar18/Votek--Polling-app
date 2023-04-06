const {Router} = require("express")
const {UserModel} = require("../models/User.model")
const userController = Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken"); 
require("dotenv").config();
const {validateEmail,generateToken, decryptToken}= require("../utils/utils");

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
             res.status(200).json({msg : "Signup successful",token, email:user.email, fullName:user.fullName, role:user.role})
          }
          catch(err){ 
           res.status(400).send("Something went wrong, plz try again")
          }
         
      }); 
      }

});

// <----------------------------// API for fetching details of the user   --------------------->
userController.get("/user-details",async(req,res)=>
{
    if(!req.headers.authorization){
        return res.send("Please login again")
    }
    const token = req.headers.authorization.split(" ")[1]

    const userToken=decryptToken(token);
    const user= await UserModel.findOne({_id:userToken.userId});
    if(user)
    res.status(200).send({msg:"success",userDetails:{email:user.email,fullName:user.fullName,userRole:user.userRole,pollsCreated:user.pollsCreated,pollsAttended:user.pollsAttended,templateCreated:user.templateCreated}});
    else
    res.status(400).send({msg:"Something went wrong while getting user details"});
})


module.exports = {
    userController
}
