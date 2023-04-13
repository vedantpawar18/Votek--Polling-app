import { Button, Code, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useClipboard, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"

function UrlModal(url) {

    const { onCopy, value, setValue, hasCopied } = useClipboard(url.item);
    const OverlayOne = () => (
      <ModalOverlay
        bg='blackAlpha.300'
        backdropFilter='blur(10px) hue-rotate(90deg)'
      />
    )
  
  
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)
  
    return (
      <>
        <Button
        marginLeft={'10px'}
        bg={"#38A169"}
        fontWeight={400}
        borderRadius={'none'}
        color={'white'}
          onClick={() => {
            setOverlay(<OverlayOne />)
            onOpen()
          }}
        >
         Poll url
        </Button>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          {overlay}
          <ModalContent>
            <ModalHeader>Poll url</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Code  value={value} onChange={(e) => {setValue(e.target.value)}}>{url.item}</Code>
            <Button bg={'teal.400'} color={'white'} marginLeft={'5px'} onClick={onCopy}>{hasCopied ? "Copied!" : "Copy"}</Button>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }


  export default UrlModal