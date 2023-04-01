import React, { useState } from 'react'
import styles from "../styles/questioncard.module.css"
import { Box, Flex, Radio, RadioGroup, Text } from '@chakra-ui/react'
import OptionCard from './OptionCard';

const QuestionCard = ({question, options, index, maxSelections}) => {

  const [selected, setSelected] = useState([]);
  const [value, setVal] = useState();

  console.log(value)

  return (
    <Box className = {styles.container}>
      <Text className={styles.question}>{`${index+1}. ${question}`}</Text>
      <RadioGroup onChange={setVal} value={value} className={styles.options}>
        {options?.length && options.map((e, index) => {
          // return <Box key={index} className={styles.option}><Radio colorScheme='green' value={e?.option}>{e?.option}</Radio></Box>
          return <OptionCard>{e.option}</OptionCard>
        })}
      </RadioGroup>
    </Box>
  )
}

export default QuestionCard