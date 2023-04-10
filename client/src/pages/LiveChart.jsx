import React, { useState,useEffect } from 'react'
import { Box,  Heading } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Graphs from "../components/Graphs";
import io from 'socket.io-client';
import { useParams } from "react-router-dom";
const LiveChart = () => {

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