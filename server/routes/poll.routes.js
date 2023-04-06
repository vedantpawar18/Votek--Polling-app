const { Router } = require("express");
const pollController=Router();
const {PollModel}=require("../models/Polls.model");
const {UserModel}=require("../models/User.model");
const {firebase} = require('../config/db');
const fireDb = firebase.database(); 
const { pollDataToUser,decryptToken, pollToArray} = require("../utils/utils");
// <----------------------------// API for storing ended poll inot MongoDB----------------->
pollController.post("/save-poll",async(req,res)=>
{
    const {pollId} = req.body;
    const pollRef = fireDb.ref(`polls/${pollId}`);
    
    pollRef.once('value',async (snapshot) => {
        const pollData = snapshot.val();
        if (!pollData) {
          res.status(404).send('Poll not found');
          return;
        }
        const dataPoll=pollData
        const adminId=(dataPoll.adminId)
        const newPoll= pollDataToUser((pollData))
        const refPoll=newPoll[0]
        
        
        const poll = new PollModel({
        pollId:refPoll.pollId,
        adminId: adminId,
        pollName:refPoll.pollName,
        templateName:refPoll.templateName,
        questions:refPoll.questions,
        pollStatus:false,
        usersAttended:refPoll.usersAttended,
        pollCreatedAt:refPoll.pollCreatedAt,
        pollEndsAt:refPoll.pollEndsAt})

        await poll.save();
        await pollRef.remove()
        res.status(200).json({msg :"Poll Details saved successfully"}) 
      }, (error) => {
        res.status(500).send('Internal Server Error');
      });
    
   
});

pollController.get('/ended-polls',async(req, res) => {
  try {
    
    if(!req.headers.authorization){
      return res.send("Please login again")
    }
    else {
      const token = req.headers.authorization.split(" ")[1]
      const userToken=decryptToken(token);
      const user = await UserModel.find({email:userToken.email});
      const userRole =((user[0].userRole))
      if(userRole!=="admin"){
       res.send("Only admin is allowed to see a poll")
      }
      else{
       const adminId =((user[0]._id))
       const endedPolls= await PollModel.find({adminId:adminId});
       res.send(endedPolls);
      }
    }
   } catch (error) { 
    res.status(500).send('Failed to retrieve poll data.');
   }
});



module.exports={pollController}
