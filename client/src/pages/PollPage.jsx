import React, { useEffect, useState } from "react";
import styles from "../styles/pollpage.module.css";
import { Box, Button, Flex, Text, Spinner, useToast } from "@chakra-ui/react";
import axios from "axios";
import QuestionCard from "../components/QuestionCard";
import { useParams } from "react-router-dom";

const PollPage = () => {
  const [pollData, setPollData] = useState("");
  const { pollName, questions } = pollData;
  const userToken = localStorage.getItem("userToken") || "";
  const [selections, setSelections] = useState();
  const [voteData, setVoteData] = useState();
  const [questionData, setQuesData] = useState([]);
  const [pollDetail, setPollDetail] = useState([]);
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const toast = useToast();

  // A parent function for retrieving the Payload from child component(Question.jsx)

  const handleSelectionChange = (selectedOptions) => {
    setSelections(selectedOptions);
  };

  //  An onSubmit function for adding the new vote

  const vote = (e) => {
    e.preventDefault();
    setSubmitting(true);
    axios({
      method: "POST",
      url: "http://localhost:8080/firebase/vote",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      data: voteData,
    })
      .then((res) => {
        setSubmitting(false);
        if (res?.status === 200) {
          toast({
            title: "YaY, You did it.👍",
            description: "We've collected your opinon.😋",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else if (res?.status === 208) {
          toast({
            title: "You've allready voted.👍",
            description: "We've allready collected your opinon.😋",
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((error) => {
        setSubmitting(false);
      });
  };

  //  for setting the payload and pushing set into voteData

  useEffect(() => {
    if (selections) {
      const { question, questionId, selectedAns, options } = selections;
      const existingQuestionIndex = pollDetail.findIndex(
        (q) => q.questionId === questionId
      );
      if (existingQuestionIndex === -1) {
        // add new question to array
        setPollDetail([
          ...pollDetail,
          { question, questionId, selectedAns, options },
        ]);
      } else {
        // update options ids for existing question
        const updatedQuestion = {
          ...pollDetail[existingQuestionIndex],
          selectedAns,
        };
        const updatedPollDetail = [...pollDetail];
        updatedPollDetail[existingQuestionIndex] = updatedQuestion;
        setPollDetail(updatedPollDetail);
      }

      const payload = {
        pollData: pollDetail,
        pollId: pollData?.pollId,
        pollName: pollData?.pollName,
        selectedAnswers: questionData,
      };
      setVoteData(payload);
    }
  }, [selections, questionData]);

  //  For adding the selected answers array to questionData

  useEffect(() => {
    if (selections) {
      const { questionId, selectedAns } = selections;
      const existingQuestion = questionData.find(
        (q) => q.questionId === questionId
      );
      if (existingQuestion) {
        // update options ids for existing question
        const updatedQuestion = {
          ...existingQuestion,
          optionsIds: selectedAns,
        };
        setQuesData([
          ...questionData.filter((q) => q.questionId !== questionId),
          updatedQuestion,
        ]);
      } else {
        // add new question to array
        setQuesData([...questionData, { questionId, optionsIds: selectedAns }]);
      }
    }
  }, [selections]);

  //  For fetching the live poll for perticular user by userId

  useEffect(() => {
    setLoader(true);
    axios
      .get(`http://localhost:8080/firebase/live-poll/${id}`, {
        headers: {
          Authorization: userToken,
        },
      })
      .then((response) => {
        setPollData(response.data[0]);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  }, [userToken]);

  console.log(pollData)

  return (
    <>
      {loader ? (
        <Box className={styles.loaderContainer}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="#FFC1C3"
            color="#D71A20"
            size="xl"
          />
        </Box>
      ) : (
        <Box className={styles.container}>
          <Text className={styles.heading}>VOTEK POLL</Text>

          <Box className={styles.pollContainer}>
            <Text className={styles.heading2}>{pollName}</Text>
            <form onSubmit={vote}>
              <Box className={styles.questionCont}>
                {questions?.length &&
                  questions.map((e, index) => {
                    return (
                      <QuestionCard
                        key={index}
                        {...e}
                        index={index}
                        onSelectionChange={handleSelectionChange}
                      />
                    );
                  })}
              </Box>
              <Flex mt={"20px"} justifyContent={"flex-end"}>
                <Button
                  bg={"#D71A20"}
                  color={"white"}
                  fontWeight={400}
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="Submitting"
                >
                  Submit
                </Button>
              </Flex>
            </form>
          </Box>
        </Box>
      )}
    </>
  );
};

export default PollPage;
