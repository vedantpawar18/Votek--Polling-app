import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading,
   Image,SimpleGrid, Text,  useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

import image_4 from '../images/image_4.png';
import image_3 from '../images/image_3.png';
import image_2 from '../images/image_2.png';
import image_1 from '../images/image_1.png';

import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
import { useDispatch } from 'react-redux';
import { getAllData, postPollData } from '../redux/data/action';
import { useSelector } from 'react-redux';

function TemplatePage(){
const navigate = useNavigate()
let temp = JSON.parse(localStorage.getItem("template")) || []
const data = useSelector((store)=>store.data.data)||[]
// console.log("dataaa check",data.userDetails[0].templateCreated)
const dispatch = useDispatch()
const [dataArray, setDataArray] = useState([])
let token = localStorage.getItem("adminToken");
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

// console.log("data",data)

useEffect(()=>{
  // dispatch(getTemplateByIdData(token))
  dispatch(getAllData(token))
},[dispatch])

let dataA = []
useEffect(()=>{

  if(data.length!==0 ){
    dataA = data?.userDetails[0]?.templateCreated
    setDataArray(dataA)
    // console.log("dataA",dataA)
}
},[data])



const handleDetails = (name)=>{
  localStorage.setItem("templateName",name);
}


  return (
    <>
    <Navbar/>
    <Box  bg={'#F2F7FF'} h={'300vh'} border={'1px solid #F2F7FF'} >
      <Flex justifyContent={'space-between'} w={'100%'}  >
     
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
{dataArray.map((item)=>(
 <Card >
 <CardHeader>
   <Heading size='md'> {item.templateName} </Heading>
 </CardHeader>
 <CardBody>
   <Text>Use templates to save time.</Text>
 </CardBody>
 <CardFooter>
   <Button color={'white'} bgColor={'red.400'} onClick={()=>handleDetails(item.templateName)}><Link to={`/template-page/${item.templateId}`}>

    Details
    </Link></Button>
    <Button color={'white'} bgColor={'red.500'} onClick={()=>handleSubmit(item)} marginLeft={"5px"}>Start poll</Button>
 </CardFooter>
</Card>
))}
 
</SimpleGrid>
  
 
 
    </Box>
    
    
       
       </Box>
       </>
  )
}

export default TemplatePage