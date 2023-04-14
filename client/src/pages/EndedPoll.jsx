import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { endedPoll } from "../redux/data/action";
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

	const [postsPerPage, setPostsPerPage] = useState(8);
	const [currentPage, setCurrentPage] = useState(0);
	const ended = useSelector((store) => store.data.ended).reverse() || [];
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

  useEffect(() => {
    dispatch(endedPoll(token));
  }, [dispatch, token]);

  return (
    <>
      <Navbar />
      <Box pl={10} pr={10} pb={10}>
        {ended.length > 0 && (
          <>
            <Inactive />
          </>
        )}
        <Flex justify={"center"} p={5}>
          <Box w={{ base: "90%", md: "30%" }}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<BiSearchAlt color="gray.300" />}
              />
              <Input
                type="text"
                focusBorderColor="#D71A20"
                placeholder="Search polls by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                bg="white"
                borderRadius={"none"}
                borderColor={"#FFC1C3"}
              />
            </InputGroup>
          </Box>
        </Flex>
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        >
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
              <Card borderRadius={"none"} border={"1px solid #C0C9CC"}>
                <CardHeader>
                  <Heading textTransform={'capitalize'} fontWeight={500} fontFamily={"Poppins"} size="md">
                    {" "}
                    {item.pollName}{" "}
                  </Heading>
                </CardHeader>
                <CardBody>
                  <Text fontWeight={400}>See the live poll details.</Text>
                </CardBody>
                <CardFooter alignContent={"center"} justify={"center"}>
                  <Button
                    color={"white"}
                    bgColor={"#D71A20"}
                    borderRadius={"none"}
                    fontWeight={400}
                  >
                    <Link to={`/ended-polls/${item.pollId}`}>Poll details</Link>
                  </Button>
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
              <Button
                fontWeight={400}
                bg={currentPage === number ? "#FFC1C3" : "#E7F2F8"}
                ml={1}
                mr={1}
                onClick={() => paginate(number)}
              >
                {number + 1}
              </Button>
            </Box>
          ))}

          <Button
            isDisabled={currentPage >= Math.ceil(ended.length / 12) - 1}
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
