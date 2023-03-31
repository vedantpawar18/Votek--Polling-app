const { Router } = require("express");
const pollController=Router();
const {PollModel}=require("../models/Polls.model");

// <----------------------------// API for storing ended poll inot MongoDB----------------->
pollController.post("/save-poll",async(req,res)=>
{
    const {pollId,adminId,pollName,templateName,questions,pollStatus,usersAttended,pollCreatedAt,pollEndsAt} = req.body;
    try{
        const poll = new PollModel({
            pollId,adminId,pollName,templateName,questions,pollStatus,usersAttended,pollCreatedAt,pollEndsAt})
         await poll.save();
         res.status(200).json({msg :"Poll Details saved successfully"})
      }
      catch(err){ 
       res.status(400).send({msg: err});
      }
})



module.exports={pollController}