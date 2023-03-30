import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Box,
  Flex
} from "@chakra-ui/react";
import styles from "../styles/pollmodel.module.css";
import { TfiMenuAlt } from "react-icons/tfi";
import { GiRoundStar } from "react-icons/gi";
import { FaAward } from "react-icons/fa";
import { RiArrowUpDownLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const PollTypesModel = ({ className }) => {

  const navigate = useNavigate()

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        bg="#D71a20"
        fontWeight={500}
        className={className}
        onClick={onOpen}
      >
        Create Now
      </Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent className={styles.container}>
          <ModalHeader>
            <Text>Create your polls</Text>
            <Text fontWeight={400} color={"#6C6768"} fontSize={"12px"}>
              Engage your audience with live polls, surveys
            </Text>
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Box className={styles.choiceDiv}>

              <Flex className={styles.choice} onClick={()=>navigate('/create')}>
                <Box bg={"#EDF4FE"}>
                  <TfiMenuAlt color='#0000FF' />
                </Box>
                <Box>Multiple Choice</Box>
              </Flex>

              <Flex className={styles.choice} onClick={()=>navigate('/create')}>
                <Box bg={"#FFFBEB"}>
                  <GiRoundStar color="#D0D012" />
                </Box>
                <Box>Rating</Box>
              </Flex>

              <Flex className={styles.choice} onClick={()=>navigate('/create')}>
                <Box bg={"#EFF9F9"}>
                  <FaAward color='#4CD7D0' />
                </Box>
                <Box>Quiz</Box>
              </Flex>

              <Flex className={styles.choice} onClick={()=>navigate('/create')}>
                <Box bg={"#F6EFFD"}>
                  <RiArrowUpDownLine color='#2E8BC0' />
                </Box>
                <Box>Polls</Box>
              </Flex>
            </Box>
          </ModalBody>
      
        </ModalContent>
      </Modal>
    </>
  );
};

export default PollTypesModel;
