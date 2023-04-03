const { Router } = require("express");
const pollController=Router();
const {PollModel}=require("../models/Polls.model");
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
        const newPoll= pollDataToUser((pollData))
        const refPoll=newPoll[0]

        const poll = new PollModel({
        pollId:refPoll.pollId,
        adminId:refPoll.adminId,
        pollName:refPoll.pollName,
        templateName:refPoll.templateName,
        questions:refPoll.questions,
        pollStatus:refPoll.pollStatus,
        usersAttended:refPoll.usersAttended,
        pollCreatedAt:refPoll.pollCreatedAt,
        pollEndsAt:refPoll.pollEndsAt})

        await poll.save();
        await pollRef.remove()
        res.status(200).json({msg :"Poll Details saved successfully"}) 
      }, (error) => {
        res.status(500).send('Internal Server Error');
      });
    
   
})



module.exports={pollController}