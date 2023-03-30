import { Box, Flex, Image, Input, Stack, Button} from '@chakra-ui/react'
import React, { useState } from 'react'
import { DeleteIcon } from '@chakra-ui/icons';
import image_4 from '../images/image_4.png';
import image_3 from '../images/image_3.png';
import image_2 from '../images/image_2.png';
import image_1 from '../images/image_1.png';
import StarsRating from 'stars-rating'
import { useNavigate } from 'react-router-dom';
import PollModal from '../components/PollModal';

function CreatePoll() {

const [questions, setQuestions] = useState([]);
  const [rating, setRating] = useState(0)
  const [pollName, setPollName] = useState("");
  const [template, setTemplate] = useState("")
  const navigate = useNavigate()
  let temp = JSON.parse(localStorage.getItem("template")) || []
  var today = new Date(), time = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() +' '+ today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

  const handleQuestionCreate = (e) => {
    let type = e.target.value
    const newQuestion = { question: '', options: [], type:type, maxSelections:'1' };
    setQuestions([...questions, newQuestion]);
  };


  const handleOptionCreate = (questionIndex) => {
    const newOption = [];
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push(newOption);
    setQuestions(newQuestions);
  };

  const handleRatingOptionCreate = (questionIndex) => {
    const newOption = [];
    const newQuestions = [...questions];
    if(newQuestions[questionIndex].options.length===0){
      newQuestions[questionIndex].options.push(newOption);
      setQuestions(newQuestions);
    }
   
  };


  const handleTitleChange = (event, questionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].question = event.target.value;
    setQuestions(newQuestions);
  };

  const handleSelectionChange = (event, questionIndex) => {
    const newQuestions = [...questions];
   
    newQuestions[questionIndex].maxSelections = event.target.value;
    setQuestions(newQuestions);
  };


  const handleOptionTitleChange = (event, questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    
    newQuestions[questionIndex].options[optionIndex] =
      event.target.value;
    setQuestions(newQuestions);
  };

  
  const handleOptionRatingChange = (event, questionIndex, optionIndex) => {
    setRating(event)
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] =event;
    setQuestions(newQuestions);
    
  };


  const handleDeleteQuestion = (question)=>{
    let newQuestion = questions
    newQuestion.splice(newQuestion.indexOf(question),1)
    setQuestions([...newQuestion])
  }


  const handleSubmit = () => {
    const poll = {
      pollName:pollName,
        questions: questions.map((question) => ({
        question: question.question,
        type: question.type,
        maxSelections: question.maxSelections,
        options: question.options
      })),
      pollId:72673,
      adminId:"xyz1234",
      pollStatus:"true",
      pollCreatedAt:time,
      pollEndsAt:"time2" 
    };

  };

const handleCreateTemplate = ()=>{

  const templates = {
    templateId:"tmpid1234",
    adminId:"adid1234",
    templateName:template,
    questions: questions.map((question) => ({
    question: question.question,
    type: question.type,
    maxSelections: question.maxSelections,
    options: question.options
  }))
}
temp.push(templates)

localStorage.setItem("template", JSON.stringify(temp))

}
      







  return (
    <Box  bg={'#F2F7FF'} h={"100%"} border={'1px solid #F2F7FF'} >
      <Flex justifyContent={'space-between'} w={'100%'}  >
      <Image margin={"1%"} onClick={()=>navigate('/')} cursor={'pointer'} w={'110px'} h={'45px'} alt="icon" src={'https://user-images.githubusercontent.com/97525465/226943245-2d818b81-d5aa-4f1d-bc89-e82c3dbde51d.png'}/>
            <Image marginRight={'5%'} w={'100px'} h={'100px'} marginTop={'1%'} alt="icon" src={image_4}/>
            <Image marginRight={'5%'}w={'100px'} h={'100px'} alt="icon" src={image_3}/>
            <Image marginRight={'5%'}w={'100px'} h={'100px'} alt="icon" src={image_2}/>
            <Image marginRight={'5%'}w={'100px'} h={'100px'} alt="icon" src={image_1}/>
            </Flex>
           
    
    <Stack marginLeft={'10%'} marginRight={'10%'}>
<Flex  justifyContent={'end'}>
     
      </Flex>
       <PollModal handleQuestionCreate={handleQuestionCreate} />
      <Box >
      {questions.length>0?
      <>

      <Input bg={'white'} placeholder='Add poll name' onChange={(e)=>setPollName(e.target.value)} />
      <Input bg={'white'} marginTop={'10px'} placeholder='Add template name' onChange={(e)=>setTemplate(e.target.value)} /> 

      </>:<></>
      } 
      {questions.map((question, questionIndex) => (
        <Box  key={questionIndex}>
            <Flex>
          <Input  marginTop={'40px'} placeholder='Create question' bg={"white"}
            value={question.title}
            onChange={(event) => handleTitleChange(event, questionIndex)}
          />
            <Button   marginTop={'40px'} bg={"white"} onClick={()=>handleDeleteQuestion(questionIndex)}><DeleteIcon  color={"red"}/></Button>
          </Flex>
          <Stack>
        
         {question.type==="rating"? <Button marginTop={"10px"} bg={"red.400"} w={'200px'} color={'white'} onClick={() => handleRatingOptionCreate(questionIndex)}>
            Add Rating
          </Button>:<Button marginTop={"10px"} bg={"red.400"} w={'200px'} color={'white'} onClick={() => handleOptionCreate(questionIndex)}>
            Add Option
          </Button>}
        {question.type==="mcq"&& <Input  marginTop={"10px"} type="number" w={'150px'} bg="white" placeholder='max option' onChange={(event)=>handleSelectionChange(event, questionIndex)}/>
        }
        </Stack>
          {question.options.map((option, optionIndex) => (
            <Box key={optionIndex}>
              {question.type==="mcq"&&
              <>
              <Input placeholder={`option ${optionIndex+1}`}  marginTop={"10px"} bg={"white"}
                value={option.option}
                onChange={(event) =>
                  handleOptionTitleChange(event, questionIndex, optionIndex)
                }
                
              />
            
              </>
              
              }
               {question.type==="poll"&&<Input 
               placeholder={`option ${optionIndex+1}`} bg={"white"}
               marginTop={"10px"}
                value={option.option}
                onChange={(event) =>
                  handleOptionTitleChange(event, questionIndex, optionIndex)
                }
              />}

               {question.type==="rating"&&
               
               <>

<StarsRating
  count={10}
  value={rating}
  onChange={(event)=>handleOptionRatingChange(event, questionIndex, optionIndex)}
  size={44}
  color2={'#ffd700'} />  

             </> 
              }
             
            </Box>
        
          ))}
        </Box>
      ))}



      {questions.length>0?<Button bg={"red.400"} marginTop={"10px"} marginBottom={"70px"} color={'white'} w={"200px"} onClick={handleSubmit}>Submit</Button>:<></>}
      {questions.length>0?<Button bg={"red.400"} marginTop={"10px"} marginBottom={"70px"} marginLeft={"10px"} color={'white'} w={"200px"} onClick={handleCreateTemplate} >Save the template</Button>:<></>}
      </Box>


    </Stack>

    
    
       
       </Box>
  )
}

export default CreatePoll