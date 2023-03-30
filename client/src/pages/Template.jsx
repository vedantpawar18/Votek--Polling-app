import { Box, Button, Flex, Grid, GridItem, Heading, Image,Input,Stack, Text } from '@chakra-ui/react'
import React from 'react'

import image_4 from '../images/image_4.png';
import image_3 from '../images/image_3.png';
import image_2 from '../images/image_2.png';
import image_1 from '../images/image_1.png';

import { useNavigate } from 'react-router-dom';
import StarsRating from 'stars-rating';

function Template(){
const navigate = useNavigate()
let temp = JSON.parse(localStorage.getItem("template")) || []

  return (
    <Box  bg={'#F2F7FF'} border={'1px solid #F2F7FF'} >
      <Flex justifyContent={'space-between'} w={'100%'}  >
      <Image margin={"1%"} onClick={()=>navigate('/')} cursor={'pointer'} w={'110px'} h={'45px'} alt="icon" src={'https://user-images.githubusercontent.com/97525465/226943245-2d818b81-d5aa-4f1d-bc89-e82c3dbde51d.png'}/>
            <Image marginRight={'5%'} w={'100px'} h={'100px'} marginTop={'1%'} alt="icon" src={image_4}/>
            <Image marginRight={'5%'}w={'100px'} h={'100px'} alt="icon" src={image_3}/>
            <Image marginRight={'5%'}w={'100px'} h={'100px'} alt="icon" src={image_2}/>
            <Image marginRight={'5%'}w={'100px'} h={'100px'} alt="icon" src={image_1}/>
            </Flex>
            <Flex justifyContent={'end'} marginRight={'4%'} >
          <Stack>
         
  
          </Stack>
            </Flex>
        <Heading fontFamily={"Open Sans"} marginTop={"20px"}>Templates</Heading>
    <Box margin={"10%"} marginTop="60px" textAlign={"start"}>
 
   

    <Grid gridTemplateColumns={'repeat(1,1fr)'}  gap="10px">
   {temp.map((item,i)=>(
    <>
       <GridItem><Button color={'white'} bgColor={'teal.400'}>Use {item.templateName} template</Button></GridItem> 
     {item.questions.map((question, questionIndex)=>(
      <Box  key={questionIndex}>
       
      <Flex>
    <Input  marginTop={'10px'} value={question.question} placeholder='Create question' bg={"white"}
     
      // onChange={(event) => handleTitleChange(event, questionIndex)}
    />
     
    </Flex>
    <Stack>
  
   {/* {question.type==="rating"? <Button marginTop={"10px"} bg={"red.400"} w={'200px'} color={'white'}
    // onClick={() => handleRatingOptionCreate(questionIndex)}
    >
      Add Rating
    </Button>:<Button marginTop={"10px"} bg={"red.400"} w={'200px'} color={'white'}
    //  onClick={() => handleOptionCreate(questionIndex)}
     
     >
      Add Option
    </Button>} */}
  {question.type==="mcq"&& <Input value={question.maxSelections} marginTop={"10px"} type="number" w={'150px'} bg="white"
   placeholder='max option'
    // onChange={(event)=>handleSelectionChange(event, questionIndex)}
    />
  }
  </Stack>
    {question.options.map((option, optionIndex) => (
      
      <Box key={optionIndex}>
        {question.type==="mcq"&&
        <>
        
        <Input placeholder={`option ${optionIndex+1}`}  marginTop={"10px"} bg={"white"}
          value={option}
          // onChange={(event) =>
          //   handleOptionTitleChange(event, questionIndex, optionIndex)
          // }
          
        />
      
        </>
        
        }
         {question.type==="poll"&&<Input 
         placeholder={`option ${optionIndex+1}`} bg={"white"}
         marginTop={"10px"}
          value={option}
          // onChange={(event) =>
          //   handleOptionTitleChange(event, questionIndex, optionIndex)
          // }
        />}

         {question.type==="rating"&&
         
         <>

<StarsRating
count={10}
value={option}
// onChange={(event)=>handleOptionRatingChange(event, questionIndex, optionIndex)}
size={44}
color2={'#ffd700'} />  

       </> 
        }
       
      </Box>
  
    ))}
  </Box>
     ))}
     </>
   ))}
     </Grid>
 
 
    </Box>
    
    
       
       </Box>
  )
}

export default Template