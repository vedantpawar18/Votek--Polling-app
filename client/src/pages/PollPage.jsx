import React, { useEffect, useState } from 'react'
import styles from "../styles/pollpage.module.css";
import {Box, Text} from "@chakra-ui/react"
import axios from 'axios';
import QuestionCard from '../components/QuestionCard';
// import {useDispatch, useSelector} from "react-redux"
// import { getCurrentPoll } from '../redux/data/action';

const PollPage = () => {

  const [pollData, setPollData] = useState('');
  // const dispatch = useDispatch();
  // const curr = useSelector(state => state.pollData)

  const {pollName, questions} = pollData;
 
  console.log(pollData)
 


  useEffect(() => {
     axios.get("http://localhost:8080/firebase/live-polls").then((response) => {
      setPollData(response.data[0])
     }).catch((err) => {
      console.log(err)
     })
  },[])


  return (
    <Box className={styles.container}>
      <Text mt={'20px'} className={styles.heading}>VOTEK POLL</Text>

      <Box className={styles.pollContainer}>
        <Text className={styles.heading2} >{pollName}</Text>

        <Box className={styles.questionCont}>
         {questions?.length && questions.map((e) => {
            return <QuestionCard {...e} />
         })}
        </Box>
      </Box>
    </Box >
  )
}

export default PollPage