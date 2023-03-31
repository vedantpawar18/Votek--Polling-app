import {Box,  useToast } from "@chakra-ui/react";

import Check from "../components/EditComponent";

  const TemplateDetailPage = () => {


    const toast = useToast()
    let temp = JSON.parse(localStorage.getItem("template")) || []



    return (

<Box>
   {temp.map((item,i)=>(
    <Check item={item} />
   ))}
</Box>

    
 


    )
}



export default TemplateDetailPage