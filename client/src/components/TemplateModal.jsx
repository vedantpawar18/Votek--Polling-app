import {Button,Input,Modal,ModalOverlay,ModalContent,ModalHeader,
   ModalCloseButton, ModalBody, FormControl,
     ModalFooter, useDisclosure } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { addTemplateData } from '../redux/data/action';
import { useDispatch } from 'react-redux';
export default function TemplateModal({handleSave}) {
  // console.log("temp dATA",item)
    
    let token = localStorage.getItem("adminToken");
    const [template, setTemplate] = useState()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const dispatch = useDispatch()
    // const handleClick = ()=>{
    //   let data = {
    //     questions:item.item.questions,
    //     templateName:template
    //   }
    // console.log("data temp",data)
    // dispatch(addTemplateData(data, token))
    // }
  
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
