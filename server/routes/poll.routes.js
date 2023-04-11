const { Router } = require("express");
const pollController=Router();
const {PollModel}=require("../models/Polls.model");
const {UserModel}=require("../models/User.model");
const {firebase} = require('../config/db');
const fireDb = firebase.database(); 
const ExcelJS = require('exceljs');
const { votedByData,decryptToken, pollToArray} = require("../utils/utils");
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
        const dataPoll=pollData;
        const adminId=(dataPoll.adminId)
        const newPoll= votedByData((pollData));
         
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
        res.status(200).json({msg :"Poll Details saved successfully", poll:poll }) 
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

pollController.get('/polls/votedBy', async (req, res) => {
  try {
    const {pollId, questionId, optionId}= req.body;

    const poll = await PollModel.findOne({ pollId: pollId });
    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }
    
    const question = poll.questions.find(q =>q._id.toString() === questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const option = question.options.find(o => o._id.toString() === optionId);
    if (!option) {
      return res.status(404).json({ error: 'Option not found' });
    }

    const votedBy = option.votedBy;
    res.status(200).json(votedBy);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
   
});


pollController.get('/download/votedby/:pollId/question/:questionId/option/:optionId', async(req, res) => { 
  const pollId = req.params.pollId;
  const questionId = req.params.questionId;
  const optionId = req.params.optionId;
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Voters');

  worksheet.columns = [
    { header: 'Email', key: 'email', width: 50 },
   { header: 'Full Name', key: 'fullName', width: 50 },
   { header: 'User ID', key: 'userId', width: 50 },
  ];

    const poll = await PollModel.findOne({ pollId: pollId });
    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }
    
    const question = poll.questions.find(q =>q._id.toString() === questionId);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const option = question.options.find(o => o._id.toString() === optionId);
    if (!option) {
      return res.status(404).json({ error: 'Option not found' });
    }

    const votedBy = option.votedBy; 
    votedBy.forEach(user => {
      worksheet.addRow(user);
    });
 
    res.setHeader('Content-Disposition', 'attachment; filename="voters.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
 
    await workbook.xlsx.write(res);
 
    res.end();
});

module.exports={pollController}
