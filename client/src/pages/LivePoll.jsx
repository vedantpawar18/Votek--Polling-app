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
import Active from "../components/Active";
import UrlModal from "../components/UrlModal";
import Navbar from "../components/Navbar";

import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { BiSearchAlt } from "react-icons/bi";
function LivePoll() {
	const dispatch = useDispatch();
	const [searchTerm, setSearchTerm] = useState("");

	const [postsPerPage, setPostsPerPage] = useState(8);
	const [currentPage, setCurrentPage] = useState(0);
	const live = useSelector((store) => store.data.liveData);
	const pageNumbers = [];
	for (let i = 0; i < Math.ceil(live.length / postsPerPage); i++) {
		pageNumbers.push(i);
	}
	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	const getPageData = () => {
		const start = currentPage * 8;
		const end = start + 8;
		return live.slice(start, end);
	};
	const handleNext = () => {
		setCurrentPage(currentPage + 1);
	};
	const handlePrevious = () => {
		setCurrentPage(currentPage - 1);
	};

	let token = localStorage.getItem("adminToken");

	useEffect(() => {
		dispatch(getLiveData(token));
	}, [dispatch, token]);

	// console.log("live", live);











	return (
		<>
			<Navbar />
			<Box paddingLeft={"10%"} paddingRight={"10%"}>
				{live.length > 0 && (
					<>
						<Active />
					</>
				)}
				<Box w={{ base: "90%", md: "30%" }} ml={"33%"} mb={"4%"}>
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
				<SimpleGrid spacing={4} templateColumns="repeat(4,1fr)">
					{/* {live
						.filter((val) => {
							if (searchTerm === "") {
								return val;
							} else if (
								val.pollName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
							) {
								return val;
							}
						})
						.slice(pagination.start, pagination.end) */}
					{getPageData()
						.filter((val) => {
							if (searchTerm === "") {
								return val;
							} else if (
								val.pollName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
							) {
								return val;
							}
						})
						.map((item) => (
							<Card>
								<CardHeader>
									<Heading size="md"> {item.pollName} </Heading>
								</CardHeader>
								<CardBody>
									<Text>See the live poll details.</Text>
								</CardBody>
								<CardFooter>
									<Button color={"white"} bgColor={"teal.400"}>
										<Link to={`/live-polls/${item.pollId}`}>Poll details</Link>
									</Button>
									<UrlModal item={item.pollUrl} />
								</CardFooter>
							</Card>
						))}
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
					{pageNumbers.map((number) => (
						<Box
							display={"flex"}
							key={number}
							className={`page-item ${currentPage === number ? "active" : ""}`}
						>
							<Button onClick={() => paginate(number)}>{number + 1}</Button>
						</Box>
					))}

					<Button
						isDisabled={currentPage >= Math.ceil(live.length / 8) - 1}
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

export default LivePoll;