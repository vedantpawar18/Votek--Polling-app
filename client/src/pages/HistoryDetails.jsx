import { Box } from "@chakra-ui/react";
import EditComponent from "../components/EditComponent";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { endedPoll, getTemplateByIdData } from "../redux/data/action";
import Navbar from "../components/Navbar";
import io from 'socket.io-client';
const HistoryDetails = () => {
    let token = localStorage.getItem("adminToken");
  const [pollData,setPollData]=useState([])
  const dispatch = useDispatch()
  const {id} = useParams()





  useEffect(() => {
    const socket = io(`http://localhost:8080`);
    socket.emit('getPollData',`${id}`);
    socket.on('pollData', (pollData) => {
 
        setPollData(pollData);
    });

        return () => socket.disconnect();

      }, []);
     
console.log("live data",pollData)

 
 

const ended = useSelector((store)=>store.data.ended) 

    useEffect(()=>{
       
        dispatch(endedPoll(token))
    },[dispatch,token])

console.log("ended",ended)
  return (

    <Box>
      <Navbar/>
     
   
    
    </Box>





  )
}



export default HistoryDetails