import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

import { TfiMenuAlt } from "react-icons/tfi";
import { GiRoundStar } from "react-icons/gi";
import { RiArrowUpDownLine } from "react-icons/ri";


function PollModal({handleQuestionCreate}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button bg={"red.500"} color={'white'} onClick={onOpen}>Add question</Button>
       
             
              
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Poll type</ModalHeader>
            <ModalCloseButton />
            <ModalBody >
              <Flex gap={'10px'}>
              <Button bg={'red.400'} color='white' value={"poll"} onClick={handleQuestionCreate} variant='ghost'>     Poll </Button>
              <Button bg={'red.400'} color='white' value={"mcq"} onClick={handleQuestionCreate}  variant='ghost'>    MCQ  </Button>
              <Button bg={'red.400'} color='white' value={"rating"} onClick={handleQuestionCreate}  variant='ghost'>  Rating   </Button>
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