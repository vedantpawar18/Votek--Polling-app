import React from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import styles from "../styles/landingpage.module.css";
import Navbar from './../components/Navbar';
import { useNavigate } from "react-router-dom";

const LandingPage = () => {

  const navigate = useNavigate()
  return (
    <Box className={styles.container}>
      <Navbar />
      <Flex className={styles.cont1}>
        <Box>
          <Box className={styles.text}>
            <Text color={"#D71A20"}>Masai Poll</Text>
            <Text>Create Live Polls Using Votek</Text>
            
               <Button bg={'red.500'} onClick={()=>navigate('/create')}  className={styles.btn}>Create Now</Button>
          
           <Button bg={'red.500'} onClick={()=>navigate('/template-page')} className={styles.btn}>Template</Button>
               
          </Box>
        </Box>
        <Box className={styles.pollimg}></Box>
      </Flex>
      <Box className={styles.cont2}>
        <Box className={styles.featureBox}>
          <Flex>
            <Box className={styles.sign}></Box>
            <Text>Ability to create live polls and see live results. </Text>
          </Flex>
          <Flex>
            <Box className={styles.sign}></Box>
            <Text>Login functionality for admin & user.</Text>
          </Flex>
          <Flex>
            <Box className={styles.sign}></Box>
            <Text>Create polls using inbuilt templates. </Text>
          </Flex>
          <Flex>
            <Box className={styles.sign}></Box>
            <Text>Easy & understandable UI/UX.</Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
