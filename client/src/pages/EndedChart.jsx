import React, { useEffect } from 'react'
import { Box,  Heading } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Graphs from "../components/Graphs";


import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { endedPoll } from '../redux/data/action';
const EndedChart = () => {
    let token = localStorage.getItem("adminToken");
    const dispatch = useDispatch()
	const ended = useSelector((store)=>store.data.ended) 

    useEffect(()=>{
      
        dispatch(endedPoll(token))
    },[dispatch,token])
    


	return (
		<>
			<Navbar />
			<Heading>Ended poll</Heading>
			<Box min-height={"fit-content"} padding={"6%"}>
				<Graphs pollData={ended} />
			</Box>
			
		</>
	);
};
export default EndedChart;