"use strict";
const { Router } = require("express");
const firebaseController = Router();
const {firebase} = require('../config/db');
const { pollDataToUser,decryptToken, pollToArray} = require("../utils/utils");
const {UserModel} = require("../models/User.model")
const fireDb = firebase.database(); 
const bodyParser = require('body-parser');
const express = require("express")

const app = express();
app.use(express.json());

firebaseController.post("/create-poll", async (req, res) => {
  const { pollName, questions, pollStatus, pollCreatedAt, pollEndsAt } =
    req.body;

  if (!req.headers.authorization) {
    return res.send("Please login again");
  } else {
    const pollRef = fireDb.ref("polls").push();
    const pollId = pollRef.key;
    const token = req.headers.authorization.split(" ")[1];
    const userToken = decryptToken(token);
    const user = await UserModel.find({ email: userToken.email });
    const userRole = user[0].userRole;
    if (userRole !== "admin") {
      res.send("Only admin is allowed to create a poll");
    } else {
      const adminId = user[0]._id;
      await UserModel.findOneAndUpdate(
        { email: userToken.email },
        { $push: { pollsCreated: { pollId: pollId } } }
      );
      const pollUrl = `http://localhost:8080/firebase/live-poll/${pollId}`;
      const formattedQuestions = questions.map((question) => {
        const questionRef = pollRef.child("questions").push();
        const questionId = questionRef.key;
        const formattedOptions = question.options.map((option) => {
          const optionRef = questionRef.child("options").push();
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
            type: question.type,
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
        adminId: adminId.toString(),
        pollCreatedAt,
        pollEndsAt,
        pollUrl,
      };

      pollRef
        .set(pollData)
        .then(() => {
          res.status(201).json({
            message: "Poll created successfully",
            pollData,
            url: pollUrl,
          });
        })
        .catch((error) => {
          res.status(500).json({ message: "Failed to create poll" });
        });
    }
  }
});

firebaseController.post("/vote", async (req, res) => {
  const { pollId, selectedAnswers, pollData, pollName } = req.body;
  if (!req.headers.authorization) {
    return res.status(401).send("Please login again");
  } else {
    const token = req.headers.authorization.split(" ")[1];
    const userToken = decryptToken(token);
    console.log(userToken);
    const user = await UserModel.find({ email: userToken.email });
    const userId = user[0]?._id;

    if (!userId) {
      res.status(400).send("User not found");
    } else {
      const pollRef = firebase.database().ref("polls/" + pollId);

      pollRef.child("usersAttended").once("value", async function (snapshot) {
        const usersAttended = snapshot.val() || [];

        if (Object.values(usersAttended).includes(userId.toString())) {
          res.status(208).send("User already voted for this poll");
        } else {
          pollRef.child("usersAttended").push(userId.toString());

          await UserModel.findOneAndUpdate(
            { _id: userId },
            {
              $push: {
                pollsAttended: {
                  pollData: pollData,
                  pollName: pollName,
                  pollId: pollId,
                },
              },
            }
          );

          pollRef.once("value", (snapshot) => {
            const pollData = snapshot.val();

            for (const selectedAnswer of selectedAnswers) {
              const { questionId, optionsIds } = selectedAnswer;
              const question = pollData.questions[questionId];
              const options = optionsIds.map(
                (optionId) => question.options[optionId]
              );
              options.map((option) => {
                option.votes++;
                if (option.votedBy == null) {
                  option.votedBy = [];
              }
              option.votedBy.push({
                  email: userToken.email,
                  userId: userId,
                  fullName: user[0].fullName
              });
              });
              question.totalVotes++;
            }

            pollRef
              .update(pollData)
              .then(() => {
                res.status(200).send("Vote recorded successfully");
              })
              .catch((error) => {
                res.status(500).send(`Error recording vote: ${error}`);
              });
          });
        }
      });
    }
  }
});

firebaseController.get("/live-polls", async (req, res) => {
  try {
    const snapshot = await fireDb.ref("polls").once("value");
    const pollsObject = snapshot.val();
    const newPoll = pollToArray(pollsObject);

    if (!req.headers.authorization) {
      return res.send("Please login again");
    } else {
      const token = req.headers.authorization.split(" ")[1];
      const userToken = decryptToken(token);
      const user = await UserModel.find({ email: userToken.email });
      const userRole = user[0].userRole;
      if (userRole !== "admin") {
        res.send("Only admin is allowed to see a poll");
      } else {
        const adminId = user[0]._id;
        const filteredPolls = newPoll.filter(
          (poll) => poll.adminId === adminId.toString()
        );
        res.send(filteredPolls);
      }
    }
  } catch (error) {
    res.status(500).send("Failed to retrieve poll data.");
  }
});

firebaseController.get("/live-poll/:pollId", async (req, res) => {
  const pollId = req.params.pollId;
  if (!req.headers.authorization) {
    return res.status(401).send("Please login again");
  } else {
    fireDb.ref(`polls/${pollId}`).once(
      "value",
      (snapshot) => {
        const pollData = snapshot.val();
         if (!pollData) {
          res.status(404).send("Poll not found");
          return;
        }
        const newPoll = pollDataToUser(pollData);
        res.json(newPoll);
      },
      (error) => {
        res.status(500).send("Internal Server Error");
      }
    );
  }
});


  
module.exports = {
  firebaseController,
};
