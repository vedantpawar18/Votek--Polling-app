import React, { useEffect, useState } from "react";
import styles from "../styles/pollpage.module.css";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import QuestionCard from "../components/QuestionCard";

const PollPage = () => {
  const [pollData, setPollData] = useState("");
  const { pollName, questions } = pollData;
  const userToken = localStorage.getItem("userToken");
  const [selections, setSelections] = useState();
  const [voteData, setVoteData] = useState([]);

  const handleSelectionChange = (selectedOptions) => {
    setSelections(selectedOptions);
  };

  // console.log("pollData", pollData);

  const vote = (voteData) => {};

  // const payload = {
  //   voteData,
  //   pollId: pollData.pollId,
  //   selectedAnswer: [
  //     {
  //       questionId: voteData[voteData.length - 1]?.question,
  //       optionId: [voteData[voteData.length - 1]?.selectedAns],
  //     },
  //   ],
  // };

  console.log(voteData);

  useEffect(() => {
    if (selections) {
      const payload = {
        pollData: selections,
        pollId: pollData.pollId,
        selectedAnswer: [
          {
            questionId: selections?.questionId,
            optionId: [selections?.selectedAns],
          },
        ],
      };
      setVoteData([...voteData, payload]);
    }
  }, [selections]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/firebase/live-poll/-NRbnJxY7AztnfQkQEtD", {
        headers: {
          Authorization: userToken,
        },
      })
      .then((response) => {
        setPollData(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userToken]);

  return (
    <Box className={styles.container}>
      <Text className={styles.heading}>VOTEK POLL</Text>

      <Box className={styles.pollContainer}>
        <Text className={styles.heading2}>{pollName}</Text>

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
            onClick={vote}
          >
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default PollPage;
