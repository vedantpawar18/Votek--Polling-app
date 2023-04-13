import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Spinner
} from "@chakra-ui/react";
import axios from "axios";
import UserRecentPoll from "../components/UserRecentPoll";
import { BiSearchAlt } from "react-icons/bi";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const RecentPolls = () => {
  const [userData, setUserData] = useState([]);
  const [recentData, setRecent] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const userToken = localStorage.getItem("userToken") || "";
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [loader, setLoader] = useState(false);

  const pagination = (payload, current, total) => {
    setRecent(payload);
    setCurrentPage(current);
    setTotalPage(total);
  };

  // function for searching the poll by name

  const filteredPolls = recentData.filter((poll) =>
    poll.pollName?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  //  useRffect for fetching the recently visited polls by the user

  useEffect(() => {
    setLoader(true);
    axios
      .get(
        `https://votek-backend-production.up.railway.app/user/user-details`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((response) => {
        setUserData(response?.data.userDetails?.pollsAttended.reverse());
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  }, [userToken]);

  return (
    <Box w="100%">
      <Flex
        p={2}
        w={"100%"}
        justifyContent={{ base: "center", md: "flex-start" }}
        onClick={() => navigate("/dashboard")}
        cursor={"pointer"}
      >
        <Image
          maxW={{ base: "20%", md: "7%" }}
          src={
            "https://user-images.githubusercontent.com/97525465/226943245-2d818b81-d5aa-4f1d-bc89-e82c3dbde51d.png"
          }
          alt="logo"
        />
      </Flex>
      <Box display="flex" alignItems="center" justifyContent={"center"}>
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
      </Box>
      <Flex p={5} m={4} align={"center"} justify={"space-between"}>
        <Text fontFamily={"Poppins"} fontSize={{ base: "16px", md: "20px" }}>
          Recent Polls
        </Text>
        <Text fontFamily={"Poppins"} fontSize={{ base: "8px", md: "12px" }}>
          {`Total Page ${currentPage}/${totalPage}`}
        </Text>
      </Flex>
      {loader ? (
        <Flex w="100%" h="45vh" align={"center"} justify={"center"}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="#FFC1C3"
            color="#D71A20"
            size="xl"
          />
        </Flex>
      ) : (
        <Grid
          pl={{ base: 10, md: 10 }}
          pr={{ base: 10, md: 10 }}
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(5, 1fr)" }}
          gap={6}
        >
          {filteredPolls.length == 0 ? (
            <Box>NO DATA FOUND...</Box>
          ) : (
            filteredPolls.map((poll) => (
              <GridItem
                w="100%"
                key={poll.pollId}
                boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
              >
                <Flex
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  padding={{ base: 2, md: "20px" }}
                  h="150px"
                  fontFamily={"Poppins"}
                >
                  <Box>
                    <Text
                      textTransform={"capitalize"}
                      fontSize={{ base: "14px", md: "16px" }}
                    >
                      {poll.pollName}
                    </Text>
                    {filteredPolls?.length > 0 ? (
                      <Box>
                        <UserRecentPoll {...poll} />
                      </Box>
                    ) : null}
                  </Box>
                </Flex>
              </GridItem>
            ))
          )}
        </Grid>
      )}
      <Box display={"flex"} justifyContent={"center"} p={8}>
        <Pagination data={userData} pagination={pagination} />
      </Box>
    </Box>
  );
};

export default RecentPolls;
