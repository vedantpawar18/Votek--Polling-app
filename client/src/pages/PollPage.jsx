import React, { useEffect, useState } from 'react'
import styles from "../styles/pollpage.module.css";
import {Box, Button, Flex, Text} from "@chakra-ui/react"
import axios from 'axios';
import QuestionCard from '../components/QuestionCard';
// import {useDispatch, useSelector} from "react-redux"
// import { getCurrentPoll } from '../redux/data/action';

const PollPage = () => {

  const [pollData, setPollData] = useState('');
  // const dispatch = useDispatch();
  // const curr = useSelector(state => state.pollData)

  const {pollName, questions} = pollData;
  const userToken = localStorage.getItem('userToken')
 
  console.log('pollData', pollData)
 


  useEffect(() => {
     axios.get("http://localhost:8080/firebase/live-poll/-NRbnJxY7AztnfQkQEtD", {
      headers: {
        'Authorization': userToken
      }
     }).then((response) => {
      setPollData(response.data[0])
     }).catch((err) => {
      console.log(err)
     })
  },[userToken])


  return (
    <Box className={styles.container}>
      <Text className={styles.heading}>VOTEK POLL</Text>

<Box className={styles.pollContainer}>
  <Text className={styles.heading2} >{pollName}</Text>

  <Box className={styles.questionCont}>
   {questions?.length && questions.map((e, index) => {
      return <QuestionCard key={index} {...e} index={index} />
   })}
  </Box>
  <Flex mt={'20px'} justifyContent={'flex-end'}>
  <Button bg={'#D71A20'} color={'white'} fontWeight={400}>Submit</Button>
</Flex>
</Box>
      </Box>
  )
}

export default PollPage