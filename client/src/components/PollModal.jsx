import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

import { TfiMenuAlt } from "react-icons/tfi";
import { GiRoundStar } from "react-icons/gi";
import { RiArrowUpDownLine } from "react-icons/ri";


function PollModal({handleQuestionCreate}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button bg={"red.500"} color={'white'} onClick={onOpen}>Create Poll</Button>
       
             
              
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Poll type</ModalHeader>
            <ModalCloseButton />
            <ModalBody >
              <Flex gap="10px">
              <Button bg={'red.400'} color='white' value={"poll"} onClick={handleQuestionCreate} variant='ghost'>     Poll <RiArrowUpDownLine  color='#2E8BC0' /></Button>
              <Button bg={'red.400'} color='white' value={"mcq"} onClick={handleQuestionCreate}  variant='ghost'>    MCQ <TfiMenuAlt color='#0000FF' /> </Button>
              <Button bg={'red.400'} color='white' value={"rating"} onClick={handleQuestionCreate}  variant='ghost'>  Rating <GiRoundStar color="#D0D012" />  </Button>
              </Flex>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }


  export default PollModal