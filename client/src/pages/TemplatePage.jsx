import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Grid, GridItem, Heading, Image,Input,SimpleGrid,Stack, Text, Toast, useToast } from '@chakra-ui/react'
import React from 'react'

import image_4 from '../images/image_4.png';
import image_3 from '../images/image_3.png';
import image_2 from '../images/image_2.png';
import image_1 from '../images/image_1.png';

import { useNavigate } from 'react-router-dom';
import StarsRating from 'stars-rating';
import { Link } from 'react-router-dom';
import EditComponent from '../components/EditComponent';
import { useDispatch } from 'react-redux';
import { postPollData } from '../redux/data/action';

function TemplatePage(){
const navigate = useNavigate()
let temp = JSON.parse(localStorage.getItem("template")) || []
const dispatch = useDispatch()
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOm51bGwsImVtYWlsIjoidmVkYW50cGF3YXIxOEBnbWFpbC5jb20iLCJmdWxsTmFtZSI6IlZlZGFudCBQYXdhciIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjgwMTc3MjYwLCJleHAiOjE2ODAxODA4NjB9.RHwjDDdf36a7i6gV_jh7vCPyyfDF46-BKf9pE37ZB8g"
const toast = useToast()
const handleSubmit =(item)=>{
  const data = {
     pollName:item.pollName,
     questions: item.questions,
     pollStatus:true,
     pollCreatedAt:Date.now(),
     pollEndsAt:Date.now() + 2 * 60 * 30 * 1000 
};
dispatch(postPollData(data,token))

toast({
  title: 'Poll created.',
  description: "We've created your poll.",
  status: 'success',
  duration: 9000,
  isClosable: true,
})
}

  return (
    <Box  bg={'#F2F7FF'} h={'300vh'} border={'1px solid #F2F7FF'} >
      <Flex justifyContent={'space-between'} w={'100%'}  >
      <Image margin={"1%"} onClick={()=>navigate('/')} cursor={'pointer'} w={'110px'} h={'45px'} alt="icon" src={'https://user-images.githubusercontent.com/97525465/226943245-2d818b81-d5aa-4f1d-bc89-e82c3dbde51d.png'}/>
            <Image marginRight={'5%'} w={'100px'} h={'100px'} marginTop={'1%'} alt="icon" src={image_4}/>
            <Image marginRight={'5%'} w={'100px'} h={'100px'} alt="icon" src={image_3}/>
            <Image marginRight={'5%'} w={'100px'} h={'100px'} alt="icon" src={image_2}/>
            <Image marginRight={'5%'} w={'100px'} h={'100px'} alt="icon" src={image_1}/>
            </Flex>
            <Flex justifyContent={'end'} marginRight={'4%'} >
         
            </Flex>
        <Heading fontFamily={"Open Sans"} marginTop={"20px"}>Templates</Heading>
    <Box margin={"10%"} marginTop="60px" textAlign={"start"}>
 
   
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
{temp.map((item)=>(
 <Card >
 <CardHeader>
   <Heading size='md'> {item.templateName} </Heading>
 </CardHeader>
 <CardBody>
   <Text>Use templates to save time.</Text>
 </CardBody>
 <CardFooter>
   <Button color={'white'} bgColor={'red.400'}><Link to={`/template-details`}>
    {/* <EditComponent item={item}/> */}
    Details
    </Link></Button>
    <Button color={'white'} bgColor={'red.500'} onClick={()=>handleSubmit(item)} marginLeft={"5px"}>Use template</Button>
 </CardFooter>
</Card>
))}
 

</SimpleGrid>
  
 
 
    </Box>
    
    
       
       </Box>
  )
}

export default TemplatePage