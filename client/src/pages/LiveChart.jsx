import React, { useState,useEffect } from 'react'
import { Box,  Button,  Heading, Text, useToast } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Graphs from "../components/Graphs";
import io from 'socket.io-client';
import { useNavigate, useParams } from "react-router-dom";
import { stopPoll } from '../redux/data/action';
import { useDispatch } from 'react-redux';
const LiveChart = () => {
	const [remainingTime, setRemainingTime] = useState(null);
	const {id} = useParams()
	const [pollData,setPollData]=useState([])
	const dispatch = useDispatch()
	let token = localStorage.getItem("adminToken");
    const navigate = useNavigate()
    const toast = useToast()
		  useEffect(() => {
		const socket = io(`https://votek-backend-production.up.railway.app`);

	
			socket.on('pollData', (newPollData) => {
			  setPollData(newPollData);
			});
		
			socket.on('pollDeleted', () => { 
	
			  toast({
                title: `This poll has been deleted!`,
                position: 'top',
				duration: 9000,
                isClosable: true,
              })
			
			});
		 
			socket.emit('getPollData',`${id}`);
		 
			return () => {
			  socket.off('pollData');
			  socket.off('pollDeleted');
			};
		  }, [id]);





		  const handleClick = ()=>{
			
		let data = {
			pollId:id
		}
		
			dispatch(stopPoll(data,token))
			toast({
                title: `This poll has been deleted!`,
                position: 'top',
				duration: 9000,
                isClosable: true,
              })
					navigate('/ended-polls')
		}
		





       
		 
		  var endTime = pollData[0]?.pollEndsAt
	
		  useEffect(() => {
			const intervalId = setInterval(() => {
			  const currentTime = new Date().getTime();
			 
			  const diff = endTime - currentTime;
		
			  if (diff <= 0) {
				clearInterval(intervalId);
				let data = {
					pollId:id
				}
				
					dispatch(stopPoll(data,token))
					toast({
						title: 'Poll already ended.',
						description: "Sorry this poll was ended.",
						status: 'warning',
						duration: 8000,
						isClosable: true
					  })
					navigate('/ended-polls')
			  } else {
				const minutes = Math.floor((diff / 1000 / 60) % 60);
				const seconds = Math.floor((diff / 1000) % 60);
				setRemainingTime(` ${minutes}Min :${seconds}Sec`);
			  }
			}, 1000);
		
			return () => clearInterval(intervalId);
		  }, [endTime]);
		  


	return (
		<>
			<Navbar />
			<Heading>Live Data</Heading>
			<Text>Poll will be ended with in: {remainingTime}</Text>
			<Box min-height={"fit-content"} padding={"6%"}>
				<Graphs pollData={pollData} />
			</Box>
			<Button bg={"red.400"} onClick={handleClick}>End Poll</Button>
		</>
	);
};
export default LiveChart;