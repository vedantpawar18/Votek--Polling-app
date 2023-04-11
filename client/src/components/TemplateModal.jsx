import {Button,Input,Modal,ModalOverlay,ModalContent,ModalHeader,
   ModalCloseButton, ModalBody, FormControl,
     ModalFooter, useDisclosure } from '@chakra-ui/react';
import { useRef, useState } from 'react';


export default function TemplateModal({handleSave}) {

    
    
    const [template, setTemplate] = useState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)
  
  
  
    return (
      <>
        <Button onClick={onOpen}>Save Template</Button>
  
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter Template Name</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                
                <Input ref={initialRef} placeholder='Template name' onChange={(e)=>setTemplate(e.target.value)} />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' onClick={handleSave} mr={3}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
