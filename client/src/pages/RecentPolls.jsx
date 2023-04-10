import React, { useEffect, useState } from "react";
import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import UserRecentPoll from "../components/UserRecentPoll";

const RecentPolls = () => {
  const [data, setData] = useState([]);
  const userToken = localStorage.getItem("userToken") || "";


  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/user-details`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        setData(response?.data.userDetails?.pollsAttended);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userToken]);

  return (
    <>
      <Flex
        p={2}
        w={"100%"}
        justifyContent={{ base: "center", md: "flex-start" }}
      >
        <Image
          maxW={{ base: "20%", md: "10%" }}
          src={
            "https://user-images.githubusercontent.com/97525465/226943245-2d818b81-d5aa-4f1d-bc89-e82c3dbde51d.png"
          }
          alt="logo"
        />
      </Flex>
      <Text
        fontSize={{ base: "16px", md: "20px" }}
        fontFamily={"Poppins"}
        ml={'10px'}
        pb={2}
      >
        Polls you've visited recently
      </Text>
      <Grid
        p={{ base: 2, md: 10 }}
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(5, 1fr)" }}
        gap={6}
      >
        {data?.map((poll) => (
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
                <Box>
                  <UserRecentPoll {...poll} />
                </Box>
              </Box>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

export default RecentPolls;
