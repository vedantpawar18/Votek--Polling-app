import { Box, Button, Heading, HStack, Input, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { DeleteIcon } from '@chakra-ui/icons'
function Poll() {
    const [inputCount, setInputCount] = useState(1)
    const [count, setCount] = useState([1,2])
    const [option, setOption] = useState([])
    const [optionText,setOptionText] = useState("")

// const handleSubmit = (e)=>{

//   let newOption = [...option];
//   if(option.includes(optionText)){
//     newOption.splice(newOption.indexOf(optionText),1)
//   }else{
//     newOption.push(optionText);
//   }
//   setOption(newOption)


//   console.log("option",option)
// }


const handleAdd = ()=>{
   setInputCount(count[count.length-1]+1)
   setCount([...count,inputCount])
   
}

const handleDelete = (e)=>{
    let dlt = count[count.length-1]
    let newCount = [...count]

    if(count.length>2){
      newCount.splice(newCount.indexOf(dlt),1)
       
    }
   setCount(newCount)
}


  return (
    <Box bgColor={"hsl(264,33%,97%)"} >
        <Heading marginTop={"20px"}>Create Poll</Heading>
    <Box margin={"10%"} marginTop="60px" textAlign={"start"}>
 
   <Text  align={"start"} marginBottom={"20px"} color={"#a0aec0"} fontSize={"1.125rem"} fontWeight={"500"}>Complete below fields to create a poll</Text>
   <Box paddingBottom={"30px"}>
    <Text color='#718096' fontSize={"1rem"} fontWeight={"500"}>Poll Question</Text>
   <Input h={"100px"} bgColor={"white"} fontSize="1.25rem" placeholder='Enter the poll question' _placeholder={{  color: 'gray.500' }}/>
   </Box>
   

{count.map((item,i)=>(
  
    <HStack id={i} paddingTop={"10px"}>
    <Input placeholder={`Option ${i+1}`} bgColor={"white"} onChange={(e)=>setOptionText(e.target.value)} />
    {count.length>2?<Button onClick={()=>handleDelete(item)}><DeleteIcon color={"red"}/></Button>:<></>}
    </HStack>
))}
 
        <Box align={"left"} paddingTop={"15px"}>
    <Button  onClick={handleAdd} bgColor={"hsl(236,78%,13%)"} color="white">Add another option +</Button>
    </Box>
    
    <Box align={"right"}   width={"100%"}  marginTop={"6%"}>
    <Button  onClick={"handleSubmit"} colorScheme={"blue"}>Submit</Button>
    </Box>
    </Box>
    
    
       
       </Box>
  )
}

export default Poll