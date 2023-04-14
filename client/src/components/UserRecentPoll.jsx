import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  Checkbox,
  CheckboxGroup,
  Box,
} from "@chakra-ui/react";
import styles from "../styles/questioncard.module.css";

const UserRecentPoll = ({ pollData, pollId, pollName }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        fontSize={"12px"}
        fontWeight={400}
        bg={"#D71A20"}
        color={"white"}
        mt={5}
        onClick={onOpen}
      >
        View Details
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent fontFamily={"Poppins"} fontWeight={400}>
          <ModalHeader textTransform={"capitalize"}>
            <Text>{pollName}</Text>       
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Box h="60vh" overflow={"scroll"}>
              {pollData?.map((e, index) => {
                return (
                  <CheckboxGroup key={index} defaultValue={e?.selectedAns}>
                    <Box p={5} mb={5} border="1px solid grey">
                      <Text>{e?.question}</Text>
                      {e?.options.map((e, index) => {
                        return (
                          <Checkbox
                          key={index}
                            className={styles.option}
                            value={e?.optionId}
                            colorScheme="#D71A20"
                            fontFamily={"Open Sans"}
                            isDisabled
                            _checked={{
                              bg: "#FFC1C3",
                              color: "white",
                              borderColor: "white",
                            }}
                            _disabled={{
                              color: "black",
                              fontWeight: "400",
                            }}
                            width={"100%"}
                            p={"8px"}
                          >
                            {e?.option}
                          </Checkbox>
                        );
                      })}
                    </Box>
                  </CheckboxGroup>
                );
              })}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              fontWeight={300}
              bg="#D71A20"
              color={"white"}
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserRecentPoll;
