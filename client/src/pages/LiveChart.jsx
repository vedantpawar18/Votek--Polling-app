import React from "react";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Graphs from "../components/Graphs";

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
