import React, { useEffect, useState } from "react";
import styles from "../styles/questioncard.module.css";
import { Box, Flex, Checkbox, CheckboxGroup, Text } from "@chakra-ui/react";
import { RiErrorWarningLine } from "react-icons/ri";
import StarsRating from "stars-rating";

const QuestionCard = ({
  question,
  options,
  index,
  onSelectionChange,
  questionId,
  maxSelections,
  type,
}) => {
  const [value, setVal] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  //  useEffect function for toggling the disable variable when maxSelection has reached.

  useEffect(() => {
    if (value?.length === Number(maxSelections)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [value]);

  /* useEffect function for calling the parent function (onSelectionChange) 
  when maxSelect has reached or remaining option were disabled. */

  useEffect(() => {
    if (isDisabled) {
      let payload = {
        selectedAns: value,
        question,
        questionId,
        options,
      };
      onSelectionChange(payload);
    }
  }, [isDisabled]);


  console.log(value)

  return (
    <Box className={styles.container}>
      <Text className={styles.question}>{`${index + 1}. ${question}`}</Text>
      <CheckboxGroup onChange={setVal} value={value} className={styles.options}>
        {type === "rating" ? (
          <Box>
            <StarsRating
              count={options?.length}
              onChange={(e) =>{
                 console.log([options[e-1].optionId])
              }} 
              value={options.option}
              half={false}
              size={30}
              color2={"#D71A20"}
              color1={"#FFC1C3"}
            />
          </Box>
        ) : (
          options.map((e, index) => {
            return (
              <Box key={index} className={styles.option}>
                {
                  <Checkbox
                    disabled={
                      value.length == maxSelections &&
                      !value.includes(e.optionId)
                    }
                    className="option"
                    value={e?.optionId}
                    colorScheme="#D71A20"
                    _checked={{
                      // apply color when checkbox is checked
                      bg: "#D71A20",
                      color: "white",
                      borderColor: "white",
                    }}
                    _hover={{
                      // apply color on hover
                      bg: "#FFC1C3",
                      borderColor: "white",
                    }}
                    width={"100%"}
                    p={"8px"}
                  >
                    {e?.option}
                  </Checkbox>
                }
              </Box>
            );
          })
        )}
      </CheckboxGroup>
      {type !== "rating" ? (
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
      ) : null}
    </Box>
  );
};

export default QuestionCard;          
