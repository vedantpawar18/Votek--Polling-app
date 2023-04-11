const jwt = require("jsonwebtoken");


const validateEmail = (email) => {
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailFormat)) return true;
    else return false;
  };

const generateToken = ({ userId=null,email=null ,fullName=null,role=null  }) => {
    const primaryToken = jwt.sign(
      {userId:userId, email: email, fullName:fullName, role:role  },
      process.env.PRIMARY_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    const refreshToken = jwt.sign(
      {userId:userId, email: email, fullName:fullName, role:role },
      process.env.REFRESH_SECRET_KEY,
      {
        expiresIn: "7days",
      }
    );
    return {
      primaryToken,
      refreshToken,
    };
  };

  function jsonToArray(polls ) {
    const convertedPolls = polls.map(poll => {
      const convertedQuestions = Object.entries(poll.questions).map(([questionId, question]) => {
        const convertedOptions = Object.entries(question.options).map(([optionId, option]) => {
          return {
            optionId,
            option: option.option,
            votes: option.votes,
          };
        });
        return {
          questionId,
          question: question.question,
          maxSelections: question.maxSelections,
          totalVotes: question.totalVotes,
          options: convertedOptions,
        };
      });
      return {
        pollId: poll.pollId,
        adminId: poll.adminId,
        pollCreatedAt: poll.pollCreatedAt,
        pollEndsAt: poll.pollEndsAt,
        pollName: poll.pollName,
        pollStatus: poll.pollStatus,
        questions: convertedQuestions,
      };
    });
    return convertedPolls;
  }

  function pollToArray(pollsObject) {
    const pollsArray = [];
    
    for (const pollId in pollsObject) {
      const poll = pollsObject[pollId];
      const questionsArray = [];
  
      for (const questionId in poll.questions) {
        const question = poll.questions[questionId];
        const optionsArray = [];
  
        for (const optionId in question.options) {
          const option = question.options[optionId];
          optionsArray.push({
            optionId,
            option: option.option,
            votes: option.votes,
            votedBy:option.votedBy
          });
        }
  
        questionsArray.push({
          questionId,
          question: question.question,
          maxSelections: question.maxSelections,
          totalVotes: question.totalVotes,
          options: optionsArray,
        });
      }
  
      pollsArray.push({
        pollId,
        adminId: poll.adminId,
        usersAttended:poll.usersAttended,
        pollCreatedAt: poll.pollCreatedAt,
        pollEndsAt: poll.pollEndsAt,
        pollName: poll.pollName,
        pollStatus: poll.pollStatus,
        pollUrl: poll.pollUrl,
        questions: questionsArray,
      });
    }
  
    return pollsArray;
  }
  

  function convertPollData(data) {
    const result = {
      pollId: data.pollId,
      adminId: data.adminId,
      pollCreatedAt: data.pollCreatedAt,
      pollEndsAt: data.pollEndsAt,
      pollName: data.pollName,
      pollStatus: data.pollStatus,
      questions: []
    };
  
    for (const [questionId, questionData] of Object.entries(data.questions)) {
      const options = [];
      let totalVotes = 0;
  
      for (const [optionId, optionData] of Object.entries(questionData.options)) {
        options.push({
          optionId,
          option: optionData.option,
          votes: optionData.votes
        });
  
        totalVotes += optionData.votes;
      }
  
      result.questions.push({
        questionId,
        question: questionData.question,
        maxSelections: questionData.maxSelections,
        totalVotes,
        options
      });
    }
  
    return [result];
  }

  function pollDataToUser(data) {
    const result = {
      pollId: data.pollId,
      pollCreatedAt: data.pollCreatedAt,
      pollEndsAt: data.pollEndsAt,
      pollName: data.pollName,
      pollStatus: data.pollStatus,
      questions: []
    };
  
    for (const [questionId, questionData] of Object.entries(data.questions)) {
      const options = [];
  
      for (const [optionId, optionData] of Object.entries(questionData.options)) {
        options.push({
          optionId,
          option: optionData.option,
        });
  
      }
  
      result.questions.push({
        questionId,
        question: questionData.question,
        type: questionData.type,
        maxSelections: questionData.maxSelections,
        options
      });
    }
  
    return [result];
  }

  function votedByData(data) {
    const result = {
      pollId: data.pollId,
      pollCreatedAt: data.pollCreatedAt,
      pollEndsAt: data.pollEndsAt,
      pollName: data.pollName,
      pollStatus: data.pollStatus,
      usersAttended: data.usersAttended,
      questions: []
    };
  
    for (const [questionId, questionData] of Object.entries(data.questions)) {
      const options = [];
  
      for (const [optionId, optionData] of Object.entries(questionData.options)) {
        options.push({
          optionId:optionId,
          option: optionData.option,
          votes: optionData.votes,
          votedBy: optionData.votedBy,
        });
  
      }
  
      result.questions.push({
        questionId:questionId,
        question: questionData.question,
        totalVotes: questionData.totalVotes,
        type: questionData.type,
        maxSelections: questionData.maxSelections,
        options
      });
    }
  
    return [result];
  }

  // function for decrypting token
const decryptToken =(token) =>{
  const tokenDecodablePart = token.split('.')[1];
  const decoded = JSON.parse(Buffer.from(tokenDecodablePart, 'base64').toString());
  return(decoded)
}

  module.exports = { validateEmail,decryptToken,votedByData,  generateToken, jsonToArray, pollToArray,convertPollData,  pollDataToUser};

