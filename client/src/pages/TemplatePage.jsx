import {
	Box,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Flex,
	FormControl,
	Heading,
	Image,
	Input,
	InputGroup,
	InputLeftElement,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	SimpleGrid,
	Text,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import image_4 from "../images/image_4.png";
import image_3 from "../images/image_3.png";
import image_2 from "../images/image_2.png";
import image_1 from "../images/image_1.png";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useDispatch } from "react-redux";
import { getAllData, getTemplateByIdData, postPollData } from "../redux/data/action";
import { useSelector } from "react-redux";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import { BiSearchAlt } from "react-icons/bi";

function TemplatePage() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = useRef(null);
	const finalRef = useRef(null);


	const data = useSelector((store) => store.data.data) || [];

	const dispatch = useDispatch();
	const [dataArray, setDataArray] = useState([]);
	const dataById = useSelector((store)=>store.data.dataDetails)||[]
	const [searchTerm, setSearchTerm] = useState("");
    const [pollName, setPollName] = useState("")
	const [postsPerPage, setPostsPerPage] = useState(8);
	const [currentPage, setCurrentPage] = useState(0);

	const pageNumbers = [];
	for (let i = 0; i < Math.ceil(dataArray.length / postsPerPage); i++) {
		pageNumbers.push(i);
	}
	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	const getPageData = () => {
		const start = currentPage * 8;
		const end = start + 8;
		return dataArray.slice(start, end);
	};
	const handleNext = () => {
		setCurrentPage(currentPage + 1);
	};
	const handlePrevious = () => {
		setCurrentPage(currentPage - 1);
	};

	let token = localStorage.getItem("adminToken");
	const toast = useToast();

	

	useEffect(() => {
		// dispatch(getTemplateByIdData(token))
	
		dispatch(getAllData(token));
	
	}, [dataArray]);

	let dataA = [];
	useEffect(() => {
		if (data.length !== 0) {
			dataA = data?.userDetails?.templateCreated;
			setDataArray(dataA.reverse());
		
		}
	}, [data]);

	const handleDetails = (name) => {
		localStorage.setItem("templateName", name);
	};


	// useEffect(()=>{
	// 	dispatch(getTemplateByIdData(id,token))
	//   },[dispatch,id,token])

	const handleSubmit = (id) => {
		dispatch(getTemplateByIdData(id,token))
		
		toast({
			title: "Poll created.",
			description: "We've created your poll.",
			status: "success",
			duration: 9000,
			isClosable: true,
		});
	};


useEffect(()=>{
	if(dataById.length!==0){
		const data = {
			pollName:pollName,
			questions: dataById?.template?.questions,
			pollStatus:true,
			pollCreatedAt:Date.now(),
			pollEndsAt:Date.now() + 8 * 60 * 30 * 1000
	   };
	   dispatch(postPollData(data,token))
	}
},[dataById])


	return (
		<>
			<Navbar />
			<Box bg={"#F2F7FF"} h={"300vh"} border={"1px solid #F2F7FF"}>
				<Flex justifyContent={"space-between"} w={"100%"}>
					<Image
						marginRight={"5%"}
						w={"100px"}
						h={"100px"}
						marginTop={"1%"}
						alt="icon"
						src={image_4}
					/>
					<Image
						marginRight={"5%"}
						w={"100px"}
						h={"100px"}
						alt="icon"
						src={image_3}
					/>
					<Image
						marginRight={"5%"}
						w={"100px"}
						h={"100px"}
						alt="icon"
						src={image_2}
					/>
					<Image
						marginRight={"5%"}
						w={"100px"}
						h={"100px"}
						alt="icon"
						src={image_1}
					/>
				</Flex>
				<Flex justifyContent={"end"} marginRight={"4%"}></Flex>
				<Heading fontFamily={"Open Sans"} marginTop={"20px"}>
					Templates
				</Heading>
				<Box margin={"10%"} marginTop="60px" textAlign={"start"}>
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

					<SimpleGrid
						spacing={4}
						templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
					>
						{getPageData()
							.filter((val) => {
								if (searchTerm === "") {
									return val;
								} else if (
									val.templateName
										?.toLowerCase()
										?.includes(searchTerm?.toLowerCase())
								) {
									return val;
								}
							})

							.map((item) => (
								<Card>
									<CardHeader>
										<Heading size="md"> {item.templateName} </Heading>
									</CardHeader>
									<CardBody>
										<Text>Use templates to save time.</Text>
									</CardBody>
									<CardFooter>
										<Button
											color={"white"}
											bgColor={"red.400"}
											onClick={() => handleDetails(item.templateName)}
										>
											<Link to={`/template-page/${item.templateId}`}>
												Details
											</Link>
										</Button>
										{/* <Button color={'white'} bgColor={'red.500'} onClick={()=>handleSubmit(item)} marginLeft={"5px"}>Start poll</Button> */}
										<>
											<Button
												bg={"red.400"}
												color={"white"}
												marginLeft={"5px"}
												onClick={onOpen}
												
											>
												Start poll
											</Button>

											<Modal
												initialFocusRef={initialRef}
												finalFocusRef={finalRef}
												isOpen={isOpen}
												onClose={onClose}
											>
												<ModalOverlay bg="none" />
												<ModalContent>
													<ModalHeader>Enter Poll Name</ModalHeader>
													<ModalCloseButton />
													<ModalBody pb={6}>
														<FormControl>
															<Input
																ref={initialRef}
																placeholder="Poll name"
																onChange={(e)=>setPollName(e.target.value)}
															/>
														</FormControl>
													</ModalBody>

													<ModalFooter>
														<Button
															bg={"red.400"}
															color={"white"}
															onClick={()=>handleSubmit(item.templateId)}
															mr={3}
														>
															Start
														</Button>
														<Button onClick={onClose}>Cancel</Button>
													</ModalFooter>
												</ModalContent>
											</Modal>
										</>
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
								className={`page-item ${
									currentPage === number ? "active" : ""
								}`}
							>
								<Button bg={currentPage === number ? 'red.400' : 'grey.400'}  onClick={() => paginate(number)}>{number + 1}</Button>
							</Box>
						))}

						<Button
							isDisabled={currentPage >= Math.ceil(dataArray.length / 8) - 1}
							onClick={handleNext}
							color={"white"}
							bgColor={"#FFC1C3"}
						>
							<GrCaretNext />
						</Button>
					</Flex>
				</Box>
			</Box>
		</>
	);
}

export default TemplatePage;