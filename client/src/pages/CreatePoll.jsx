import {
  Box, Flex, Image, Input, Stack, Button, useToast,
  useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalCloseButton, ModalBody, FormControl,
  ModalFooter
} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { DeleteIcon } from '@chakra-ui/icons';
import image_4 from '../images/image_4.png';
import image_3 from '../images/image_3.png';
import image_2 from '../images/image_2.png';
import image_1 from '../images/image_1.png';
import StarsRating from 'stars-rating'
import { useNavigate } from 'react-router-dom';
import PollModal from '../components/PollModal';
import { useDispatch } from 'react-redux';
import { addTemplateData, postPollData } from '../redux/data/action';

import Navbar from "../components/Navbar";



function CreatePoll() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const finalRef = useRef(null)
  const [questions, setQuestions] = useState([]);
  const [rating, setRating] = useState(0)
  const [pollName, setPollName] = useState("");
  const [template, setTemplate] = useState("")
 
  const navigate = useNavigate()
  const toast = useToast()
  let token = localStorage.getItem("adminToken");
  const dispatch = useDispatch()


  const handleQuestionCreate = (e) => {
    let type = e.target.value
    const newQuestion = { question: '', options: [], type: type, maxSelections: '1' };
    setQuestions([...questions, newQuestion]);
  };


  const handleOptionCreate = (questionIndex) => {
    const newOption = [];
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push(newOption);
    setQuestions(newQuestions);
  };

  const handleRatingOptionCreate = (questionIndex) => {
    const newOption = [];
    const newQuestions = [...questions];
    if (newQuestions[questionIndex].options.length === 0) {
      newQuestions[questionIndex].options.push(newOption);
      setQuestions(newQuestions);
    }

  };


  const handleTitleChange = (event, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleSelectionChange = (event, questionIndex) => {
    const newQuestions = [...questions];

    newQuestions[questionIndex].maxSelections = event.target.value;
    setQuestions(newQuestions);
  };


  const handleOptionTitleChange = (event, questionIndex, optionIndex) => {
    const newQuestions = [...questions];

    newQuestions[questionIndex].options[optionIndex] =
      event.target.value;
    setQuestions(newQuestions);
  };


  const handleOptionRatingChange = (event, questionIndex, optionIndex) => {
   let rating = []
    for(let i=1; i<=event; i++){
       rating.push(i)
    }
    setRating(event)
    const newQuestions = [...questions];
    for(let i=1; i<=event; i++){
      newQuestions[questionIndex].options[i-1] = i;

    }
   
    setQuestions(newQuestions);
  };


  const handleDeleteQuestion = (question) => {
    let newQuestion = questions
    newQuestion.splice(newQuestion.indexOf(question), 1)
    setQuestions([...newQuestion])
  }


  const handleSubmit = () => {
    const data = {
      pollName: pollName,
      questions: questions.map((question) => ({
        question: question.question,
        type: question.type,
        maxSelections: question.maxSelections,
        options: question.options
      })),
      pollStatus: true,
      pollCreatedAt: Date.now(),
      pollEndsAt: Date.now() + 2 * 60 * 30 * 1000
    };
    dispatch(postPollData(data, token))
    

    toast({
      title: 'Poll created.',
      description: "We've created your poll.",
      status: 'success',
      duration: 9000,
      isClosable: true
    })
    navigate('/live-polls')
  };

  const handleCreateTemplate = () => {

    const data = {
      templateName: template,
      questions: questions.map((question) => ({
        question: question.question,
        type: question.type,
        maxSelections: Number(question.maxSelections),
        options: question.options
      }))
    }
    dispatch(addTemplateData(data, token))
  
    // temp.push(data)
    // localStorage.setItem("template", JSON.stringify(temp))


    toast({
      title: 'Templated created.',
      description: "We've saved your template.",
      status: 'success',
      duration: 8000,
      isClosable: true
    })
    navigate('/template-page')
  }

 


  return (
    <Box>
      <Navbar />
      <Box bg={'#F2F7FF'}  border={'5%'} h={"100%"} >
        <Flex justifyContent={'space-between'} w={'100%'}>
          <Image marginRight={'5%'} w={'100px'} h={'100px'} marginTop={'1%'} alt="icon" src={image_4} />
          <Image marginRight={'5%'} w={'100px'} h={'100px'} alt="icon" src={image_3} />
          <Image marginRight={'5%'} w={'100px'} h={'100px'} alt="icon" src={image_2} />
          <Image marginRight={'5%'} w={'100px'} h={'100px'} alt="icon" src={image_1} />
        </Flex>


        <Stack marginLeft={'10%'} marginRight={'10%'}>

          
          <Flex justifyContent={'center'} gap={'20px'}>
              <Button h={'100px'} w={'100px'} bg={'red.400'} color='white' value={"poll"} onClick={handleQuestionCreate} variant='ghost'>     Poll </Button>
              <Button  h={'100px'} w={'100px'} bg={'red.500'} color='white' value={"mcq"} onClick={handleQuestionCreate}  variant='ghost'>    MCQ  </Button>
              <Button  h={'100px'} w={'100px'} bg={'red.600'} color='white' value={"rating"} onClick={handleQuestionCreate}  variant='ghost'>  Rating   </Button>
          </Flex>
          <Box>
            {questions.length > 0 ?
              <>
                <Input bg={'white'} placeholder='Add poll name' onChange={(e) => setPollName(e.target.value)} />
                {/* <Input bg={'white'} marginTop={'10px'} placeholder='Add template name' onChange={(e) => setTemplate(e.target.value)} /> */}

              </> : <></>
            }
            {questions.map((question, questionIndex) => (
              <Box key={questionIndex}>
                <Flex>
                  <Input marginTop={'40px'} placeholder='Create question' bg={"white"}
                    value={question.title}
                    onChange={(event) => handleTitleChange(event, questionIndex)} />
                  <Button marginTop={'40px'} bg={"white"} onClick={() => handleDeleteQuestion(questionIndex)}><DeleteIcon color={"red"} /></Button>
                </Flex>
                <Stack>

                  {question.type === "rating" ? <Button marginTop={"10px"} bg={"red.400"}
                    w={'200px'} color={'white'}
                    onClick={() => handleRatingOptionCreate(questionIndex)}
                  >
                    Add Rating
                  </Button> : <Button marginTop={"10px"} bg={"red.400"} w={'200px'} color={'white'}
                    onClick={() => handleOptionCreate(questionIndex)}>
                    Add Option
                  </Button>}
                  
                  {question.type === "mcq" && <Input marginTop={"10px"} type="number" w={'150px'} bg="white" placeholder='max option' onChange={(event) => handleSelectionChange(event, questionIndex)} />
                  }
                </Stack>
                <>
                
                {question.type === "rating" &&

<>

  <StarsRating
    count={10}
    value={rating}
    onChange={(event) => handleOptionRatingChange(event, questionIndex)}
    size={44}
    color2={'#ffd700'} />

</>
}

                {question.options.map((option, optionIndex) => (
                  <Box key={optionIndex}>
                    {question.type === "mcq" &&
                      <>
                        <Input placeholder={`option ${optionIndex + 1}`} marginTop={"10px"} bg={"white"}
                          value={option.option}
                          onChange={(event) =>
                            handleOptionTitleChange(event, questionIndex, optionIndex)
                          }

                        />

                      </>

                    }
                    {question.type === "poll" && <Input
                      placeholder={`option ${optionIndex + 1}`} bg={"white"}
                      marginTop={"10px"}
                      value={option.option}
                      onChange={(event) =>
                        handleOptionTitleChange(event, questionIndex, optionIndex)
                      }
                    />}

                  </Box>

                ))}
                </>
              </Box>
           
            ))}
           
            <Flex justifyContent={"left"} paddingTop={'10px'} >
            {questions.length > 0 ? <PollModal handleQuestionCreate={handleQuestionCreate} /> : <></>}
            </Flex>
            {questions.length > 0 ? <Button marginBottom={'35px'} bg={"red.400"} marginRight={"10px"}  color={'white'} w={"200px"} onClick={handleSubmit}>Submit</Button> : <></>}
            {questions.length > 0 ?

              <>
                <Button bg={"red.500"} color={'white'} marginBottom={'35px'}   w={"200px"} onClick={onOpen}>Save Template</Button>

                <Modal
                  initialFocusRef={initialRef}
                  finalFocusRef={finalRef}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay bg='none' />
                  <ModalContent>
                    <ModalHeader>Enter Template Name</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <FormControl>

                        <Input ref={initialRef} placeholder='Template name' onChange={(e) => setTemplate(e.target.value)} />
                      </FormControl>
                    </ModalBody>

                    <ModalFooter>
                      <Button bg={"red.400"} color={'white'} onClick={handleCreateTemplate} mr={3}>
                        Save
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              </>
              : <></>}
            {/* <TemplateModal handeSave={handleSave} /> */}

          </Box>


        </Stack>




      </Box>
    </Box>
  )
}

export default CreatePoll