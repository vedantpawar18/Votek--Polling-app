import React, { useEffect } from 'react'
import { Box,  Heading } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Graphs from "../components/Graphs";


import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { endedPoll } from '../redux/data/action';
import { useParams } from 'react-router-dom';
const EndedChart = () => {
    let token = localStorage.getItem("adminToken");
    const dispatch = useDispatch()
	const ended = useSelector((store)=>store.data.ended) 
	const {id} = useParams()
    useEffect(()=>{
      
        dispatch(endedPoll(token))
    },[dispatch,token])
    


	const endedData = ended.filter((item)=>{
		return item.pollId === id
	})
	
	

	return (
		<>
			<Navbar />
			<Heading>Ended poll</Heading>
			<Box min-height={"fit-content"} padding={"6%"}>
				<Graphs pollData={endedData} />
			</Box>
			
		</>
	);
};
export default EndedChart;