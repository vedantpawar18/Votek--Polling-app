import { Box, Button, FormLabel, Input, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTemplateData, getTemplateByIdData, postPollData } from "../redux/data/action";
import StarsRating from 'stars-rating'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const EditComponent= (props) => {

const templateName = localStorage.getItem("templateName");

  let data = {
    pollName:templateName,
    questions:[props.item],
    pollStatus: true,
    pollCreatedAt: Date.now(),
    pollEndsAt: Date.now() + 2 * 60 * 30 * 1000
  }
  // console.log("cccc",data)
  const [currentPoll, setCurrentPoll] = useState(data);

  const dispatch = useDispatch()
  const [rating, setRating] = useState(0)
  const toast = useToast()
  const {id} = useParams()
  // const dataById = useSelector((store)=>store.data.dataDetails)||[]
  let token = localStorage.getItem("adminToken");

// console.log("data by id",dataById)

  const handleOptionChange = (event, questionIndex, optionIndex) => {
  
    let updatedPoll = Object.assign({}, currentPoll);
  
    updatedPoll.questions[questionIndex].options[optionIndex] = event.target.value;

    setCurrentPoll(updatedPoll);
  };



  const handleOptionCreate = (questionIndex) => {

    let updatedPoll = Object.assign({}, currentPoll);
    const newOption = '';
    updatedPoll.questions[questionIndex].options.push(newOption);
    setCurrentPoll(updatedPoll);
    // console.log("check",currentPoll)
  };



  const handleOptionRatingChange = (event, questionIndex, optionIndex) => {
    
    setRating(event)
    let updatedPoll = Object.assign({}, currentPoll);
    updatedPoll[questionIndex].options[optionIndex] = event;
  
    updatedPoll.questions[questionIndex].options[optionIndex] = event
    setCurrentPoll(updatedPoll);
 
  };

  const handleSubmit = () => {
   



    dispatch(postPollData(currentPoll,token))


    toast({
      title: 'Poll started.',
      description: "We've started the poll.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })
    // console.log("currentPoll",currentPoll)
  };


  useEffect(()=>{
    dispatch(getTemplateByIdData(id,token))
  },[])
 
// console.log("currentPoll zzzzz",currentPoll)


  return (
    <Box padding={'2%'} bgColor={"#F2F7FF"} paddingLeft={'10%'} paddingRight={'10%'}>
      <Text fontWeight={650} marginTop={'20px'} fontSize={"20px"}>Edit Poll Options</Text>
     
        {currentPoll?.questions.map((question, questionIndex) => (
          <Box key={questionIndex}>
            <Text mt={"20px"}
									fontFamily={"Open Sans"}
									 fontSize={"20px"} marginBottom={'10px'} textAlign={'left'}>{question.question}</Text>
                    {question?.type==="rating"? <></>:<Button marginTop={"10px"} bg={"red.400"} w={'200px'} color={'white'}
           onClick={() => handleOptionCreate(questionIndex)}>
            Add Option
          </Button>}
            {question?.options.map((option, optionIndex) => (
              <Box key={optionIndex}>
                {/* <label color={"#6C6768"} fontSize={"20px"} textAlign={'left'} htmlFor={`option-${questionIndex}-${optionIndex}`}>Option {optionIndex+1}</label> */}
                <FormLabel marginLeft={'3px'} marginTop={'10px'} marginBottom="1px"  fontSize={'12px'} htmlFor={`option-${questionIndex}-${optionIndex}`}>Option {optionIndex+1}</FormLabel>
              { question.type==="poll" && <Input
                bg={'white'}
                 
                  id={`option-${questionIndex}-${optionIndex}`}
                  type="text"
                  value={option}
                  onChange={(event) => handleOptionChange(event, questionIndex, optionIndex)}
                />}

{ question.type==="mcq" && <Input
                bg={'white'}
                 
                  id={`option-${questionIndex}-${optionIndex}`}
                  type="number"
                  value={option}
                  onChange={(event) => handleOptionChange(event, questionIndex, optionIndex)}
                />}
                       {question.type==="rating"&&
               
               <>

<StarsRating
  count={10}
  value={option}
  onChange={(event)=>handleOptionRatingChange(event, questionIndex, optionIndex)}
  size={44}
  color2={'#ffd700'} />  

             </> 
              }
             
              </Box>
            ))}
          </Box>
        ))}

        <Button marginTop={'40px'} color={'white'} bg={'red.400'} onClick={handleSubmit}>Launch poll</Button>
     
    </Box>
  );
};

export default EditComponent
;