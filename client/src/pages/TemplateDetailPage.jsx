import { Box } from "@chakra-ui/react";
import EditComponent from "../components/EditComponent";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getTemplateByIdData } from "../redux/data/action";
import Navbar from "../components/Navbar";

const TemplateDetailPage = () => {


  const dispatch = useDispatch()
  const {id} = useParams()
  const dataById = useSelector((store)=>store.data.dataDetails)||[]
  const [dataArray, setDataArray] = useState([])
  let token = localStorage.getItem("adminToken");



  useEffect(()=>{
    dispatch(getTemplateByIdData(id,token))
  },[dispatch,id,token])


  let dataA = []
  useEffect(()=>{
    if(dataById.length!==0 ){
      dataA = dataById.template.questions

      setDataArray(dataA)
  
  }
  },[dataById])


 

  return (

    <Box>
      <Navbar/>
     {dataArray.map((item)=>(
  <EditComponent item={item} />
     ))}
      
   
    
    </Box>





  )
}



export default TemplateDetailPage