import { Box,Text, Flex, Tooltip } from '@chakra-ui/react';
import React from 'react';

export default function Inactive() {
  const inactiveColor = 'red';

 

  return (
    <Flex
    justifyContent="center"
    alignItems="center"
    flexDir="row"
    h="100px"
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
      <Text fontFamily={"Open Sans"} marginLeft={'5px'} fontSize={'24px'} fontWeight={'800'}>Poll Ended</Text>
    </Flex>
  );
}