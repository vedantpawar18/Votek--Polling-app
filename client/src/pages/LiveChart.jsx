import React, { useState,useEffect } from 'react'
import { Box,  Heading } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Graphs from "../components/Graphs";
import io from 'socket.io-client';
import { useParams } from "react-router-dom";
const LiveChart = () => {
	// const {id} = useParams()
	// const [pollData,setPollData]=useState([])
	// useEffect(() => {
	// 	const socket = io(`http://localhost:8080`);
	// 	socket.emit('getPollData',`${id}`);
	// 	socket.on('pollData', (pollData) => {
		  
	// 		setPollData(pollData);
	// 	});
	// 		return () => socket.disconnect();
	// 	  }, [id]);

	return (
		<>
			<Navbar />
			<Heading>Live Data</Heading>
			<Box min-height={"fit-content"} padding={"6%"}>
				<Graphs />
			</Box>
			
		</>
	);
};
export default LiveChart;