import { userInfo } from "os"
import { pollDataToUser } from "./server/utils/utils"

{
  "pollId" = "string",
  "pollname" = "string",
    "questions" = [
      {
        "question " : "abc",
        'options' : ['opt1', 'opt2', 'opt3', 'opt4'],
        "selectedOption" : ["opt4"],
        "type" : "type_of_question",
        "maxSelection" : Number,

        "selectedOption" : [{"questionId" : "abd", "optionId" :"123"}, {"questionId":"abd", "optionId":"456"}, {} ]
        
      },
      {
        ...
      }
    ]
}

2 - 
    1-if the link which admin has shared has been already attnded the userInfo
    2-if the user has not attended the poll
    3-if the poll has ended



   const payload =  {
      "pollId" : "xyz",
      "pollData" : [{}],
      "selectedAns" : [{"questionId" : "qu1", "optionId" : ['opxxxyzz', 'optinxyz2']}, 
                       {"questionId" : "qu1", "optionId" : ['opxxxyzz', 'optinxyz2']}]
    }