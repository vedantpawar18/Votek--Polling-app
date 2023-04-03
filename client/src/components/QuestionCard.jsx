import React, { useEffect, useState } from "react";
import styles from "../styles/questioncard.module.css";
import { Box, Flex, Checkbox, CheckboxGroup, Text } from "@chakra-ui/react";
import { RiErrorWarningLine } from "react-icons/ri";

const QuestionCard = ({ question, options, index, onSelectionChange, questionId }) => {
  const [value, setVal] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  let  arr=[];
  let maxSelections = 2;


  useEffect(() => {
    if (value?.length === maxSelections) {
      setIsDisabled(true);
    }
  }, [value]);

  useEffect(() => {
    if(isDisabled){
      let payload = {
        selectedAns : value,
        question,
        questionId,
        options
      }
      onSelectionChange(payload);
    }
  }, [value, isDisabled]);

  return (
    <Box className={styles.container}>
      <Text className={styles.question}>{`${index + 1}. ${question}`}</Text>
      <CheckboxGroup onChange={setVal} value={value} className={styles.options}>
        {options?.length &&
          options.map((e, index) => {
            return (
              <Box key={index} className={styles.option}>
                <Checkbox
                  disabled={isDisabled}
                  className="option"
                  value={e?.optionId}
                  colorScheme="green"
                >
                  {e?.option}
                </Checkbox>
              </Box>
            );
          })}
      </CheckboxGroup>
      <Flex
        fontFamily={"Poppins"}
        fontSize={"10px"}
        color={"grey"}
        mt={4}
        gap={2}
        alignItems={"center"}
      >
        <RiErrorWarningLine fontSize={"14px"} />
        <Text>{`max selection is ${maxSelections}`}</Text>
      </Flex>
    </Box>
  );
};

export default QuestionCard;
