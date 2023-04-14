import { Box,Text, Flex, Tooltip } from '@chakra-ui/react';
import React from 'react';

export default function Inactive() {
  const inactiveColor = 'red';

 

  return (
    <Flex
    justifyContent="center"
    alignItems="center"
    flexDir="row"
    mt={3}
    overflow="hidden" >
   
      <Tooltip label={`Status: Inactive`} textTransform="capitalize">
        <Box
          as="div"
          h="24px"
          w="24px"
          position="relative"
          bgColor={inactiveColor}
          borderRadius="50%"
        />
      </Tooltip>
      <Text fontFamily={"Open Sans"} textTransform={'capitalize'} marginLeft={'10px'} fontSize={{base : "18px" , md: '22px'}} fontWeight={'600'}>Inactive Polls</Text>
    </Flex>
  );
}