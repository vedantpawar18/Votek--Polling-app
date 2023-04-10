import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { endedPoll, getLiveData } from "../redux/data/action";
import { useSelector } from "react-redux";
import {
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	Heading,
	Input,
	InputGroup,
	InputLeftElement,
	SimpleGrid,
	Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Inactive from "../components/Inactive";

import { BiSearchAlt } from "react-icons/bi";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";

function EndedPoll() {
	const dispatch = useDispatch();
	const [searchTerm, setSearchTerm] = useState("");
	//pagination
	const [postsPerPage, setPostsPerPage] = useState(8);
	const [currentPage, setCurrentPage] = useState(0);
	const ended = useSelector((store) => store.data.ended) || [];
	const pageNumbers = [];
	for (let i = 0; i < Math.ceil(ended.length / postsPerPage); i++) {
		pageNumbers.push(i);
	}
	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	const getPageData = () => {
		const start = currentPage * 8;
		const end = start + 8;
		return ended.slice(start, end);
	};
	const handleNext = () => {
		setCurrentPage(currentPage + 1);
	};
	const handlePrevious = () => {
		setCurrentPage(currentPage - 1);
	};

	let token = localStorage.getItem("adminToken");

	// console.log("ended",ended)
	useEffect(() => {
		dispatch(endedPoll(token));
	}, [dispatch, token]);

	console.log("ended", ended);

	return (
		<>
			<Navbar />
			<Box paddingLeft={"10%"} paddingRight={"10%"} justifyContent={"center"}>
				{ended.length > 0 && (
					<>
						<Inactive />
					</>
				)}
				<Box w={{ base: "90%", md: "30%" }}>
					<InputGroup>
						<InputLeftElement
							pointerEvents="none"
							children={<BiSearchAlt color="gray.300" />}
						/>
						<Input
							type="text"
							placeholder="Search polls by name"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							bg="white"
							borderRadius={"none"}
							borderColor={"#FFC1C3"}
							_focus={{
								outline: "none",
								boxShadow: "none",
							}}
						/>
					</InputGroup>
				</Box>
				<SimpleGrid
					spacing={4}
					templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
				>
					{getPageData()

						.filter((val) => {

							if (searchTerm === "") 
							{
								return val;
							}
							 else if 
							 (
								val.pollName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
							) 
							{
								return val;
							}
						})
						.map((item) =>
						 (
							<Card>
								<CardHeader>
									<Heading size="md"> {item.pollName} </Heading>
								</CardHeader>
								<CardBody>
									<Text>See the live poll details.</Text>
								</CardBody>
								<CardFooter>
									<Button color={"white"} bgColor={"red.400"}>
										<Link to={`/ended-polls/${item.pollId}`}>Poll details</Link>
									</Button>
								</CardFooter>
							</Card>
						)
						)
						}
				</SimpleGrid>

				<Flex justifyContent={"center"} mt={"3%"}>
					<Button
						isDisabled={currentPage === 0}
						onClick={handlePrevious}
						color={"white"}
						bgColor={"#FFC1C3"}
					>
						<GrCaretPrevious />
					</Button>
					{pageNumbers.map((number) => 
					(
						<Box
							display={"flex"}
							key={number}
							className={`page-item ${currentPage === number ? "active" : ""}`}
						>
							<Button onClick={() => paginate(number)}>{number + 1}</Button>
						</Box>
					))}

					<Button
						isDisabled={currentPage >= Math.ceil(ended.length / 8) - 1}
						onClick={handleNext}
						color={"white"}
						bgColor={"#FFC1C3"}
					>
						<GrCaretNext />
					</Button>
				</Flex>
			</Box>
		</>
	);
}

export default EndedPoll;
