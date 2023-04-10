import React, { useState,useEffect } from 'react'
import { Box,  Heading, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Graphs from "../components/Graphs";
import io from 'socket.io-client';
import { useParams } from "react-router-dom";
const LiveChart = () => {
	const [remainingTime, setRemainingTime] = useState(null);
	const {id} = useParams()
	const [pollData,setPollData]=useState([])
	useEffect(() => {
		const socket = io(`http://localhost:8080`);
		socket.emit('getPollData',`${id}`);
		socket.on('pollData', (pollData) => {
		  
			setPollData(pollData);
		});
			return () => socket.disconnect();
		  }, [id]);

        //  console.log("pollData",pollData[0].pollEndsAt)
		 
		  var endTime = 0
		  console.log("eennn",endTime)
		  useEffect(() => {
			const intervalId = setInterval(() => {
			  const currentTime = new Date().getTime();
			  // console.log("end",currentTime)
			  const diff = endTime - currentTime;
		
			  if (diff <= 0) {
				clearInterval(intervalId);
				setRemainingTime('Poll ended');

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
			{/* <Text>Remaining time:{remainingTime}</Text> */}
			<Box min-height={"fit-content"} padding={"6%"}>
				<Graphs pollData={pollData} />
			</Box>
			
		</>
	);
};
export default LiveChart;