import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { endedPoll, getLiveData } from '../redux/data/action'
import { useSelector } from 'react-redux';
import {Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Active from "../components/Active";
import Navbar from "../components/Navbar";

function History() {
const dispatch = useDispatch()
let token = localStorage.getItem("adminToken");
const live = useSelector((store)=>store.data.liveData) 
const ended = useSelector((store)=>store.data.ended) 
// console.log("ended",ended)
    useEffect(()=>{
        dispatch(getLiveData(token))
        dispatch(endedPoll(token))
    },[dispatch,token])
    
// console.log("ended",ended)





  return (
    <>
    <Navbar/>
    <Box paddingLeft={'10%'} paddingRight={'10%'}>
     {live.length>0&&<><Active/></>}
<SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
 
{live.map((item)=>(
 <Card >
 <CardHeader>
  <Heading size='md'> {item.pollName} </Heading>
 </CardHeader>
 <CardBody>
  <Text>See the live poll details.</Text>
 </CardBody>
 <CardFooter>
   <Button color={'white'} bgColor={'teal.400'} ><Link to={`/history/${item.pollId}`}>
     Live details
    </Link></Button>
   
 </CardFooter>
</Card>
))}
 
</SimpleGrid>
    </Box>
   </>
  )
}

export default History