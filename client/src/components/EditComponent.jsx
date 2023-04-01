import { Box, Button, FormLabel, Input, Text, useToast } from "@chakra-ui/react";
import { distance } from "framer-motion";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postPollData } from "../redux/data/action";
import StarsRating from 'stars-rating'
const EditComponent= (props) => {
  
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOm51bGwsImVtYWlsIjoidmVkYW50cGF3YXIxOEBnbWFpbC5jb20iLCJmdWxsTmFtZSI6IlZlZGFudCBQYXdhciIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjgwMTc3MjYwLCJleHAiOjE2ODAxODA4NjB9.RHwjDDdf36a7i6gV_jh7vCPyyfDF46-BKf9pE37ZB8g"
  const [currentPoll, setCurrentPoll] = useState(props.item);
  const [data, setData] = useState([])
  const dispatch = useDispatch()
 
  const toast = useToast()
  const handleOptionChange = (event, questionIndex, optionIndex) => {
  
    let updatedPoll = Object.assign({}, currentPoll);
  
    updatedPoll.questions[questionIndex].options[optionIndex] = event.target.value;

    setCurrentPoll(updatedPoll);
  };


  const handleSubmit = () => {
   
    const templates = {
      pollName:"pollName",
      templateId:"id",
      adminId:"adid1234",
      templateName:currentPoll.templateName,
      questions:currentPoll.questions
    }
    dispatch(postPollData(templates,token))
    toast({
      title: 'Poll created.',
      description: "We've created your poll.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })

    // console.log("currentPoll",currentPoll)
  };


 
  return (
    <Box padding={'2%'} bgColor={"#F2F7FF"} paddingLeft={'10%'} paddingRight={'10%'}>
      <Text fontWeight={650} marginTop={'20px'} fontSize={"20px"}>Edit Poll Options</Text>
     
        {currentPoll.questions.map((question, questionIndex) => (
          <Box key={questionIndex}>
            <Text mt={"20px"}
									fontFamily={"Open Sans"}
									 fontSize={"20px"} marginBottom={'10px'} textAlign={'left'}>{question.question}</Text>
            {question.options.map((option, optionIndex) => (
              <Box key={optionIndex}>
                {/* <label color={"#6C6768"} fontSize={"20px"} textAlign={'left'} htmlFor={`option-${questionIndex}-${optionIndex}`}>Option {optionIndex+1}</label> */}
                <FormLabel marginLeft={'3px'} marginTop={'10px'} marginBottom="1px"  fontSize={'12px'} htmlFor={`option-${questionIndex}-${optionIndex}`}>Option {optionIndex+1}</FormLabel>
                <Input
                bg={'white'}
                  id={`option-${questionIndex}-${optionIndex}`}
                  type="text"
                  value={option}
                  onChange={(event) => handleOptionChange(event, questionIndex, optionIndex)}
                />
                       {question.type==="rating"&&
               
               <>

<StarsRating
  count={10}
  value={option}
  onChange={(event)=>handleOptionChange(event, questionIndex, optionIndex)}
  size={44}
  color2={'#ffd700'} />  

             </> 
              }
             
              </Box>
            ))}
          </Box>
        ))}

        <Button marginTop={'40px'} color={'white'} bg={'red.400'} onClick={handleSubmit}>Save Changes</Button>
     
    </Box>
  );
};

export default EditComponent
;