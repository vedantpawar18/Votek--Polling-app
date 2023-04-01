import { Box, Input, useRadio } from '@chakra-ui/react'
import React from 'react'

const OptionCard = (props) => {

    const { getInputProps, getCheckboxProps } = useRadio(props)
  
    const input = getInputProps()
    const checkbox = getCheckboxProps()
    
  return (
     <Box as='label'>
          <input {...input} />
          <Box
            {...checkbox}
            cursor='pointer'
            borderWidth='1px'
            borderRadius='md'
            boxShadow='md'
            _checked={{
              bg: 'red.300',
              color: 'white',
              borderColor: 'grey',
            }}
            _focus={{
              boxShadow: 'outline',
            }}
            px={5}
            py={3}
          >
            {props.children}
          </Box>
        </Box>
  )
}

export default OptionCard


