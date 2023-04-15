import {
  Box,
  Flex,
  Image,
  Input,
  Stack,
  Button,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  ModalFooter,
  Text,
  Icon,
  FormLabel,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import StarsRating from "stars-rating";
import { useNavigate } from "react-router-dom";
import PollModal from "../components/PollModal";
import { useDispatch } from "react-redux";
import { addTemplateData, postPollData } from "../redux/data/action";
import { MdPoll } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { BiCheckShield } from "react-icons/bi";
import styles from "../styles/create.module.css";
import Navbar from "../components/Navbar";

function CreatePoll() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [questions, setQuestions] = useState([]);
  const [rating, setRating] = useState(0);
  const [pollName, setPollName] = useState("");
  const [template, setTemplate] = useState("");

  const navigate = useNavigate();
  const toast = useToast();
  let token = localStorage.getItem("adminToken");
  const dispatch = useDispatch();

  const handleQuestionCreate = (e) => {
    let type = e.target.value;
    const newQuestion = {
      question: "",
      options: [],
      type: type,
      maxSelections: "1",
    };
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

    newQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionRatingChange = (event, questionIndex, optionIndex) => {
    let rating = [];
    for (let i = 1; i <= event; i++) {
      rating.push(i);
    }
    setRating(event);
    const newQuestions = [...questions];
    for (let i = 1; i <= event; i++) {
      newQuestions[questionIndex].options[i - 1] = i;
    }

    setQuestions(newQuestions);
  };

  const handleDeleteQuestion = (questionIndex) => {
    let newQuestion = questions
    newQuestion.splice(newQuestion.indexOf(questionIndex), 1)
    setQuestions([...newQuestion])
  }


  const handleSubmit = () => {
    const data = {
      pollName: pollName,
      questions: questions.map((question) => ({
        question: question.question,
        type: question.type,
        maxSelections: question.maxSelections,
        options: question.options,
      })),
      pollStatus: true,
      pollCreatedAt: Date.now(),
      pollEndsAt: Date.now() + 6 * 60 * 30 * 1000
    };
    dispatch(postPollData(data, token));

    toast({
      title: "Poll created.",
      description: "We've created your poll.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
    navigate("/live-polls");
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


    toast({
      title: "Templated created.",
      description: "We've saved your template.",
      status: "success",
      duration: 8000,
      isClosable: true,
    });
    navigate("/template-page");
  };

  return (
    <Box>
      <Navbar />
      <Box>
        <Flex className={styles.cont}>
          <Box className={styles.optionCont}>
            <Text fontFamily={"Poppins"} fontSize={"20px"}>
              Create your polls
            </Text>
            <Text fontSize={"12px"} fontFamily={"Open Sans"}>
              Engage your audience with live polls, surveys or quizzes.
            </Text>
            <Flex gap={5} mt={5}>
              <Button
                className={styles.btn}
                fontWeight={400}
                value={"poll"}
                onClick={handleQuestionCreate}
                variant="ghost"
                leftIcon={<Icon boxSize={6} color={"#A000FF"} as={MdPoll} />}
              >
                {" "}
                Poll{" "}
              </Button>
              <Button
                className={styles.btn}
                fontWeight={400}
                value={"mcq"}
                onClick={handleQuestionCreate}
                variant="ghost"
                leftIcon={
                  <Icon boxSize={6} color="#26D948" as={BiCheckShield} />
                }
              >
                {" "}
                MCQ{" "}
              </Button>
              <Button
                className={styles.btn}
                fontWeight={400}
                value={"rating"}
                onClick={handleQuestionCreate}
                variant="ghost"
                leftIcon={<Icon boxSize={6} color="#D7FA5C" as={FaStar} />}
              >
                {" "}
                Rating{" "}
              </Button>
            </Flex>
          </Box>
          <Box className={styles.quesCont}>
            {questions.length > 0 ? (
              <>
                <FormControl>
                  <FormLabel fontFamily={"Poppins"}>Poll name</FormLabel>
                  <Input
                    focusBorderColor="#D71A20"
                    className={styles.inputField}
                    placeholder="enter poll name"
                    borderRadius={"none"}
                    onChange={(e) => setPollName(e.target.value)}
                  />
                </FormControl>
              </>
            ) : (
              <Box w="100%">
                <Box className={styles.emptyCont}></Box>
                <Text
                  fontSize={"18px"}
                  color={"#BDC3CB"}
                  fontFamily={"Open Sans"}
                >
                  Add question to start the poll
                </Text>
              </Box>
            )}
            {questions.map((question, questionIndex) => (
              <Box
                key={questionIndex}
                mt={10}
                p={5}
                border={"1px solid #C0C9CC"}
              >
                <Flex gap={2} fontFamily={"Poppins"}>
                  <Text>{`${questionIndex + 1}. `}</Text>
                  <FormLabel>Question name</FormLabel>
                </Flex>
                <Flex align={"center"} gap={2}>
                  <Input
                    focusBorderColor="#D71A20"
                    className={styles.inputField}
                    placeholder="Create question"
                    borderRadius={"none"}
                    value={question.title}
                    onChange={(event) =>
                      handleTitleChange(event, questionIndex)
                    }
                  />
                  <Button
                    borderRadius={"none"}
                    fontWeight={400}
                    onClick={() => handleDeleteQuestion(questionIndex)}
                  >
                    <DeleteIcon color={"red"} />
                  </Button>
                </Flex>
                <Stack>
                  {question.type === "rating" ? (
                    <Button
                      marginTop={"10px"}
                      fontWeight={400}
                      bg={"#D71A20"}
                      borderRadius={"none"}
                      w={"200px"}
                      color={"white"}
                      onClick={() => handleRatingOptionCreate(questionIndex)}
                    >
                      Add Rating
                    </Button>
                  ) : (
                    <Button
                      marginTop={"10px"}
                      fontWeight={400}
                      bg={"#D71A20"}
                      w={"200px"}
                      color={"white"}
                      borderRadius={"none"}
                      onClick={() => handleOptionCreate(questionIndex)}
                    >
                      Add Option
                    </Button>
                  )}

                  {question.type === "mcq" && (
                    <Input
                      focusBorderColor="#D71A20"
                      marginTop={"10px"}
                      type="number"
                      borderRadius={"none"}
                      className={styles.inputField}
                      placeholder="max option"
                      onChange={(event) =>
                        handleSelectionChange(event, questionIndex)
                      }
                    />
                  )}
                </Stack>
                <>
                  {question.type === "rating" && (
                    <>
                      <StarsRating
                        count={10}
                        value={rating}
                        half={false}
                        onChange={(event) =>
                          handleOptionRatingChange(event, questionIndex)
                        }
                        size={44}
                        color2={"#ffd700"}
                      />
                    </>
                  )}

                  {question.options.map((option, optionIndex) => (
                    <Box key={optionIndex}>
                      {question.type === "mcq" && (
                        <>
                          <Input
                            focusBorderColor="#D71A20"
                            placeholder={`option ${optionIndex + 1}`}
                            marginTop={"10px"}
                            className={styles.inputField}
                            borderRadius={"none"}
                            value={option.option}
                            onChange={(event) =>
                              handleOptionTitleChange(
                                event,
                                questionIndex,
                                optionIndex
                              )
                            }
                          />
                        </>
                      )}
                      {question.type === "poll" && (
                        <Input
                          focusBorderColor="#D71A20"
                          placeholder={`option ${optionIndex + 1}`}
                          className={styles.inputField}
                          marginTop={"10px"}
                          borderRadius={"none"}
                          value={option.option}
                          onChange={(event) =>
                            handleOptionTitleChange(
                              event,
                              questionIndex,
                              optionIndex
                            )
                          }
                        />
                      )}
                    </Box>
                  ))}
                </>
              </Box>
            ))}

            <Flex justifyContent={"left"} mt={10}>
              {questions.length > 0 ? (
                <PollModal handleQuestionCreate={handleQuestionCreate} />
              ) : (
                <></>
              )}
            </Flex>
            <Flex mt={10} gap={2} justify={"center"}>
              {questions.length > 0 ? (
                <Button
                  bg={"#D71A20"}
                  fontWeight={400}
                  borderRadius={"none"}
                  color={"white"}
                  w={"200px"}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              ) : (
                <></>
              )}
              {questions.length > 0 ? (
                <>
                  <Button
                    bg={"#D71A20"}
                    fontWeight={400}
                    borderRadius={"none"}
                    color={"white"}
                    w={"200px"}
                    onClick={onOpen}
                  >
                    Save Template
                  </Button>
                  <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                    isCentered
                  >
                    <ModalOverlay
                      bg="blackAlpha.300"
                      backdropFilter="blur(10px) hue-rotate(90deg)"
                    />
                    <ModalContent>
                      <ModalHeader>Enter Template Name</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody pb={6}>
                        <FormControl>
                          <Input
                            focusBorderColor="#D71A20"
                            ref={initialRef}
                            placeholder="Template name"
                            borderRadius={"none"}
                            onChange={(e) => setTemplate(e.target.value)}
                          />
                        </FormControl>
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          bg={"#D71A20"}
                          fontWeight={400}
                          color={"white"}
                          borderRadius={"none"}
                          onClick={handleCreateTemplate}
                          mr={3}
                        >
                          Save
                        </Button>
                        <Button borderRadius={"none"} onClick={onClose}>
                          Cancel
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </>
              ) : (
                <></>
              )}
            </Flex>
            {/* <TemplateModal handeSave={handleSave} /> */}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default CreatePoll;
