import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import Active from "../components/Active";
import Inactive from "../components/Inactive";
import BarChart from './BarChart'
import io from 'socket.io-client';
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllData, getLiveData, stopPoll } from "../redux/data/action";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PollHistory = () => {
  const [activePoll, setActivePoll] = useState(null);
  const [pollData, setPollData] = useState([]);
  const [poll, setPoll] = useState({});
  const [endTime, setEndTime] = useState();
  const [liveData, setLiveData] = useState([])
  const [remainingTime, setRemainingTime] = useState(null);
  let token = localStorage.getItem("adminToken");
  const [pollStatus, setPollStatus] = useState(true)
  const live = useSelector((store)=>store.data.liveData) 
  const allData = useSelector((store)=>store.data.data) 
  const toast = useToast();
  const [dataFromChild, setDataFromChild] = useState("");
  const dispatch = useDispatch()
  const {id} = useParams()

  const handleStopPoll = (poll) => {
  
    setActivePoll(true);
    toast({
      title: `Poll ${poll.question} has been stopped.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };




  useEffect(()=>{
    dispatch(getLiveData(token))
    dispatch(getAllData(token))
},[dispatch,token])



// console.log("data live",live)
// console.log("all data",allData)

// console.log("zz",id)

  useEffect(() => {
const socket = io(`http://localhost:8080`);
socket.emit('getPollData',`${id}`);
socket.on('pollData', (pollData) => {
  
    setPollData(pollData);
});
    return () => socket.disconnect();
  }, [id]);

  // console.log("live poll datazzzzzzzzzzzzz",pollData)

let data2 = [
    {
      pollId: "-NRr4CKLpheSrhyq-3zB",
      adminId: "6425786c1b27cedef7b31370",
      pollCreatedAt: "time1231",
      pollEndsAt: "time2",
      pollName: "votek",
      pollStatus: true,
      questions: [
        {
          questionId: "-NRr4CL2qh1FMfw032pO",
          question: "Third month in calender",
          maxSelections: "2",
          options: [
            {
              optionId: "-NRr4CL3TnNz9ZVAkq4s",
              option: "January",
              votes: 5,
            },
            {
              optionId: "-NRr4CL3TnNz9ZVAkq4t",
              option: "February",
              votes: 5,
            },
            {
              optionId: "-NRr4CL3TnNz9ZVAkq4u",
              option: "March",
              votes: 8,
            },
            {
              optionId: "-NRr4CL3TnNz9ZVAkq4v",
              option: "April",
              votes: 7,
            },
            {
               optionId: "-NRr4CL3TnNz9ZVAkq4v",
              option: "June",
              votes: 7,
            },
  
          ],
        },
        {
          questionId: "-NRr4CL3TnNz9ZVAkq4w",
          question: "123",
          maxSelections: "2",
          options: [
            {
              optionId: "-NRr4CL3TnNz9ZVAkq4x",
              option: "1a",
              votes: 8,
            },
            {
              optionId: "-NRr4CL3TnNz9ZVAkq4y",
              option: "2a",
              votes: 6,
            },
            {
              optionId: "-NRr4CL3TnNz9ZVAkq4z",
              option: "3a",
              votes: 5,
            },
            {
              optionId: "-NRr4CL3TnNz9ZVAkq5-",
              option: "4a",
              votes: 4,
            },
            {
              optionId: "-NRr4CL3TnNz9ZVAkq5-",
              option: "4a",
              votes: 4,
            },
            {
              optionId: "-NRr4CL3TnNz9ZVAkq5-",
              option: "4a",
              votes: 4,
            },
          ],
        },
        {
          questionId: "-NRr4CL3TnNz9ZVAkq4w",
          question: "robin",
          maxSelections: "2",
          options: [
            {
              optionId: "-NRr4CL3TnNz9ZVAkq4x",
              option: "1a",
              votes: 8,
            },
            {
              optionId: "-NRr4CL3TnNz9ZVAkq4y",
              option: "10a",
              votes: 6,
            },
            {
              optionId: "-NRr4CL3TnNz9ZVAkq4z",
              option: "6a",
              votes: 5,
            },
            {
              optionId: "-NRr4CL3TnNz9ZVAkq5-",
              option: "4a",
              votes: 4,
            },
          ],
        },
      ],
    },
  ];

const [data, setData] = useState(data2);

  const handlePollStatus = () => {

  //  dispatch(stopPoll("pollId",token))

  };


useEffect(() => {
  const intervalId = setInterval(() => {
    const currentTime = new Date().getTime();
  
    const diff = endTime - currentTime;

    if (diff <= 0) {
      clearInterval(intervalId);

      setRemainingTime('Poll ended');
      // dispatch(stopPoll("pollId",token))

        
    } else {
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setRemainingTime(`${minutes}:${seconds}`);
    }
  }, 1000);

  return () => clearInterval(intervalId);
}, [endTime]);


//   console.log("livvveeeee",live)

  return (
    <Box py="10" marginLeft={'10%'} marginRight={'10%'}>
         <Heading fontFamily={"Open Sans"} as="h1" mb="8">
        Poll History
      </Heading>


      {dataFromChild? <><Active/></>:<><Inactive/></>}
          <BarChart dataFromChild={dataFromChild} setDataFromChild={setDataFromChild}/>
     
     
          {dataFromChild && (
            <Button fontFamily={"Open Sans"} onClick={handlePollStatus} mt="4" colorScheme="red" >
              Stop Poll
            </Button>
          )}



        </Box>
  );
};

export default PollHistory;