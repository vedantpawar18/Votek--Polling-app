import React, { useState } from "react";
import styles from "../styles/questioncard.module.css";
import { Box, Checkbox, CheckboxGroup, Text } from "@chakra-ui/react";

const QuestionCard = ({ question, options, index, maxSelections }) => {
  const [selected, setSelected] = useState([]);
  const [value, setVal] = useState();

  console.log(value, maxSelections);

  

  return (
    <Box className={styles.container}>
      <Text className={styles.question}>{`${index + 1}. ${question}`}</Text>
      <CheckboxGroup  onChange={setVal} value={value} className={styles.options}>
        {options?.length &&
          options.map((e, index) => {
            return (
              <Box key={index} className={styles.option}>
                <Checkbox className="option" value={e?.option}  colorScheme="green" >
                  {e?.option}
                </Checkbox>
              </Box>
            );
          })}
      </CheckboxGroup >
    </Box>
  );
};

export default QuestionCard;
