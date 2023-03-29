'use strict';
const {Router} = require("express")
const firebaseController = Router();
const {firebase} = require('../config/db');
const fireDb = firebase.database(); 
const bodyParser = require('body-parser');
const express = require("express")
const app = express();
app.use(express.json());

firebaseController.post('/create-poll', async(req, res) => {

  const pollRef = fireDb.ref('polls').push();
  const pollId = pollRef.key;
  const { pollName, questions, pollStatus, adminId,pollCreatedAt,pollEndsAt  } = req.body;

  const formattedQuestions = questions.map((question) => {
  const questionRef = pollRef.child('questions').push();
  const questionId = questionRef.key;
  const formattedOptions = question.options.map((option) => {
  const optionRef = questionRef.child('options').push();
  const optionId = optionRef.key;
      return {
        [optionId]: {
          option,
          votes: 0,
        },
      };
    });
    const options = Object.assign({}, ...formattedOptions);
    return {
      [questionId]: {
        question: question.question,
        maxSelections: question.maxSelections,
        options,
        totalVotes: 0,
      },
    };
  });
  const questionsData = Object.assign({}, ...formattedQuestions);

  const pollData = {
    pollName,
    pollId,
    questions: questionsData,
    pollStatus,
    adminId,
    pollCreatedAt,
    pollEndsAt
  };

  pollRef.set(pollData)
    .then(() => {
      res.status(201).json({
        message: 'Poll created successfully',
        pollData
      });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Failed to create poll' });
    });
  });

  firebaseController.post('/vote', (req, res) => {
    const pollId = req.body.pollId;
    const questionId = req.body.questionId;
    const optionId = req.body.optionId;
  
    const pollRef = fireDb.ref(`polls/${pollId}`);

    pollRef.once('value', (snapshot) => {
    const pollData = snapshot.val();
    const question = pollData.questions[questionId];
    const option = question.options[optionId];

    option.votes++;
    question.totalVotes++;

    pollRef.update(pollData)
        .then(() => {
          res.send('Vote recorded successfully');
        })
        .catch((error) => {
          res.status(500).send(`Error recording vote: ${error}`);
        });
    });
  });


  firebaseController.get('/polls',async(req, res) => {
    try {
      const snapshot = await fireDb.ref('polls').once('value');
      const pollsObject = snapshot.val();
      const pollsArray = Object.keys(pollsObject).map((key) => {
        return {
          pollId: key,
          ...pollsObject[key]
        };
      });
      res.json(pollsArray);
    } catch (error) {
      res.status(500).send('Failed to retrieve poll data.');
    }
  });




  module.exports = {
    firebaseController
}
