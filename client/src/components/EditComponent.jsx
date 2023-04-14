import {
  Box, Button, FormControl, Input, Modal,
  ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader,
  ModalOverlay, Text, useDisclosure,
  useToast
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { getTemplateByIdData, postPollData } from "../redux/data/action";
import StarsRating from 'stars-rating'
import { useParams } from "react-router-dom";

const EditComponent = (props) => {
  const [poll, setPollName] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  let data = {
    questions: [props.item],
    pollStatus: true,
    pollCreatedAt: Date.now(),
    pollEndsAt: Date.now() + 8 * 60 * 30 * 1000
  }




  const [currentPoll, setCurrentPoll] = useState(data);

  const dispatch = useDispatch()
  const [rating, setRating] = useState(0)
  const toast = useToast()
  const { id } = useParams()

  let token = localStorage.getItem("adminToken");



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



  };



  const handleOptionRatingChange = (event, questionIndex, optionIndex) => {

    setRating(event)
    let updatedPoll = Object.assign({}, currentPoll);
    updatedPoll[questionIndex].options[optionIndex] = event;

    updatedPoll.questions[questionIndex].options[optionIndex] = event
    setCurrentPoll(updatedPoll);

  };





  const handleSubmit = () => {

    currentPoll.pollName = poll


    dispatch(postPollData(currentPoll, token))


    toast({
      title: 'Poll started.',
      description: "We've started the poll.",
      status: 'success',
      duration: 9000,
      isClosable: true,
    })

  };


  useEffect(() => {
    dispatch(getTemplateByIdData(id, token))
  }, [])




  return (
    <Box padding={'2%'} bgColor={"#F2F7FF"} paddingLeft={'10%'} paddingRight={'10%'}>
      <Text fontWeight={650} marginTop={'20px'} fontSize={"20px"}>Edit Poll Options</Text>

      {currentPoll?.questions.map((question, questionIndex) => (
        <Box key={questionIndex}>
          <Text mt={"20px"}
            fontFamily={"Open Sans"}
            fontSize={"20px"} marginBottom={'10px'} textAlign={'left'}>{question.question}</Text>
          {question?.type === "rating" ? <></> : <Button marginTop={"10px"} bg={"red.400"} w={'200px'} color={'white'}
            onClick={() => handleOptionCreate(questionIndex)}>
            Add Option
          </Button>}

          <>

            {question.type === "rating" &&

              <>

                <StarsRating
                 half={false}
                  count={10}
                  value={question.options.length}
                  onChange={(event) => handleOptionRatingChange(event, questionIndex)}
                  size={44}
                  color2={'#ffd700'} />

              </>
            }





          </>



          {question?.options.map((option, optionIndex) => (
            <Box key={optionIndex}>
              {/* <label color={"#6C6768"} fontSize={"20px"} textAlign={'left'} htmlFor={`option-${questionIndex}-${optionIndex}`}>Option {optionIndex+1}</label> */}
              {/* <FormLabel marginLeft={'3px'} marginTop={'10px'} marginBottom="1px"  fontSize={'12px'} htmlFor={`option-${questionIndex}-${optionIndex}`}>Option {optionIndex+1}</FormLabel> */}
              {question.type === "poll" && <Input
                bg={'white'}

                id={`option-${questionIndex}-${optionIndex}`}
                type="text"
                value={option}
                onChange={(event) => handleOptionChange(event, questionIndex, optionIndex)}
              />}

              {question.type === "mcq" && <Input
                bg={'white'}

                id={`option-${questionIndex}-${optionIndex}`}
                type="text"
                value={option}
                onChange={(event) => handleOptionChange(event, questionIndex, optionIndex)}
              />}

            </Box>
          ))}
        </Box>
      ))}

      {/* <Button marginTop={'40px'} color={'white'} bg={'red.400'} onClick={handleSubmit}>Launch poll</Button> */}
      <>
        <Button bg={"red.400"} marginTop={'40px'} color={'white'} marginLeft={"5px"} onClick={onOpen}>Launch poll</Button>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay bg='none' />
          <ModalContent>
            <ModalHeader>Enter Poll Name</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>

                <Input ref={initialRef} placeholder='Poll name' onChange={(e) => setPollName(e.target.value)} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button bg={"red.400"} color={'white'} onClick={handleSubmit} mr={3}>
                Start
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </Box>
  );
};

export default EditComponent;