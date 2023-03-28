import React, { useState } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import styles from "../styles/landingpage.module.css";
import PollTypesModel from "../components/PollTypesModel";
import Navbar from './../components/Navbar';

const LandingPage = () => {
  const [isLogged, setIsLogged] = useState(true);
  return (
    <Box className={styles.container}>
      <Navbar />
      <Flex className={styles.cont1}>
        <Box>
          <Box className={styles.text}>
            <Text color={"#D71A20"}>Masai Poll</Text>
            <Text>Create Live Poll's Using Votek</Text>
               {isLogged ? <PollTypesModel className={styles.btn} /> : <Button className={styles.btn}>Create Now</Button>}
          </Box>
        </Box>
        <Box className={styles.pollimg}></Box>
      </Flex>
      <Box className={styles.cont2}>
        <Box className={styles.featureBox}>
          <Flex>
            <Box className={styles.sign}></Box>
            <Text>Ability to create live poll’s and see live results. </Text>
          </Flex>
          <Flex>
            <Box className={styles.sign}></Box>
            <Text>Login functionality for admin & for user both.</Text>
          </Flex>
          <Flex>
            <Box className={styles.sign}></Box>
            <Text>Create poll’s using inbuilt templates. </Text>
          </Flex>
          <Flex>
            <Box className={styles.sign}></Box>
            <Text>Easy & understandable UI.</Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
