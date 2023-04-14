import React, { useState } from "react";
import { Box, Flex, FormControl, Input, Button, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import styles from "../styles/participate.module.css";
import { useNavigate } from "react-router-dom";

const Participate = () => {
  const [inputData, setInputData] = useState("");
  const navigate = useNavigate();

  const redirects = () => {
    const url = inputData;
    if (url) {
      const id = url.substring(url.lastIndexOf("/") + 1);
      navigate(`/event/${id}`);
    }
  };
  return (
    <Box>
      <Navbar />
      <Flex justify="center" align="center" height="90vh">
        <Box className={styles.box}>
          <FormControl>
            <Text className={styles.heading}>Participate In <span style={{fontSize : '40px'}}>#V</span>otek</Text>
            <Input
              type="text"
              placeholder="Enter link to participate"
              size="lg"
              borderRadius="none"
              mb={4}
              variant="filled"
              focusBorderColor="#D71A20"
              fontSize={{base : '14px', md : '16px'}}
              fontFamily={'Poppins'}
              onChange={(e) => setInputData(e.target.value)}
            />
            <button className={styles.btn} onClick={redirects}>
              Submit
            </button>
          </FormControl>
        </Box>
      </Flex>
    </Box>
  );
};

export default Participate;
