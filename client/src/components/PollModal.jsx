import {
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { MdPoll } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { BiCheckShield } from "react-icons/bi";
import {IoIosAddCircleOutline} from "react-icons/io"


function PollModal({ handleQuestionCreate }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        bg={"#38A169"}
        fontWeight={400}
        color={"white"}
        borderRadius={"none"}
        onClick={onOpen}
        leftIcon={<Icon boxSize={6} color={"#FFFFFF"} as={IoIosAddCircleOutline} />}
      >
        Add question
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Poll type</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={"10px"}>
              <Button
                leftIcon={<Icon boxSize={6} color={"#A000FF"} as={MdPoll} />}
                value={"poll"}
                onClick={(e) => {
                  handleQuestionCreate(e);
                  onClose();
                }}
                variant="ghost"
                border={"1px solid rgb(206, 203, 203)"}
              >
                {" "}
                Poll{" "}
              </Button>
              <Button
                leftIcon={
                  <Icon boxSize={6} color="#26D948" as={BiCheckShield} />
                }
                value={"mcq"}
                onClick={(e) => {
                  handleQuestionCreate(e);
                  onClose();
                }}
                variant="ghost"
                border={"1px solid rgb(206, 203, 203)"}
              >
                {" "}
                MCQ{" "}
              </Button>
              <Button
                value={"rating"}
                onClick={(e) => {
                  handleQuestionCreate(e);
                  onClose();
                }}
                variant="ghost"
                border={"1px solid rgb(206, 203, 203)"}
                leftIcon={<Icon boxSize={6} color="#D7FA5C" as={FaStar} />}
              >
                {" "}
                Rating{" "}
              </Button>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button borderRadius={'none'} mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default PollModal;
